var POIs = new Array();

var tileFall;

//import mapElements.json for POI data.
$.ajax({
    type: "GET", url: "data/mapElements.json",
    dataType: "json", success: loadPOIs,
    error: function (e) { alert(`${e.status} - ${e.statusText}`) }
}); // end of ajax

// loadJSON function
function loadPOIs(data) {
    for (let poi of data.firstMap) {
        var descriptions = new Array();
        for (let description of poi.descriptions) {
            descriptions.push(description);
        }
        POIs.push(new PointOfInterest(poi.id, poi.standX, poi.standY, descriptions));
    }
} // end of loadPOIs

go = function () {
    flamingone = document.getElementById("flamingone");
    gsap.set(flamingone, { scale: .7 });//initialize scale

    //moves the sky
    gsap.to(".skyBot", 100, { x: "-1024px", repeat: -1, ease: Linear.easeNone });
    gsap.to(".skyMid", 64, { x: "-1024px", repeat: -1, ease: Linear.easeNone });
    gsap.to(".skyTop", 40, { x: "-1024px", repeat: -1, ease: Linear.easeNone });

    //wind effect on trees
    gsap.to("#treeBottomFront, #treeBottomBack", 3, { rotate: 7, repeat: -1, yoyo: true, repeatDelay: 0, });
    gsap.to("#treeMiddle", 1, { rotate: 5, repeat: -1, yoyo: true, repeatDelay: 0 });
    gsap.to("#treeTop", 1, { rotate: 2, repeat: -1, yoyo: true, repeatDelay: 0 });

    //functions specific to POIs
    //make this generic
    $("#dirtRoadSouth").contextmenu(function (e) {
        descriptionDialog(POIs[0].descriptions[0]);
    })
    $("#dirtRoadSouth").click(function () {
        moveTo(POIs[0].standX, POIs[0].standY);
        setTimeout(function () { loadMap("witchHouseMap") }, 2000);
    })

    $("#rock1All").click(function () {
        if (tools[0].qty < 1)
            // change timeout to travelTime
            setTimeout(function () { youGot(tools[0]) }, 3000);
    })

    $("#tree").click(function () {
        //add traveltime
        shakeTree();
    })

    $("#tileRightTopAll").click(function (e) {
        if (isTileDown)
            $(e.target).parent().hide();
            // youGot(shingle);
    })

    //functions specific to functions specific to POIs
    //shakes tree
    shakeTree = function () {
            gsap.from("#tree", 3, { rotation: -5, transformOrigin: "50% 100%", ease: Elastic.easeOut.config(1.5, 0.1) });
            if (!isTileDown)
                tileRightTopFall();
        }

    //tile falls gracefully from tree. changes path if hits flamingone
    tileRightTopFall = function () {
            isTileDown = true;
            tileFall = gsap.timeline({ onUpdate: deathByTile });
            tileFall.to("#tileRightTopAll", .5, { x: 30, y: 50, ease: Power1.easeOut });
            tileFall.to("#tileRightTopAll", 1, { x: -40, y: 100, ease: Power1.easeOut });
            tileFall.to("#tileRightTopAll", 1.5, { x: 50, y: 200, ease: Power1.easeOut });
            tileFall.to("#tileRightTopAll", 1, { x: -30, y: 250, ease: Power1.easeOut });
            tileFall.play();
        }

    //add animation for flamingone getting killed be apple
    deathByTile = function () {
            if (hitTestFlamingone($("#tileRightTopAll"))) {
                tileFall.kill();
                gsap.to("#tileRightTopAll", 1.2, { y: "+=100px" });
                //add death animation
            }
        }

    //check if element overlaps with flamingone
    hitTestFlamingone = function (e) {
            return Draggable.hitTest(flamingone, e);
        }

    //generic POI funcitions

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

svgContainer.load(`assets/firstMap/firstMap.svg`, go);