square = document.querySelectorAll(".square");
siteVEI = document.querySelector("#count");

var VEI = 0;

var eruptions = [
    ".e",
    ".r",
    ".u",
    ".p",
    ".t",
    ".row1",
    ".row2",
    ".row3",
    ".row4",
    ".row5",
    ".corner",
    ".diagonal1",
    ".diagonal2"
]

//Add event listeners to every box for highlighting
for (var i = 0; i<square.length; i++){
    square[i].addEventListener("click", function(){
        if (this.classList.contains("selected")){
            this.classList.remove("selected");
        } else if (!this.classList.contains("header")){
            this.classList.add("selected");
        }
        calculateVEI();
    })
    
}

//Generate bingo card text
//Actually, this might be better rendered using a server side model.
for (var i = 0; i<square.length; i++){
    if (square[i].classList.contains("square") && !square[i].classList.contains("free") && !square[i].classList.contains("header")){
        square[i].innerHTML = "Character almost falls into lava";
    }
}

//Win detection
function checkErupt(eruptMethod){
    var checkSquares = document.querySelectorAll(eruptMethod);
    for (var i = 0; i<checkSquares.length; i++){
        if (!checkSquares[i].classList.contains("selected")){
            return false;
        }
    }
    return true;
}

//Calculate Score
function calculateVEI(){
    let lastVEI = VEI
    VEI = 0
    for (var i = 0; i<eruptions.length; i++){
        if (checkErupt(eruptions[i]) === true){VEI++;}
    }
    siteVEI.innerHTML = "VEI " + VEI;
    if (lastVEI < VEI){console.log("ERUPTION!!!!!!");}
}