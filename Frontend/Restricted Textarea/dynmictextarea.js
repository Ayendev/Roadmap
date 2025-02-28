// Selectors
const Element_area = document.querySelector("textarea");
const counterCharacter = document.querySelector(".counter_charac");

// Table colors
const correctorColor = [
    "#90a955",
    "#020202",
    "#da2c38",
];


// initilise de counter
function initialiseCounter (ref,display) {
    
    const _emtyEntry = ref;
    _emtyEntry.value = "";
    const _zeroLenght = _emtyEntry.textLength;
    const show = display;
    
    if (Element_area) {
        show.innerHTML = _zeroLenght + "/" + _emtyEntry.maxLength;
    }
}

// Update
function UpdatedCharacters (evnt) {
    
    const value = evnt.target.value;
    const entryLenght = value.length;
    const wholecharacters = evnt.target.maxLength
    
    // case 1 :
    if(entryLenght < wholecharacters){
        counterCharacter.innerHTML = evnt.target.textLength + "/" + wholecharacters;
        InitialParameter();
    }
    // case 2 :
    if (entryLenght == wholecharacters )  { 
        counterCharacter.innerHTML = evnt.target.textLength + "/" + wholecharacters;
        counterCharacter.style.color = correctorColor[2];
        Element_area.style.outline = `1px solid  ${correctorColor[2]}`;
        Element_area.style.color = correctorColor[2];
    }
}

// Initialise parameters
function InitialParameter () {
    counterCharacter.style.color = correctorColor[0];
    Element_area.style.outline = `1px solid transparent`;
    Element_area.style.color = correctorColor[1];
}


// Loading page - initialise
document.body.addEventListener("load", initialiseCounter(Element_area,counterCharacter));
// event: Update the counter
Element_area.addEventListener("input", UpdatedCharacters.bind(event));

