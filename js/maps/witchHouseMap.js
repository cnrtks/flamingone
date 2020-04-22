var POIs = new Array();

//import mapElements.json for POI data.
$.ajax({
    type: "GET", url: "data/mapElements.json",
    dataType: "json", success: loadPOIs,
    error: function (e) { alert(`${e.status} - ${e.statusText}`) }
}); // end of ajax

// loadJSON function
function loadPOIs(data) {
    for (let poi of data.witchHouseMap) {
        var descriptions = new Array();
        for (let description of poi.descriptions) {
            descriptions.push(description);
        }
        POIs.push(new PointOfInterest(poi.id, poi.standX, poi.standY, descriptions));
    }
} // end of loadPOIs

go = function () {
    flamingone = document.getElementById("flamingone");
    gsap.set(flamingone, { x: -150, y: 160 });//initialize scale and position
    colorMap();

    gsap.to(".palmLeaf", 3, {rotation: 15, transformOrigin: "bottom", stagger: .5, repeat: -1, yoyo: true, ease: Power1.easeOut});
    gsap.to(".peony", 4, {x: 6, skewX: -6, repeat: -1, yoyo: true, ease: Power1.easeOut});

    //maybe move this, its pretty much the same on every map, but it will need to be decalred after the svgs loaded
    //displays first description in dialog box
    $(".pointOfInterest").contextmenu(function (e) {
        var message = "No Description found";
        for (let poi of POIs) {
            if (poi.id == e.currentTarget.id)
                message = poi.descriptions[0];
        }
        descriptionDialog(message);
    })

    //maybe move this, its pretty much the same on every map, but it will need to be decalred after the svgs loaded
    //moves flamingone tocoordinates near clicked element
    $(".pointOfInterest").click(function (e) {
        for (let poi of POIs) {
            if (poi.id == e.currentTarget.id)
                moveTo(poi.standX, poi.standY);
        }
    })
}//end of GO

//adds gradients and patterns.
function colorMap() {
    var stars = "/assets/witchHouseMap/stars.png";
    var pallet = getComputedStyle(document.body);
    //find a better way to make gradients
    var gradString = "<linearGradient id='gradSunset' x1='0%' y1='100%' x2='0%' y2='0%'>" +
        `<stop offset='0%' style='stop-color: ${pallet.getPropertyValue('--orange')}; stop-opacity:1' />` +
        `<stop offset='100%' style='stop-color: ${pallet.getPropertyValue('--greenlighttrans')}; stop-opacity:1' />` +
        "</linearGradient>";

    gradString += "<radialGradient id='gradPalmLeaf' cx='50%' cy='50%' r='50%' fx='50%' fy='50%'>" +
        `<stop offset='0%' style='stop-color: ${pallet.getPropertyValue('--purple')}; stop-opacity:1' />` +
        `<stop offset='100%' style='stop-color: ${pallet.getPropertyValue('--bluelightglare')}; stop-opacity:1' />` +
        "</radialGradient>";

    //patStars
    gradString += "<pattern id='patStars' x='0' y='0' width='1366' height='768'" +
        "patternUnits='userSpaceOnUse' >" +
        `<image xlink:href=${stars} x='0' y='0' width='1366' height='768'/>` +
        "</pattern>";

    $("#mapDefs").html(gradString);

    $("#sunset").attr("fill", "url(#gradSunset)");
    $(".palmLeaf").attr("fill", "url(#gradPalmLeaf)");
    $("#stars").attr("fill", "url(#patStars)");
}

svgContainer.load(`assets/witchHouseMap/witchHouseMap.svg`, go);