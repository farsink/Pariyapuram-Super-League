const { megaLogin } = require("./Mega");
const fs = require("fs");
const path = require("path");
// Step 2: Upload a file to a specific folder
// Step 2: Upload a file to a specific folder
async function uploadToFolder(folderNodeId, filePath) {
  try {
    // Log in to MEGA
    const storage = await megaLogin();

    // Find the target folder by its nodeId
    const folder = storage.files[folderNodeId];
    if (!folder || !folder.directory) {
      throw new Error('Folder not found or invalid nodeId');
    }

    console.log(`Uploading to folder: ${folder.name}`);

    // Read the file stats to get the file size
    const fileStats = fs.statSync(filePath);
    const fileName = path.basename(filePath);

    // Create a readable stream for the file
    const fileStream = fs.createReadStream(filePath);

    // Upload the file to the folder
    const uploadedFile = await folder.upload({
      name: fileName,
      size: fileStats.size, // Specify the file size
    }, fileStream).complete;

    console.log(`File uploaded successfully: ${uploadedFile.name}`);
    console.log(`File URL: ${await uploadedFile.link()}`);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}


(async () => {
  const folderNodeId = "XVFDALiJ"; // Replace with the nodeId of your target folder
  const filePath = "./psl-news.jpg"; // Replace with the path to your image file

  await uploadToFolder(folderNodeId, filePath);
})();