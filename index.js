import express from "express";
import { exec } from "child_process";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", (req, res) => {
  const { url, quality, type } = req.body;
  if (!url) return res.status(400).json({ error: "URL required" });

  let command = `yt-dlp -f ${quality} -o "%(title)s.%(ext)s" ${url}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      return res.status(500).json({ error: "Download failed" });
    }
    return res.json({ message: "Download started", log: stdout });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
