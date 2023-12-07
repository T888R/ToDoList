const express = require("express");
const cors = require("cors");
const fs = require("node:fs/promises");

const app = express();
const port = 3000;
const options = {
  headers: { "content-type": "application/json" },
};

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const rawData = await fs.readFile("./text-data.json", "utf-8");
    const data = JSON.parse(rawData);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

app.post("/", async (req, res) => {
  try {
    const writableText = await fs.writeFile(
      "./text-data.json",
      JSON.stringify(req.body)
    );
  } catch (err) {
    console.error(err);
  }
  res.send();
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
