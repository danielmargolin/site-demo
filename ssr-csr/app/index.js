const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static("public"));

//-------------------------------
async function fetchAds() {
  let response = await fetch("http://localhost:3001");
  let ads = await response.json();
  return ads;
}

app.get("/", async (req, res) => {
  let ads = await fetchAds();
  
  let data = fs.readFileSync("data.json");
  let jsonData = JSON.parse(data);
  res.render("index", {...jsonData, ads});
});

app.get("/:id", (req, res) => {
  let articleId = req.params.id;

  let data = fs.readFileSync("data.json");
  let jsonData = JSON.parse(data);

  if(articleId === 1) {
    res.render("article", {article: jsonData.mainArticle});    
  } else {
    res.render("article", {article: jsonData.moreArticles[req.params.id - 1]});
  }
});

app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
