const WitchHouseMap = {
  pathSvg: "/assets/witchHouseMap/witchHouseMap.svg",
  pathCss: "/css/witchHouseMap.css",
  poiData: [
    {
      id: "houseExtension",
      standX: 220,
      standY: 100,
      descriptions: ["This part of the house looks new."],
    },
    {
      id: "window",
      standX: 220,
      standY: 100,
      descriptions: ["That window is in an advanced stage of disrepair."],
    },
    {
      id: "peony",
      standX: 220,
      standY: 100,
      descriptions: ["I wonder what the ants are doing right now."],
    },
    {
      id: "pottedPalm",
      standX: 220,
      standY: 100,
      descriptions: ["It looks pretty dry, I'm not sure water can save it."],
    },
    {
      id: "houseMain",
      standX: 500,
      standY: 140,
      descriptions: ["It's the nicest looking shack you have ever seen."],
    },
    {
      id: "stinkFlower",
      standX: 750,
      standY: 150,
      descriptions: [
        "A destinct and terrible smell is eminating from this rather ugly looking plant; Perhaps it is structural.",
      ],
    },
    {
      id: "dandelion",
      standX: 500,
      standY: 140,
      descriptions: ["That is one dandy lion, assuming dandy means 'not a'."],
    },
    {
      id: "palmTree",
      standX: 0,
      standY: 150,
      descriptions: ["It's not wind swept, they just kinda grow like that"],
    },
    {
      id: "door",
      standX: 500,
      standY: 140,
      descriptions: ["That is a door."],
    },
    {
      id: "keystone",
      standX: 500,
      standY: 140,
      descriptions: ["This wooden doorframe has a keystone."],
    },
    {
      id: "doorHole",
      standX: 500,
      standY: 140,
      descriptions: ["It's one of those, what do you call it? Doorhole!"],
    },
    {
      id: "daisy",
      standX: 500,
      standY: 140,
      descriptions: ["This flower is growing on a keystone."],
    },
    {
      id: "walkway",
      standX: 500,
      standY: 140,
      descriptions: ["These stones are warm."],
    },
  ],
  localLoops: gsap.timeline({ paused: true }),
  go: () => {
    WitchHouseMap.initElements();
    WitchHouseMap.initLoops();
    curtainUp();
  },
  stop: () => {
    WitchHouseMap.localLoops.pause();
  },
  initElements: () => {
    initPOIs(WitchHouseMap.poiData);
    loadFlamingone();
    //   gsap.set(flamingone, { x: -150, y: 160 });
  },
  initLoops: () => {
    WitchHouseMap.localLoops.to(
      ".palmLeaf",
      3,
      {
        rotation: 15,
        transformOrigin: "bottom",
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
        ease: Power1.easeOut,
      },
      "start"
    );
    WitchHouseMap.localLoops.to(
      ".peony",
      4,
      { x: 6, skewX: -6, repeat: -1, yoyo: true, ease: Power1.easeOut },
      "start"
    );
    WitchHouseMap.localLoops.play();
  },
};

