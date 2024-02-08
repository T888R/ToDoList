const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const rawData = fs.readFileSync("./text-data.json", "utf-8");
const data = JSON.parse(rawData); // data === ["hi"]

app.get("/", async (req, res) => {
  try {
    res.json(data);
    console.log(data);
  } catch (err) {
    console.error(err);
    res.status(400).send();
  }
});

app.post("/", async (req, res) => {
  try {
    data.push(req.body.value);
    console.log(req.body.index);
    const writableText = fs.writeFileSync(
      "./text-data.json",
      JSON.stringify(data),
    );
  } catch (err) {
    console.error(err);
  }
  res.send();
});

app.delete("/", async (req, res) => {
  try {
    console.log(req.body.index);
    data.splice(req.body.index, 1);
    const deleteText = fs.writeFileSync(
      "./text-data.json",
      JSON.stringify(data),
    );
  } catch (err) {
    console.error(err);
  }
  res.send();
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
