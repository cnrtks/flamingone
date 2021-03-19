//global values and such

//location / positioning
const houseWidth = 300;
const houseScale = 1.5;
let lotUnit = houseWidth * houseScale;
let houseY = 108; //presumably theres a calculated value to be use here instead
let houseNo = 0;
//end of location / positioning

//jobs
let unemployed = { title: "worthless peice of shit", wages: 0, hours: 8 };
let cashier = { title: "gas station cashier", wages: 5, hours: 4 };
let driver = { title: "forklift operator", wages: 7, hours: 6 };
let typer = { title: "some boring office bitch", wages: 10, hours: 8 };
//end of jobs

//flamingone stuff
let flamingoneData = {
  busy: false,
  speed: 5, //meters per second....ish
  money: 0,
  rent: 500,
  flamingoneJob: unemployed,
};
//end of flamingone stuff

poiData = [
  {
    id: "gasStation",
    coords: [2000, 0],
    descriptions: ["Gnash 'n Misbehave 'n Gluttony 'n Such"],
  },
  { id: "college", descriptions: ["A place for learning"] },
  { id: "university", descriptions: ["A place for learning, but better"] },
  {
    id: "warehouse",
    descriptions: ["This warehouse eats boxes and shits out boxes."],
  },
  { id: "office", descriptions: ["Office"] },
];

//style arrays for houses
const houseColors = [
  "White",
  "Gray",
  "Brown",
  "Red",
  "Pink",
  "Yellow",
  "Green",
  "Blue",
  "SkyBlue",
  "Purple",
];
//trim and doors use same pool
const houseTrimColors = [
  "Black",
  "White",
  "Gray",
  "Brown",
  "BrownDark",
  "Green",
  "Blue",
  "BlueLight",
  "Purple",
];

//garage doors
const garageDoorColors = ["White", "Blue"];

//roof and awnings are using the same
const houseRoofColors = ["Gray", "Black"];

//colors for stained glass
const stainedGlassColors = [
  "--red",
  "--red-light",
  "--orange",
  "--yellow",
  "--green",
  "--rust",
];
//end of global variables

//suburb specific functions

//generates a random house
generateHouse = function () {
  //TODO: add in random paths for windows and shit
  //TODO: add random flags/cars/mailboxes/lawn ornaments/trees
  let houseFrontPaths = [
    "#houseFrontLawn",
    "#houseFrontFence",
    `#houseWalkway${gsap.utils.random([0, 1])}`,
    "#houseDriveway",
    "#houseCurb",
    "#houseInterior",
    "#houseGarageDoor0",
    "#houseFrontDoor0",
    "#houseHindFace0",
    "#houseMidFace0",
    "#houseTopRoofFace0",
    "#houseTopRoof0",
    "#houseFirstEaves",
    "#houseSecondEaves",
    "#houseForeFace0",
    "#houseTurretFace0",
    "#houseTurretAwning0",
  ];
  let houseId = "houseNo" + houseNo;
  //generates a color scheme for the house
  let classString = `house house${gsap.utils.random(
    houseColors
  )} houseTrim${gsap.utils.random(
    houseTrimColors
  )} houseDoor${gsap.utils.random(
    houseTrimColors
  )} houseRoof${gsap.utils.random(
    houseRoofColors
  )} houseAwning${gsap.utils.random(
    houseRoofColors
  )} garageDoor${gsap.utils.random(garageDoorColors)}`;

  let house = group({ id: houseId, class: classString });
  //TODO:add generic paths (no random elements yet)
  houseFrontPaths.forEach((p) => {
    house.appendChild(path({ d: $(p).attr("d"), class: $(p).attr("class") }));
  });

  houseNo++;
  return house;
};

