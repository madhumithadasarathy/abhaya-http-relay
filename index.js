import express from "express";
import fetch from "node-fetch";
import multer from "multer";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// CHANGE THIS to your Railway upload URL
const RAILWAY_UPLOAD_URL =
  "https://abhaya-production.up.railway.app/upload";

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image");
    }

    const form = new FormData();
    form.append("image", req.file.buffer, {
      filename: "frame.jpg",
      contentType: "image/jpeg"
    });

    const r = await fetch(RAILWAY_UPLOAD_URL, {
      method: "POST",
      body: form
    });

    res.send("OK");
  } catch (e) {
    console.error(e);
    res.status(500).send("Relay error");
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("HTTP relay running");
});

