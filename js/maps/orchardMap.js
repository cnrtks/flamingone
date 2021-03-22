const OrchardMap = {
  pathSvg: "/assets/orchardMap/orchardMap.svg",
  pathCss: "/css/orchardMap.css",
  appleMouthShapes: [
    "#appleMouth25",
    "#appleMouth50",
    "#appleMouth75",
    "#appleMouth100",
  ],
  poiData: [
    {
      id: "shingleTrees",
      standX: 550,
      standY: 600,
      descriptions: ["These trees are on the other side of the fence."],
    },
    {
      id: "fence",
      standX: 0,
      standY: 0,
      descriptions: [
        "As defense form those with differences, somone put up a fence. Or maybe it just keeps cows from wandering off.",
      ],
    },
    {
      id: "apple",
      standX: 3200,
      standY: 1000,
      descriptions: ["A is for it."],
    },
  ],
  initElements: () => {
    initPOIs(OrchardMap.poiData);
    loadFlamingone(() => {
      gsap.set("#flamingone", { y: 300, x: -100 });
    });
    //initialize positions
    gsap.set("#leftShingle", { y: 400 });
    gsap.set("#rightShingle", { y: 475 });
    gsap.set("#eyeProfile", { scaleX: -1 });
    gsap.set("#magicRing circle", { transformOrigin: "center" });
    gsap.set("#magicRing", {
      scale: 7,
      skewY: 45,
      rotation: 30,
      x: -1300,
      y: 1800,
      // x: 500,
      // y: 500,
    });
  },
  initClicks: () => {
    $("#apple").click(() => {
      //TODO: wait for duck to get there
      //cehck item or whatever
      OrchardMap.deathByApple();
    });
  },
  go: () => {
    OrchardMap.initElements();
    // initLoops(); there are no loops on this map yet
    OrchardMap.initClicks();
    curtainUp();
  },
  //functions specific to this maps POIs
  deathByApple: () => {
    let tl = gsap.timeline({ onComplete: die });
    tl.to("#orchardMap", {
      duration: 4.5,
      attr: { viewBox: "3600 1700 600 400" },
    });
    let shapeChangeCount = 40;
    while (shapeChangeCount--) {
      tl.to("#appleMouth", {
        duration: 0.12,
        morphSVG: gsap.utils.random(OrchardMap.appleMouthShapes),
      });
    }
    tl.set("#orchardMap", { attr: { viewBox: "-2000, 0 2000, 1000" } });
    tl.to("#speechBubble", { duration: 0.5, morphSVG: "#speechBubble100" });
    tl.from(".letters path", { duration: 1, stagger: 0.5, drawSVG: 0 });
    tl.set("#orchardMap", { attr: { viewBox: "3700 1800 400 200" } });
    shapeChangeCount = 20;
    while (shapeChangeCount--) {
      tl.to("#appleMouth", {
        duration: 0.18,
        ease: "none",
        morphSVG: gsap.utils.random(OrchardMap.appleMouthShapes),
      });
    }
    tl.to(
      "#orchardMap",
      { duration: 4, attr: { viewBox: "3750 1850 300 100" } },
      "-=3"
    );
    // TODO: turn this off or move it into tl
    gsap.to("#magicRing circle", {
      duration: 6,
      rotation: 360,
      ease: "none",
      repeat: -1,
    });
    tl.set("#orchardMap", { attr: { viewBox: "-2400 2000 2000 1000" } });
    tl.from("#magicRing circle", { duration: 1, opacity: 0, stagger: 0.3 });
    tl.to("#flamingone", {
      duration: 2,
      rotation: -90,
      y: "+=500",
      x: "-=250",
    });
    tl.set("#orchardMap", { attr: { viewBox: "0 0 5312 2988" } });
    tl.to("#curtain", { duration: 4, ease: "power4.in", opacity: 1 });
    tl.play();
  },
};