//generates back of house
generateBackHouse = function () {
  let houseBackPaths = [
    `#backLawn`,
    `#backHouseFace${gsap.utils.random([0, 1])}`,
    `#backRoof${gsap.utils.random([0, 1])}`,
    `#backWindowLeft${gsap.utils.random([0, 1])}`,
    `#backWindowRight${gsap.utils.random([0, 1])}`,
  ];
  //TODO:fix existing paths to look good and make additional ones
  //TODO: needs color schemes? maybe

  //addhouse shape
  //TODO: add chimneys and fans and shit
  //FIXME: like paths with different colors will need to be <path> rather than <use>
  let house = group();
  houseBackPaths.forEach((p) => {
    house.appendChild(use({ href: p }));
  });

  //1/3 chance of tree inside yard
  //TODO:seperate pool of trees and bushes for inside and outside of fence
  if (!Math.floor(Math.random() * 3))
    house.appendChild(use({ href: `#backGarden${gsap.utils.random([0, 1])}` }));
  //TODO:addground
  //adds fence
  house.appendChild(use({ href: `#backFence${gsap.utils.random([0, 1])}` }));
  //1/3 chance of tree outside fence
  if (!Math.floor(Math.random() * 3))
    house.appendChild(use({ href: `#backGarden${gsap.utils.random([0, 1])}` }));

  houseNo++;
  return house;
};

//generate a bunch of houses side by side, back of house boolean
generateHouseBlock = function (noOfHouses, back) {
  let block = group();
  for (i = 0; i < noOfHouses; i++) {
    let house = back ? generateBackHouse() : generateHouse();
    //flips even houses
    i % 2
      ? gsap.set(house, { x: i * houseWidth + houseWidth + 2, scaleX: -1 })
      : gsap.set(house, { x: i * houseWidth });
    block.appendChild(house);
  }
  return block;
};
//end of suburb generation specific functions

//suburb functions
atJob = function () {
  busy = true;
};

finishJob = function (wage) {
  busy = false;
  money += wage;
};

jobOffer = function (job) {
  yesNo(`Would you like to work as ${job.title} for ${job.wages}?`, (job) => {
    flamingoneJob = job;
    goToWork(job);
  });
};

//TODO: do it yo
goToWork = function (job) {
  //go to job target (add to master timeline)
  //set to busy
  //timeout til hours
  //not busy
  //go home
};

