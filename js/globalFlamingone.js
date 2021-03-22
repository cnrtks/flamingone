let saveFile;

const svgContainer = document.getElementById("svgContainer");
const flamingoneSvg = "/assets/flamingone.svg";

const CURTAIN_DUR = 1.5;
const WALK_DUR = 2;

let deathCount = 0;

let currentMap = null;
let flamingone = null;
let POIs = [];

//tool functions
//show description(title) while hovering over menu items
$(".menu").tooltip();

//display tool inventory
$(document).keydown(function (e) {
  if (e.keyCode == 73) $("#toolContainer").toggle();
});

//init maps
loadMap = function () {
  try {
    swapStyle("localStyle", currentMap.pathCss);
    $(svgContainer).load(currentMap.pathSvg, currentMap.go);
  } catch {
    console.log("map is invalid");
  }
};
changeMap = function (map) {
  currentMap = map;
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
