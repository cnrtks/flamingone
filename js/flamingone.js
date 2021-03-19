var saveFile;
var svgContainer = $("#svgContainer");
const curtainDur = 1.5;
const walkDur = 2;
var deathCount = 0;
//map data
let POIs = [];
let poiData = [];
//stores the currently equipped item;
var equipped;

//flags
let isTileDown = false;

class PointOfInterest {
  constructor(id, standX, standY, ...descriptions) {
    this.id = id;
    this.standX = standX;
    this.standY = standY;
    this.descriptions = descriptions;
  }
}

class Tool {
  constructor(id, name, path, qty, description) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.qty = qty;
    this.description = description;
  }
}

//move flamingone to x y coordinates and scales according to y
moveTo = function (x, y, z) {
  walk = gsap.timeline();
  walk.to(flamingone, {
    duration: walkDur,
    x: x,
    y: y,
    scale: z ?? 0.6 + y / 400,
  });
};

movesTo = function (coords) {
  coords.forEach((c) => moveTo(c[0], c[1], c[2]));
};

getCssVar = function (value) {
  return window.getComputedStyle(document.body).getPropertyValue(value);
};

swapLocalStyle = function (path) {
  document.getElementById("localStyle").href = path;
};

curtainUp = function () {
  gsap.to("#curtain", { duration: curtainDur, opacity: 0 });
};
curtainDown = function (onComplete) {
  gsap.to("#curtain", {
    duration: curtainDur,
    opacity: 1,
    ease: "power1.in",
    onComplete: onComplete,
  });
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

//show description(title) while hovering over menu items
$(".menu").tooltip();

//display tool inventory
$(document).keydown(function (e) {
  if (e.keyCode == 73) $("#toolContainer").toggle();
});

die = function () {
  deathCount++;
  curtainDown(loadMap("suburbMap"));
};

ressurect = function () {
  loadMap("firstMap");
};

//load the map
loadMap = function (map) {
  curtainDown(() => {
    // include map specific css
    swapLocalStyle(`/css/${map}.css`);
    //include map specific js
    $.getScript(`/js/maps/${map}.js`);
  });
};

if (saveFile == null) {
  loadMap("firstMap");
  // loadMap("orchardMap");
  // die();
}