go = function () {
  // PointC
  // 8 may 2018
  // Parallax SVG viewBoxes
  // source code
  // https://greensock.com/forums/topic/18305-quick-tip-technique-parallax-svg-viewboxes/

  let factor = [2, 14, 20, 36];
  let travel = 360;

  Draggable.create("#dragger", {
    type: "x",
    bounds: {
      minX: -travel,
      maxX: travel,
    },
    throwProps: true,
    edgeResistance: 1,
    onDrag: onDrag,
    onThrowUpdate: onDrag,
  });

  function onDrag() {
    for (i = 0; i < 4; i++) {
      gsap.set("#layer" + i, {
        attr: {
          viewBox: 960 + this.x * factor[i] + " 0 1920 1080",
        },
      });
    }
  }
  //end of Parallax SVG Viewbox

  //change drag icon, works beset with centered svgs
  changeIcon = function (url) {
    $("#draggerIcon").load(url);
    gsap.set("#draggerIcon", { x: 275, y: 0 });
  };

  //centers start position
  onDrag((x = 0));

  //initialize with cross
  changeIcon("/assets/icons/diamondCross.svg");

  //centers dragger
  gsap.set(".draggerBounds", { xPercent: -50 });
  // end of parallaxMotion

  //generates a diamond pattern for stained glass to overwrite #patternStainedGlass in suburbMap.svg<defs>
  //FIXME:this stained glass is all over the place index.html#defs suburb.css suburbPalette.css and here. make more modular
  //FIXME:fills with actual hex value, maybe switch to classes instead of fills if you are bored. not necessary, though
  let diamonds = group();
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      diamonds.appendChild(
        rect({
          x: j,
          y: i,
          width: 1,
          height: 1,
          fill: getCssVar(gsap.utils.random(stainedGlassColors)),
        })
      );
    }
  }
  patternStainedGlass.appendChild(diamonds);

  //vector maelstrom init
  // gsap.set("#maelstrom", {
  //   xPercent: 210,
  //   yPercent: 25,
  // });
  //initialize maelstrom animations
  //FIXME: create one unified maelstrom timeline
  // gsap.to("#maelstromCloudFront", 60, {
  //   transformOrigin: "50% 50%",
  //   repeat: -1,
  //   rotate: 360,
  //   ease: "none",
  // });
  // gsap.to("#maelstromCloudMiddle", 90, {
  //   transformOrigin: "50% 50%",
  //   repeat: -1,
  //   rotate: -360,
  //   ease: "none",
  // });
  // gsap.to("#maelstromCloudBack", 120, {
  //   transformOrigin: "50% 50%",
  //   repeat: -1,
  //   rotate: 360,
  //   ease: "none",
  // });
  //end of vector maelstrom stuff

  //init maelstrom (the png one)
  gsap.set("#maelstromHeart", { x: 2000, y: 200 });
  // gsap.set("#maelstromVortex", {x:})

  const vortecies = $(".vortex").children().get();
  vortecies.forEach((layer, i) => {
    gsap.to(layer, {
      duration: 600 / (i + 1),
      transformOrigin: "50% 50%",
      rotate: i % 2 ? 360 : -360,
      repeat: -1,
    });
  });

  //generate front facing houses
  $("#houseDefs").load("/assets/suburbMap/house.svg", () => {
    block0.appendChild(generateHouseBlock(7));
    block1.appendChild(generateHouseBlock(14));
    block2.appendChild(generateHouseBlock(7));
    block3.appendChild(generateHouseBlock(9));
    thirdStreet.appendChild(generateHouseBlock(90));
  });
  // position mainstreet house blocks and third street
  //TODO: eliminate repeated code
  gsap.set(block0, { x: lotUnit * -20, y: houseY * 1.5, scale: houseScale });
  gsap.set(block1, { x: lotUnit * -9, y: houseY * 1.5, scale: houseScale });
  gsap.set(block2, { x: lotUnit * 9, y: houseY * 1.5, scale: houseScale });
  gsap.set(block3, { x: lotUnit * 20, y: houseY * 1.5, scale: houseScale });
  gsap.set(thirdStreet, {
    x: lotUnit * -10,
    y: houseY * 3,
    scale: houseScale / 3,
  });
  // load and position gas station
  $("#gasStationLoad").load(
    "/assets/suburbMap/gasStation.svg#gasStation",
    () => {
      gsap.set("#gasStationLoad", {
        scale: houseScale / 2,
        x: lotUnit * 6,
        y: houseY,
      });

      $("#tongueDoorLeft").click(() => {
        jobOffer(cashier);
      });
    }
  );

  //initialize second street
  // secondStreet
  //backhouses
  $("#backHouseDefs").load("/assets/suburbMap/backHouse.svg#backHouse", () => {
    secondBlock0.appendChild(generateHouseBlock(6, true));
    secondBlock1.appendChild(generateHouseBlock(25, true));
    secondBlock2.appendChild(generateHouseBlock(6, true));
    gsap.set(secondBlock0, { scale: 0.8, x: lotUnit * -9, y: 450 });
    gsap.set(secondBlock1, { scale: 0.8, x: lotUnit * -3, y: 450 });
    gsap.set(secondBlock2, { scale: 0.8, x: lotUnit * 14, y: 450 });
  });
  //university
  $("#universityLoad").load(
    "/assets/suburbMap/university.svg#university",
    () => {
      gsap.set("#universityLoad", { x: lotUnit * -13.5 });
    }
  );
  //college
  $("#collegeLoad").load("/assets/suburbMap/college.svg#college", () => {
    gsap.set("#collegeLoad", { x: lotUnit * -5.5, y: houseY * 2 });
  });
  $("#warehouseLoad").load("/assets/suburbMap/warehouse.svg#warehouse", () => {
    gsap.set("#warehouseLoad", {
      scale: houseScale,
      x: lotUnit * 10.5,
      y: houseY * 3,
    });
  });
  $("#officeLoad").load("/assets/suburbMap/office.svg#office", () => {
    gsap.set("#officeLoad", {
      scale: houseScale,
      x: lotUnit * 18,
      y: houseY * 3,
    });
  });
  //end of second street

  //initialize Flamingone
  $("#flamingoneContainer").load("/assets/flamingone.svg#flamingone", () => {
    let flamingone = document.getElementById("flamingone");
    moveTo(500, 400, 0.8);
    $(flamingone).click(()=>{leaveHell()})
  });
  leaveHell = function(){
    yesNo("Do you want to return to the surface?", ressurect)
  }
  //remove once load order sorted
  setTimeout(() => {
    initPOIs(poiData);
    descriptionDialog("The 'Suburban Hellscape' section of the game is incomplete, just click on the flamingone whenever you are finished having a look around")
  }, 500);
  curtainUp();
};

svgContainer.load(`/assets/suburbMap/suburbMap.svg`, go);
