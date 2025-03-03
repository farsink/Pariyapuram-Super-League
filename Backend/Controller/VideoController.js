// controllers/VideoController.js

const Video = require("../Models/Video");
const axios = require("axios");
dotenv = require("dotenv");
dotenv.config();

// Get API key and channel ID from environment variables
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;


// Helper function: chunk an array into smaller arrays of a given size
const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};
/**
 * Fetches videos from the specified YouTube channel using the YouTube Data API v3
 * and saves the video metadata to the MongoDB database.
 */
exports.fetchAndSaveVideos = async (req, res) => {
  try {
    let videos = [];
    let nextPageToken = "";

    // Loop to handle pagination if the channel has more than 50 videos
    do {
      const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=50${
        nextPageToken ? `&pageToken=${nextPageToken}` : ""
      }`;
      const response = await axios.get(url);

      // Filter for videos only and map data to our schema structure
      const fetchedVideos = response.data.items
        .filter((item) => item.id.kind === "youtube#video")
        .map((item) => ({
          title: item.snippet.title,
          description: item.snippet.description,
          videoId: item.id.videoId,
          thumbnail: item.snippet.thumbnails.medium.url,
          publishedAt: item.snippet.publishedAt,
          channelId: item.snippet.channelId,
          channelTitle: item.snippet.channelTitle,
        }));

      videos = videos.concat(fetchedVideos);
      nextPageToken = response.data.nextPageToken || "";
    } while (nextPageToken);

 const videoIds = [...new Set(videos.map((v) => v.videoId))];

 // Prepare to fetch additional details (duration and view count)
 // The videos.list endpoint accepts up to 50 video IDs per request.
 const videoIdChunks = chunkArray(videoIds, 50);
 let detailsMap = {};

 for (const chunk of videoIdChunks) {
   const idsParam = chunk.join(",");
   const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${idsParam}&part=contentDetails,statistics`;
   const detailsResponse = await axios.get(detailsUrl);
   detailsResponse.data.items.forEach((item) => {
     detailsMap[item.id] = {
       duration: item.contentDetails.duration, // ISO 8601 format
       views:
         item.statistics && item.statistics.viewCount ? parseInt(item.statistics.viewCount, 10) : 0,
     };
   });
 }

 // Merge extra details (duration and views) into our video objects
 const finalVideos = videos.map((video) => ({
   ...video,
   duration: detailsMap[video.videoId] ? detailsMap[video.videoId].duration : null,
   views: detailsMap[video.videoId] ? detailsMap[video.videoId].views : 0,
 }));



    // Save the videos to the database.
    // Prepare bulk operations to upsert videos
       const bulkOps = finalVideos.map((video) => ({
         updateOne: {
           filter: { videoId: video.videoId },
           update: { $set: video },
           upsert: true,
         },
       }));

      await Video.bulkWrite(bulkOps);

    res.status(200).json({
      message: "Videos fetched and saved successfully",
      count: videos.length,
    });
  } catch (error) {
    console.error("Error fetching videos:", error.response ? error.response.data : error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves all stored videos from MongoDB sorted by published date (newest first).
 */
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ publishedAt: -1 });
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error retrieving videos:", error);
    res.status(500).json({ error: error.message });
  }
};
