import express from "express";
import serveStatic from "serve-static";
import fs from "fs"

const app = express();
const port = 3500;
global.tropes = []
var cardCounter = 0

fs.readFile("./tropes.txt", "utf8", (err, data) => {
    if (err) throw err;
    tropes = data.split('\n');
    console.log(tropes.length + " tropes loaded");
    if (tropes.length<24){
        throw "Insufficient tropes for bingo card generation";
    }
})

app.use(serveStatic("public"));


app.get("/", (req,res) => {
    let squares = generateCard();
    cardCounter++;
    console.log(Date() + req.ip + " Requested a Bingo Card. " + cardCounter + " total cards requested since last restart.");
    res.render("index.ejs", {trope: squares});
})

app.listen(port,() =>{
    console.log("Listening on port " + port);
})

function generateCard(){
    let tropePool = tropes.slice();
    let cardTropes = []
    let rando = 0
    for (let i = 0; i<24; i++){
        rando = Math.floor(Math.random()*tropePool.length);
        cardTropes[i] = tropePool[rando]
        tropePool.splice(rando, 1);
    }
    return cardTropes;
}
//currently unused; returns too big of values, so probably will discard.
function possibleBingoCards(){
    let possibleCards = 1
    for (let i = 1; i <= 24; i--){
        possibleCards = possibleCards * (tropes.length - i);
    }
    return possibleCards;
}