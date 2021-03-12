var saveFile;
var svgContainer = $("#svgContainer");
const curtainTime = 1.5;
//map data
let POIs = [];

//stores the currently equipped item;
var equipped;

//flags
let isTileDown = false;

getCssVar = function (value) {
  return window.getComputedStyle(document.body).getPropertyValue(value);
};

curtainUp = function () {
  gsap.to("#curtain", { duration: curtainTime, opacity: 0 });
};
curtainDown = function () {
  gsap.to("#curtain", { duration: curtainTime, opacity: 1, ease: "power1.in" });
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
  curtainDown();
  loadMap("suburbMap");
};

//load the map
loadMap = function (map) {
  curtainDown();

  // include map specific css
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = `/css/${map}.css`;
  $("head").append(link);

  //include map specific js
  $.getScript(`/js/maps/${map}.js`);
};

if (saveFile == null) {
  // loadMap("firstMap");
  // loadMap("orchardMap");
  die();
}
