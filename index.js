import express from "express";
import serveStatic from "serve-static";

const app = express();
const port = 3500;

app.use(serveStatic("public"));

app.listen(port,() =>{
    console.log("Listening on port " + port);
})

app.get("/", (req,res) => {
    let squares = [];
    for (var i = 0; i<24; i++){
        squares[i] = "Character Falls into Lava";
    }
    res.render("index.ejs", {trope: squares});
})