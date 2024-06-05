//basic elements
var square = document.querySelectorAll(".square");
var siteVEI = document.querySelector("#count");
var indicator = document.querySelector("#indicator");

var soundpaths = [
    "./assets/audio/dante-sing.aac",
    "./assets/audio/dante-mountain-blowing-up.aac",
    "./assets/audio/terror-peak-evacuation.aac",
    "./assets/audio/terror-peak-get-off-mountain.aac",
    "./assets/audio/terror-peak-puff.aac",
    "./assets/audio/terror-peak-not-an-earthquake.aac",
    "./assets/audio/terror-peak-danger.aac",
    "./assets/audio/vfom-feel-it.aac",
    "./assets/audio/vfom-imminent-eruption.aac",
    "./assets/audio/supervolcano-vei8.aac",
    "./assets/audio/supervolcano-panic.aac",
    "./assets/audio/supervolcano-eruption.aac",
    "./assets/audio/supereruption-swelling.aac",
    "./assets/audio/supereruption-yellowstone.aac",
    "./assets/audio/supereruption-geyser.aac",
    "./assets/audio/supereruption-get-out.aac",
]

function eruptionSound(){
    if (document.querySelector("#mute").innerHTML === "Turn Sound Off"){
        let soundNumber = Math.floor(Math.random() * soundpaths.length);
        var audio = new Audio(soundpaths[soundNumber]);
        audio.play()
    }
}


var VEI = 0;

var replaceCounter = 0;
//set limit for number of replacements allowed
var replaceLimit = 5;
document.querySelector("#swapCounter").innerHTML = replaceLimit - replaceCounter;

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
    //add events listeners for selecting squares
    square[i].addEventListener("click", function(){
        if (this.classList.contains("selected")){
            this.classList.remove("selected");
        } else if (!this.classList.contains("header")){
            this.classList.add("selected");
        }
        calculateVEI();
        updateEruptionColumnHeight();
    })

    square[i].addEventListener("contextmenu", async function(event){
        event.preventDefault()
        if (this.classList.contains("header") || this.classList.contains("free")){return false;}
        if (replaceCounter < replaceLimit){
            this.innerHTML = await getTrope();
            replaceCounter++
            document.querySelector("#swapCounter").innerHTML = replaceLimit - replaceCounter;
        } else {
            alert("Uh oh, you've run out of replacements!")
        }
        return false;
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
        removeClassFromClass(eruptions[i],"erupting")
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
    if (lastVEI < VEI){
        console.log("ERUPTION!!!!!!");
        eruptionSound();
        resetEruption();
    }
}

function resetEruption(){
    for (var i = 0; i<eruptions.length; i++){
        if (checkErupt(eruptions[i]) === true){
            //This function depends on the erupting class being removed in calculateVEI
            void document.querySelector(".erupted").offsetWidth;
            addClassToClass(eruptions[i],"erupting")
        }
    }
}

function updateEruptionColumnHeight(){
    var eruptionColumnHeight = (document.querySelectorAll(".selected").length * 1.6).toFixed(1);
    document.querySelector("#eruption-column-height").innerHTML = eruptionColumnHeight + " km";
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


//Control Button Functions
function newCard(){
    location.reload()
}

function clearSelected(){
    removeClassFromClass(".selected","selected");
    calculateVEI();
    updateEruptionColumnHeight();
}

function toggleDarkMode(){
    let button = document.getElementById("darkMode");
    toggleText(button,"Light Mode", "Dark Mode")
    toggleClassOnClass(".square","darkSquare");
    toggleClassOnClass(".card","darkSquare");
    toggleClassOnClass(".card", "dark");
    toggleClassOnClass("html","dark");
    toggleClassOnClass("#counter","darkSquare");
    toggleClassOnClass("#counter","dark");  
    toggleClassOnClass("button","darkSquare");
    toggleClassOnClass("button","dark");
    toggleClassOnClass(".rules","dark");
    toggleClassOnClass(".rules","darkSquare");
    toggleClassOnClass("html","darkHtml")
}

function toggleBigMode(){
    let button = document.getElementById("bigMode");
    toggleText(button,"Big Mode", "Turn Off Big Mode")
    toggleClassOnClass(".square","big");
    toggleClassOnClass(".card","bigCard");
    toggleClassOnClass(".cardbox","bigCardBox");
    toggleClassOnClass("#banner","hidden");
    toggleClassOnClass("#counter","bigCounter");
}

function toggleMute(){
    let muteState = document.getElementById("mute");
    toggleText(muteState, "Turn Sound Off", "Turn Sound On");
}

function hideButtons(){
    toggleText(document.getElementById("hideButtons"), "Minimize Controls", "Restore Controls");
    toggleClassOnClass("#controls button", "hiddenControls");
}

function toggleMovies(){
    toggleClassOnClass(".rules","hidden");
    toggleClassOnClass(".suggestions","hidden");
}

function toggleClass(pageElement, divClass){
    if (pageElement.classList.contains(divClass)){
        pageElement.classList.remove(divClass);
    } else {
        pageElement.classList.add(divClass);
    }
}

function toggleClassOnClass(divClass,classToggle){
    let workingClass = document.querySelectorAll(divClass);
    for (let i = 0; i < workingClass.length; i++){
        toggleClass(workingClass[i],classToggle);
    }
}

function showRules(){
    toggleClassOnClass(".rules","hidden")
    toggleClassOnClass(".card","hidden")
    toggleClassOnClass("#controls","hidden")
    //toggleClassOnClass("#banner","hidden")
    toggleClassOnClass("#counter","hidden")
    if (document.querySelector(".square").classList.contains("big") || document.querySelector("#controls").classList.contains("hidden")){
        addClassToClass("#banner","hidden");
    } else {
        removeClassFromClass("#banner","hidden")
    }
}

function toggleText(button, text1, text2){
    if (button.innerHTML == text1){
        button.innerHTML = text2;
    } else {
        button.innerHTML = text1;
    }
}

async function getTrope(){
    const trope = await fetch("/api/trope");
    return trope.json();
}