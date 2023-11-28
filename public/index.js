var square = document.querySelectorAll(".square");
var siteVEI = document.querySelector("#count");
var indicator = document.querySelector("#indicator");

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
        updateEruptionColumnHeight();
    })
    
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
        removeClassFromClass(eruptions[i],"erupted")
    }
    for (var i = 0; i<eruptions.length; i++){
        if (checkErupt(eruptions[i]) === true){
            VEI++;
            addClassToClass(eruptions[i],"erupted")
        }
    }
    siteVEI.innerHTML = "VEI " + VEI;
    switch(VEI) {
        case 0:
            indicator.innerHTML = "Hawaiian";
            break;
        case 1:
            indicator.innerHTML = "Strombolian"
            break;
        case 2:
            indicator.innerHTML = "Vulcanian"
            break;
        case 3:
            indicator.innerHTML = "Peléan, Sub-Plinian"
            break;
        case 4:
            indicator.innerHTML = "Sub-Plian"
            break;
        case 5:
            indicator.innerHTML = "Sub-Plinian, Plinian"
            break;
        case 6:
            indicator.innerHTML = "Plinian"
            break;
        case 7:
            indicator.innerHTML = "Ultra-Plinian"
            break;
        case 8:
            indicator.innerHTML = "Really?, Ultra-Plinean"
            break;
        default:
          indicator.innerHTML = "Apocalyptic";
      }
    if (lastVEI < VEI){console.log("ERUPTION!!!!!!");}
}

function updateEruptionColumnHeight(){
    var eruptionColumnHeight = (document.querySelectorAll(".selected").length * 1.6).toFixed(1);
    document.querySelector("#eruption-column-height").innerHTML = "Eruption Column: " + eruptionColumnHeight + " km";
}

function addClassToClass(divClass, addClass){
    let workingClass = document.querySelectorAll(divClass);
    for (let i = 0; i < workingClass.length; i++){
        workingClass[i].classList.add(addClass);
    }
}

function removeClassFromClass(divClass, addClass){
    let workingClass = document.querySelectorAll(divClass);
    for (let i = 0; i < workingClass.length; i++){
        if (workingClass[i].classList.contains(addClass)){workingClass[i].classList.remove(addClass);};
    }
}