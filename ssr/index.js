const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.static("public"));

//-------------------------------

app.get("/", (req, res) => {
  const data = fs.readFileSync("data.json");
  const jsonData = JSON.parse(data);
  res.render("index", jsonData);
});

app.get("/:id", (req, res) => {
  let articleId = req.params.id;

  const data = fs.readFileSync("data.json");
  const jsonData = JSON.parse(data);

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
