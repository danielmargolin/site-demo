const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  const data = fs.readFileSync("ads.json");
  const jsonData = JSON.parse(data);

  res.send(jsonData);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
