const express = require("express");
const { fetchAndSaveVideos, getAllVideos } = require("../Controller/VideoController");

const router = express.Router();

router.get("/fetch", fetchAndSaveVideos);
router.get("/getVideos",getAllVideos);

module.exports = router;