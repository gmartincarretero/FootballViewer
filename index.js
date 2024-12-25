import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.get("/all", async (req,res) => {
    try {
        const result = await axios.get("https://www.scorebat.com/video-api/v3/feed/?token=MTkxNjgzXzE3MzQ5Njk4NjJfOTU5MTM3NDU0MjYxMDk2YzQ0YWZlYTg2MTRhOGIzNWMzNGFiZWY5Nw==");
        console.log(result.data.response[0]);
        res.render("all.ejs", {
          result
      });
      } catch (error) {
        console.log(error);
        res.status(500);
    }});

app.post("/submit", async (req, res) => {
    try {
      const result = await axios.get("https://www.scorebat.com/video-api/v3/feed/?token=MTkxNjgzXzE3MzQ5Njk4NjJfOTU5MTM3NDU0MjYxMDk2YzQ0YWZlYTg2MTRhOGIzNWMzNGFiZWY5Nw==");
      const comp = (req.body["comps"]);

      console.log(result.data.response[0]);
      console.log(req.body["comps"]);
      
      res.render("competition.ejs", {
        comp,
        result
    });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});