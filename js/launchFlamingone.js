//game logic functions
die = function () {
  deathCount++;
  curtainDown(()=>{changeMap(SuburbMap)});
};

ressurect = function () {
  SuburbMap.stop();
  changeMap(FirstMap);
};

if (saveFile == null) {
  currentMap = FirstMap;
  loadMap();
}
