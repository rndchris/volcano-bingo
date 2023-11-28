import express from "express";
import serveStatic from "serve-static";
import fs from "fs"

const app = express();
const port = 3500;
global.tropes = []

fs.readFile("./tropes.txt", "utf8", (err, data) => {
    if (err) throw err;
    tropes = data.split('\n')
})

app.use(serveStatic("public"));


app.get("/", (req,res) => {
    let squares = generateCard();
    console.log(req.ip + " Requested a Bingo Card");
    res.render("index.ejs", {trope: squares});
})

app.listen(port,() =>{
    console.log("Listening on port " + port);
})

function generateCard(){
    let tropePool = tropes.slice();
    let cardIDs = []
    let cardTropes = []
    let rando = 0
    for (let i = 0; i<24; i++){
        rando = Math.floor(Math.random()*tropePool.length);
        cardTropes[i] = tropePool[rando]
        tropePool.splice(rando, 1);
    }
    return cardTropes;
}