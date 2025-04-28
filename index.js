let hexInput = document.getElementById('hexInput');
let inputColour = document.getElementById('inputColour');
let slider = document.getElementById('slider');
let sliderText = document.getElementById('sliderText');
let alteredColour = document.getElementById('alteredColour');
let alteredColourText = document.getElementById('alteredColourText')
let lightenText = document.getElementById('lightenText')
let darkenText = document.getElementById('darkenText')
let toggleBtn = document.getElementById('toggleBtn')

hexInput.addEventListener("keyup", function() {

    // Reset the "altered" colour details and the slider
    reset() 

    // grab the hex input
    let hex = hexInput.value.trim();

    // Check if the hex code is valid
    if (!isValidHex(hex)) {
        inputColour.style.backgroundColor = "#9dd7e1"; // Default color if invalid
        return;
    }

    // refelct the hex input in the input colour block
    inputColour.style.backgroundColor = hex;
});


const isValidHex = (hex) => {

    // if nothing input return false
    if(!hex) return false;
    
    // replace any hash symbols with nothing
    const strippedHex = hex.replace('#', '');
    
    // only return if length of hex input is 3 or 6 characters (as nothing else is valid hex) 
    return strippedHex.length === 3 || strippedHex.length === 6;
}

function convertHextoRGB(hexOriginal) {

    // check hex input is valid 
    if (!isValidHex(hexOriginal)) return null;

    // remove any hash symbols input
    let hex = hexOriginal.replace('#','')

    // if length of input is 3 characters then extend to 6 characters
    // using duplication of each of the 3 characters
    if (hex.length === 3) {
      hexLong = hex.split("").map((x) => x + x).join("")
    } 
    else 
       hexLong = hex

    // grab the first two characters / second two characters / third two characters 
    // and convert to RGB from hex using parseInt(... 16)
    const r = parseInt(hexLong.substring(0,2), 16);
    const g = parseInt(hexLong.substring(2,4), 16);
    const b = parseInt(hexLong.substring(4,6), 16);
    
    // return as an object
    return {r, g, b}
}


function convertRGBtoHex(r,g,b) {

    hex1 = r.toString(16).padStart(2,"0");
    hex2 = g.toString(16).padStart(2,"0");
    hex3 = b.toString(16).padStart(2,"0");

return ["#", hex1, hex2, hex3].join("")
}


slider.addEventListener('change', function() {

    // grab the hex input
    let hex = hexInput.value.trim();

    // check the input hex is valid
    if (!isValidHex(hexInput.value)) return;

    // get the slider percentage to reflect the user's interaction
    sliderText.innerHTML = `${slider.value}%`

    /// calculate the appropriate value for the colour alteration between positive and negative
    
    // get the altered hex value
    let alteredHex = alterColor(hexInput.value, slider.value);
    
    // update the altered colour 
    alteredColour.style.backgroundColor = alteredHex;

    // display altered colour hex to user
    alteredColourText.innerHTML = `Altered Colour ${alteredHex}`
    }
);

toggleBtn.addEventListener('click', function() {
    
    // Reset the "altered" colour details and the slider
    reset()

    toggleBtn.classList.toggle("toggled")
    if (lightenText.classList.contains("unselected")) {
        lightenText.classList.remove("unselected")
        darkenText.classList.add("unselected")
        
    } else {
        lightenText.classList.add("unselected")
        darkenText.classList.remove("unselected")
    }
})


function alterColor(hex, percentage) {
    
    // convert to rgb and check the output is valid
    const rgb = convertHextoRGB(hex)
    if (!rgb) return null

    // record the "shift" required
    // first check if lighten has been selected in toggle. If so amount needs to be positive, otherwise negative
    if (darkenText.classList.contains("unselected")) {
    amount = Math.floor((percentage/100) * 255)
    } else { amount = -1 * Math.floor((percentage/100) * 255) };


    // take the r, g and b elements from the rgb array
    r = rgb.r   
    g = rgb.g
    b = rgb.b

    // apply the shift to each of these elements
    rAdj = Math.max( Math.min( r + amount, 255 ), 0 ) // ensures results stay between 0 & 255
    gAdj = Math.max( Math.min( g + amount, 255 ), 0 )
    bAdj = Math.max( Math.min( b + amount, 255 ), 0 )

    // using these adjusted array elements, return the adjusted RGB
    return convertRGBtoHex(rAdj, gAdj, bAdj)

}

// Reset the "altered" colour details and the slider
function reset() {
    sliderText.innerHTML = "0%"
    slider.value = 0

    alteredColourText.innerHTML = "Altered Colour"
    alteredColour.style.backgroundColor = inputColour.style.backgroundColor


} 



