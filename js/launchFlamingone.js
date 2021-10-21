//game logic functions
die = function () {
  let deaths = localStorage.getItem("deathCount");
  localStorage.setItem('deathCount', ++deaths);//WHY THE FUCK CANT THIS BE ONE LINE OF CODE?
  curtainDown(() => {
    changeMap("SuburbMap");
  });
};

ressurect = function () {
  MAPS.SuburbMap.stop();
  changeMap("FirstMap");
};

//on load, if new game else load game
if (localStorage.getItem("saveFile") == null) {
  localStorage.setItem("inventory", JSON.stringify([])); //this is probably the wrong approach
  localStorage.setItem("shingleState", "onTree");
  localStorage.setItem("saveFile", "true");
  localStorage.setItem("currentMap", "FirstMap");
  localStorage.setItem('deathCount', '0');
  SoftSoil.setSoilStates(DefaultSoilStates);
  loadMap();
} else {
  localStorage.getItem("currentMap");
  loadMap();
}
