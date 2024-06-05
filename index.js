import express from "express";
import serveStatic from "serve-static";
import fs from "fs"

const app = express();
const port = 3500;
global.tropes = []
global.allTropes = []
var cardCounter = 0

fs.readFile("./tropes.txt", "utf8", (err, data) => {
    if (err) throw err;
    tropes = data.split('\n');
    console.log(tropes.length + " tropes loaded to main card generator");
    if (tropes.length<24){
        throw "Insufficient tropes for bingo card generation";
    }
})

//For bingo cards using full trope list instead of just the most common ones
fs.readFile("./all-tropes.txt", "utf8", (err, data) => {
    if (err) throw err;
    allTropes = data.split('\n');
    console.log(allTropes.length + " tropes loaded to all tropes card generator");
    if (allTropes.length<24){
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

app.get("/expanded", (req,res) => {
    let squares = generateExpandedCard();
    cardCounter++;
    console.log(Date() + req.ip + " Requested a Bingo Card. " + cardCounter + " total cards requested since last restart.");
    res.render("index.ejs", {trope: squares});
})

app.get("/api/trope", (req,res) => {
    let rando = Math.floor(Math.random() * tropes.length);
    let trope = tropes[rando];
    res.json(trope);
})

app.get("/api/tropes", (req,res) => {
    res.json(tropes);
})

app.get("/api/allTropes", (req,res) => {
    res.json(allTropes);
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

function generateExpandedCard(){
    let tropePool = allTropes.slice();
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