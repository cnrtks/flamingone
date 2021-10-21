let saveFile;

const svgContainer = document.getElementById("svgContainer");
const flamingoneSvg = "assets/flamingone.svg";

const MAPS = {
  FirstMap: {},
  OrcardMap: {},
  SuburbMap: {},
  WitchHouse: {},
  WoodsMap: {},
};

const CURTAIN_DUR = 1.5;
const WALK_DUR = 2;

let equipped = null;

let currentMap = null;
let flamingone = null;
let POIs = [];

//show description(title) while hovering over menu items
$(".menu").tooltip();

//display inventory
$(document).keydown(function (e) {
  populateInventoryScreen();
  if (e.keyCode == 73) $("#inventoryContainer").toggle();
});

//display game menu
//TODO: gotta make this menu
$(document).keydown(function (e) {
  if (e.keyCode == 77) $("#gameMenu").toggle();
});

//init maps
loadMap = function () {
  let map = localStorage.getItem("currentMap");
  try {
    swapStyle("localStyle", MAPS[map].pathCss);
    $(svgContainer).load(MAPS[map].pathSvg, MAPS[map].go);
  } catch {
    console.log("map is invalid");
  }
};
changeMap = function (map) {
  localStorage.setItem("currentMap", map);
  loadMap();
};
loadFlamingone = function (onComplete) {
  $("#flamingoneLayer").load(flamingoneSvg, () => {
    flamingone = document.getElementById("flamingone");
    if (onComplete) onComplete();
  });
};

curtainUp = function (onComplete) {
  gsap.to("#curtain", {
    duration: CURTAIN_DUR,
    opacity: 0,
    onComplete: onComplete,
  });
};
curtainDown = function (onComplete) {
  gsap.to("#curtain", {
    duration: CURTAIN_DUR,
    opacity: 1,
    ease: "power1.in",
    onComplete: onComplete,
  });
};
resetLocalStorage = function () {
  localStorage.clear();
};

//falmingone navigation
//move flamingone to x y coordinates and scales according to y
//TODO: introduce a local scale for z
moveTo = function (x, y, z) {
  walk = gsap.timeline();
  walk.to(flamingone, {
    duration: WALK_DUR,
    x: x,
    y: y,
    scale: z ?? 0.6 + y / 400,
  });
};

movesTo = function (coords) {
  coords.forEach((c) => moveTo(c[0], c[1], c[2]));
};

//check if element overlaps with flamingone
hitTestFlamingone = function (e) {
  return Draggable.hitTest(flamingone, e);
};

//style functions
getCssVar = function (value) {
  return window.getComputedStyle(document.body).getPropertyValue(value);
};

swapStyle = function (linkId, path) {
  document.getElementById(linkId).href = path;
};

//functions pretaining to the maps
// creates poi classes from array of data
localPOIsFromData = function (poiData) {
  poiData.forEach((poi) => {
    POIs.push(
      new PointOfInterest(poi.id, poi.standX, poi.standY, poi.descriptions)
    );
  });
};
//displays first description in dialog box
setDefaultPoiDialog = function () {
  $(".pointOfInterest").contextmenu(function (e) {
    var message = "No Description found";
    for (let poi of POIs) {
      if (poi.id == e.currentTarget.id) message = poi.descriptions[0];
    }
    descriptionDialog(message);
  });
};
//moves flamingone tocoordinates near clicked element
setDefaultPoiMoveTo = function () {
  $(".pointOfInterest").click(function (e) {
    for (let poi of POIs) {
      if (poi.id == e.currentTarget.id) moveTo(poi.standX, poi.standY);
    }
  });
};
initPOIs = function (poiData) {
  localPOIsFromData(poiData);
  setDefaultPoiDialog();
  setDefaultPoiMoveTo();
};

//change drag icon, works best with 0,0 centered svgs
changeDraggerIcon = function (url) {
  $("#draggerIcon").load(url);
  gsap.set("#draggerIcon", { x: 275, y: 0 });
};

//getData
getDeathCount = function () {
//TODO: check if double counting or ++ on wrong side
  return parseInt(localStorage.getItem("deathCount"));
};