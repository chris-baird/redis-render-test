const express = require("express");
const Redis = require("ioredis");
require("dotenv").config();

let redis;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL);
} else {
  redis = new Redis();
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/:code", async (req, res) => {
  const storage = await redis.get(req.params.code);

  if (storage) {
    return res.send("In storage");
  }
  redis.set(req.params.code, 0);
  res.send("Not in storage");
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
