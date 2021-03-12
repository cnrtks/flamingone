//dont use these, they are just to remind me 


//$("#defs").html()
linearGradient = function (color1, color2) {
    return "<linearGradient id='gradDirt' x1='0%' y1='100%' x2='100%' y2='0%'>" +
        `<stop offset='0%' style='stop-color:${color1}; stop-opacity:1' />` +
        `<stop offset='100%' style='stop-color:${color2}; stop-opacity:1' />` +
        "</linearGradient>";
}

//radial
radialGradient = function (color1, color2) {
    return "<radialGradient id='gradTree' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>" +
        `<stop offset='0%' style='stop-color: ${color1}; stop-opacity:1' />` +
        `<stop offset='100%' style='stop-color: ${color2}; stop-opacity:1' />` +
        "</radialGradient>";
}


//makes pattern from image
$("#map1Defs").append("<pattern id='patternDirt' x='10' y='10' width='20' height='20'" +
    "patternUnits='userSpaceOnUse >" +
    `<image xlink:href=${patternDirtPng} x='0' y='0' width='200' height='200'/>` +
    "</pattern>");