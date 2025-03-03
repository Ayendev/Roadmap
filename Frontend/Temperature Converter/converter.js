const btn = document.getElementById("convert");

let input = document.getElementById("number");
let from_unit = document.getElementById("from_unit");
let to_unit = document.getElementById("to_unit");
let display = document.getElementById("display_converter");





// FROM CELCIUS
function celcius_to_Fahrenheit(param_value) {
    // °F = C * 1.8 + 32
    let cal_cF = (Number(param_value) * 1.8 + 32);
    display.textContent = `${param_value} ${from_unit.value} is ${cal_cF.toFixed(2)} ${to_unit.value}`;
}

function celcius_to_Celcius(param_value) {
    // formula : °C = same
    let cal_cC = Number(param_value);
    display.textContent = `${param_value} ${from_unit.value} is ${cal_cC.toFixed(2)} ${to_unit.value}.`;

}

function celcius_to_Kelvin(param_value) {
    // formula : °K = °C + 273.15
    let cal_cK = (Number(param_value) + 273.15);
    display.textContent = `${param_value} ${from_unit.value} is ${cal_cK.toFixed(2)} ${to_unit.value}.`;

}

// FROM FAHRENHEIT
function fahrenheit_to_Celcius(param_value) {
    // (°F -32) / 1.8 = °C
    let cal_fC = ((Number(param_value) - 32) / 1.8);
    display.textContent = `${param_value} ${from_unit.value} is ${cal_fC.toFixed(2)} ${to_unit.value}.`;

}

function fahrenheit_to_Fahrenheit(param_value) {
    // formula : °K = same
    let cal_fF = Number(param_value);
    display.textContent = `${param_value} ${from_unit.value} is ${cal_fF.toFixed(2)} ${to_unit.value}.`;

}

function fahrenheit_to_Kelvin(param_value) {
    // formula : (°F − 32) × 5/9 + 273,15 = °K
    let cal_fK = ((Number(param_value) - 32) * (5/9) + 273.15);
    display.textContent = `${param_value} ${from_unit.value} is ${cal_fK.toFixed(2)} ${to_unit.value}.`;

}

// FROM KELVIN
function kelvin_to_Celcius(param_value) {
    // formula : °K - 273.15 = °C
    let cal_kC = (Number(param_value) - 273.15);
    display.textContent = `${param_value} ${from_unit.value} is ${cal_kC.toFixed(2)} ${to_unit.value}.`;

}

function kelvin_to_Kelvin(param_value) {
    // formula : °K = °K
    let cal_kK = Number(param_value);
    display.textContent = `${param_value} ${from_unit.value} is ${cal_kK.toFixed(2)} ${to_unit.value}.`;

}

function kelvin_to_Fahrenheit(param_value) {
    // °F = (°K - 273,15 ) * (5/9) + 32
    let cal_kF = (((Number(param_value) - 273.15) * (5/9)) + 32);
    display.textContent = `${param_value} ${from_unit.value} is ${cal_kF.toFixed(2)} ${to_unit.value}.`;

}



// defines functions
function submitForm(event) {

    //event.preventDefault();
    let convert_pick = from_unit.value.toLowerCase().concat("_to_",to_unit.value);

    if (input.value !== "" && from_unit.value !== "" && to_unit.value !== "" ) {
        event.preventDefault();

        if (convert_pick === "celcius_to_Fahrenheit") {
            celcius_to_Fahrenheit(input.value.trim());
        } else if (convert_pick === "celcius_to_Celcius") {
            celcius_to_Celcius(input.value.trim());
        } else if (convert_pick === "celcius_to_Kelvin") {
            celcius_to_Kelvin(input.value.trim());
        } else if (convert_pick === "fahrenheit_to_Celcius") {
            fahrenheit_to_Celcius(input.value.trim());
        } else if (convert_pick === "fahrenheit_to_Fahrenheit") {
            fahrenheit_to_Fahrenheit(input.value.trim());
        } else if (convert_pick === "fahrenheit_to_Kelvin") {
            fahrenheit_to_Kelvin(input.value.trim());
        } else if (convert_pick === "kelvin_to_Celcius") {
            kelvin_to_Celcius(input.value.trim());
        } else if (convert_pick === "kelvin_to_Kelvin") {
            kelvin_to_Kelvin(input.value.trim());
        } else if (convert_pick === "kelvin_to_Fahrenheit") {
            kelvin_to_Fahrenheit(input.value.trim());
        }

    }

}

// Listener Submit
btn.addEventListener("click",submitForm);

document.addEventListener("load", ()=> {
    input.value = "0.00";
})