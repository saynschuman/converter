const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

const convertAudio = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .inputFormat("ogg")
      .output(outputPath)
      .audioCodec("libmp3lame")
      .on("end", () => {
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      })
      .run();
  });
};

app.post("/convert", upload.single("file"), async (req, res) => {
  const inputPath = req.file.path;
  const outputPath = `${req.file.destination}${Date.now()}.mp3`;

  try {
    await convertAudio(inputPath, outputPath);
    res.download(outputPath, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error downloading the file");
      }
      fs.unlink(inputPath, () => { });
      fs.unlink(outputPath, () => { });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error converting the file");
    fs.unlink(inputPath, () => { });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
