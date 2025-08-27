import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/download", (req, res) => {
  const { url, quality, type } = req.body;

  console.log(`Download request received: URL: ${url}, Quality: ${quality}, Type: ${type}`);

  if (type === "video") {
    res.json({ message: `Video download started at quality: ${quality}` });
  } else {
    res.json({ message: `Audio download started` });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
