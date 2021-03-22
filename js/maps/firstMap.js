const FirstMap = {
  //local variables
  pathSvg: "/assets/firstMap/firstMap.svg",
  pathCss: "/css/firstMap.css",
  poiData: [
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
      descriptions: [
        "It's just a rock; But there could be something behind it.",
      ],
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
  ],
  localLoops: gsap.timeline(),
  isTileDown: false,
  // initialization
  initElements: () => {
    loadFlamingone(() => {
      gsap.set(flamingone, { scale: 0.7 });
    });
    initPOIs(FirstMap.poiData);
    if (deathCount) gsap.set(".grave", { visibility: "visible" });
  },
  initLoops: () => {
    //moves the sky
    FirstMap.localLoops.to(
      ".skyBot",
      100,
      { x: "-1024px", repeat: -1, ease: Linear.easeNone },
      "start"
    );
    FirstMap.localLoops.to(
      ".skyMid",
      64,
      { x: "-1024px", repeat: -1, ease: Linear.easeNone },
      "start"
    );
    FirstMap.localLoops.to(
      ".skyTop",
      40,
      { x: "-1024px", repeat: -1, ease: Linear.easeNone },
      "start"
    );
    //wind effect on trees
    FirstMap.localLoops.to(
      "#treeBottomFront, #treeBottomBack",
      3,
      {
        rotate: 7,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0,
      },
      "start"
    );
    FirstMap.localLoops.to(
      "#treeMiddle",
      1,
      {
        rotate: 5,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0,
      },
      "start"
    );
    FirstMap.localLoops.to(
      "#treeTop",
      1,
      { rotate: 2, repeat: -1, yoyo: true, repeatDelay: 0 },
      "start"
    );
    FirstMap.localLoops.play();
  },
  initClicks: () => {
    $("#dirtRoadSouth").click(function () {
      curtainDown(() => {
        FirstMap.stop();
        changeMap(OrchardMap);
      });
    });
    $("#dirtRoadEast").click(function () {
      curtainDown(() => changeMap(WitchHouseMap));
    });
    // FIXME: shouldnt be calling some index of tool array, should just call handaxe of class tool
    // this tool shouldnt have a quantity, just boolean whether its in the inv or not
    $("#rock1All").click(function () {
      if (tools[0].qty < 1)
        //TODO: change timeout to travelTime
        setTimeout(function () {
          youGot(tools[0]);
        }, 3000);
    });
    $("#tree").click(function () {
      //add traveltime
      FirstMap.shakeTree();
    });

    $("#tileRightTopAll").click(function (e) {
      if (isTileDown) $(e.target).parent().hide();
      // youGot(shingle);
    });
  },
  go: () => {
    FirstMap.initElements();
    FirstMap.initLoops();
    FirstMap.initClicks();
    curtainUp();
  },
  //anything that needs to be done bfore changing to a new map
  stop: () => {
    FirstMap.localLoops.pause();
  },
  //functions specific to this maps POIS
  //shakes tree
  shakeTree: () => {
    gsap.from("#tree", 3, {
      rotation: -5,
      transformOrigin: "50% 100%",
      ease: Elastic.easeOut.config(1.5, 0.1),
    });
    if (!FirstMap.isTileDown) FirstMap.tileRightTopFall();
  },
  //TODO:add animation for flamingone getting killed by tile
  deathByTile: () => {
    if (hitTestFlamingone($("#tileRightTopAll"))) {
      tileFall.kill();
      gsap.to("#tileRightTopAll", 1.2, { y: "+=100px" });
      //add death animation
      die();
    }
  },
  //tile falls gracefully from tree. changes path if hits flamingone
  tileRightTopFall: () => {
    isTileDown = true;
    tileFall = gsap.timeline({ onUpdate: FirstMap.deathByTile });
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
  },
};
