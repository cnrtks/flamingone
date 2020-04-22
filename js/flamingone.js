gsap.registerPlugin(Draggable);

var saveFile;
var svgContainer = $("#svgContainer");

//stores the currently equipped item;
var equipped;

//flags
let isTileDown = false;

//show description(title) while hovering over menu items
$(".menu").tooltip();

//display tool inventory
$(document).keydown(function (e) {
  if (e.keyCode == 73)
    $("#toolContainer").toggle();
});

//load the map
loadMap = function (map) {
  //include map specific js
  $.getScript(`/js/maps/${map}.js`);

  // include map specific css
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = `/css/${map}.css`;
  $('head').append(link);
}

if (saveFile == null) {
  // loadMap("firstMap");
  loadMap("suburbMap")
}