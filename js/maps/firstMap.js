var tileFall;
let poiData = [
  {
    id: "dirtRoadSouth",
    standX: 200,
    standY: 200,
    descriptions: ["Follow me and you'll be in good compnay"],
  },
  {
    id: "dirtRoadEast",
    standX: 500,
    standY: 150,
    descriptions: ["This road road road rodadendrone. It leads east maybe."],
  },
  {
    id: "tree",
    standX: -110,
    standY: 50,
    descriptions: ["It' a shingle tree. It's all by itshelf."],
  },
  {
    id: "grave",
    standX: 210,
    standY: 100,
    descriptions: ["Here rests Unnamed Flamingone. Born to die."],
  },
  {
    id: "rock1All",
    standX: 550,
    standY: 180,
    descriptions: ["It's just a rock; But there could be something behind it."],
  },
  {
    id: "rock2All",
    standX: 400,
    standY: 100,
    descriptions: ["It's a rock. It rhymes with sock."],
  },
  {
    id: "rock3All",
    standX: 550,
    standY: 20,
    descriptions: ["There is nothing particularly special about this rock."],
  },
];

go = function () {
  localPOIsFromData(poiData);
  flamingone = document.getElementById("flamingone");
  gsap.set(flamingone, { scale: 0.7 }); //initialize scale

  //   TODO: this needs to be turned off and on when loaded/unloaded
  //moves the sky
  gsap.to(".skyBot", 100, { x: "-1024px", repeat: -1, ease: Linear.easeNone });
  gsap.to(".skyMid", 64, { x: "-1024px", repeat: -1, ease: Linear.easeNone });
  gsap.to(".skyTop", 40, { x: "-1024px", repeat: -1, ease: Linear.easeNone });

  //wind effect on trees
  gsap.to("#treeBottomFront, #treeBottomBack", 3, {
    rotate: 7,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0,
  });
  gsap.to("#treeMiddle", 1, {
    rotate: 5,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0,
  });
  gsap.to("#treeTop", 1, { rotate: 2, repeat: -1, yoyo: true, repeatDelay: 0 });

  //functions specific to POIs
  $("#dirtRoadSouth").click(function () {
    setTimeout(function () {
      loadMap("orchardMap");
    }, 2000);
  });
  $("#dirtRoadEast").click(function () {
    setTimeout(function () {
      loadMap("witchHouseMap");
    }, 2000);
  });

  $("#rock1All").click(function () {
    if (tools[0].qty < 1)
      //TODO: change timeout to travelTime
      setTimeout(function () {
        youGot(tools[0]);
      }, 3000);
  });

  $("#tree").click(function () {
    //add traveltime
    shakeTree();
  });

  $("#tileRightTopAll").click(function (e) {
    if (isTileDown) $(e.target).parent().hide();
    // youGot(shingle);
  });

  //functions specific to POIs
  //shakes tree
  shakeTree = function () {
    gsap.from("#tree", 3, {
      rotation: -5,
      transformOrigin: "50% 100%",
      ease: Elastic.easeOut.config(1.5, 0.1),
    });
    if (!isTileDown) tileRightTopFall();
  };

  //tile falls gracefully from tree. changes path if hits flamingone
  tileRightTopFall = function () {
    isTileDown = true;
    tileFall = gsap.timeline({ onUpdate: deathByTile });
    tileFall.to("#tileRightTopAll", 0.5, {
      x: 30,
      y: 50,
      ease: Power1.easeOut,
    });
    tileFall.to("#tileRightTopAll", 1, {
      x: -40,
      y: 100,
      ease: Power1.easeOut,
    });
    tileFall.to("#tileRightTopAll", 1.5, {
      x: 50,
      y: 200,
      ease: Power1.easeOut,
    });
    tileFall.to("#tileRightTopAll", 1, {
      x: -30,
      y: 250,
      ease: Power1.easeOut,
    });
    tileFall.play();
  };

  //add animation for flamingone getting killed by tile
  deathByTile = function () {
    if (hitTestFlamingone($("#tileRightTopAll"))) {
      tileFall.kill();
      gsap.to("#tileRightTopAll", 1.2, { y: "+=100px" });
      //add death animation
    }
  };

  //check if element overlaps with flamingone
  hitTestFlamingone = function (e) {
    return Draggable.hitTest(flamingone, e);
  };

  //generic POI funcitions
  setDefaultPoiDialog();
  setDefaultPoiMoveTo();
}; //end of GO

svgContainer.load(`assets/firstMap/firstMap.svg`, go);
