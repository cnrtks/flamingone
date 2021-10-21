const DefaultSoilStates = [
  {
    id: "graveDirt",
    selectorId: "#graveDirt",
    state: null,
    plantedHere: null,
    plantStage: null,
    x: 600,
    y: 470,
    z: 1,
    //TODO: change this to graveDirt svg
    svgPath: "/assets/inventory/tools/woodenHoe.svg",
  },
  { id: "volcano", state: null, plantedHere: null, x: 0, y: 0, z: 1 },
];

const SoftSoil = {
  getSoilStates: () => {
    return JSON.parse(localStorage.getItem("soilState"));
  },
  setSoilStates: (currentSoilStates) => {
    localStorage.setItem("soilState", JSON.stringify(currentSoilStates));
  },
  getSoilState: (id) => {
    let soilStates = SoftSoil.getSoilStates();
    return soilStates.find((el) => el.id === id);
  },
  setSoilState: (id, updatedSoilState) => {
    let soilStates = SoftSoil.getSoilStates();
    let thisSoil = soilStates.findIndex((el) => el.id === id);
    soilStates[thisSoil] = updatedSoilState;
    SoftSoil.setSoilStates(soilStates);
  },
  initMapSoil: () => {
    $(".softSoil").click((event) => {
      let softSoilSpot = SoftSoil.getSoilState(event.target.getAttribute("id"));
      //TODO: plantedHere is class? no thats dumb
      if (!softSoilSpot.plantedHere) {
        if (equipped.id == "woodenHoe") SoftSoil.tillSoil(softSoilSpot);
        else if (equipped.plantable) SoftSoil.plant(softSoilSpot, equipped);
      } else {
        softSoilSpot.morphToPlantStage();
      }
    });
  },
  tillSoil: (softSoilSpot) => {
    let sssElem = document.getElementById(softSoilSpot.id);
    $(sssElem).addClass("tilled");
  },
  changePlantedHere: (softSoilSpot, plantedHere) => {
    softSoilSpot.plantedHere = plantedHere;
    SoftSoil.setSoilState(softSoilSpot);
  },
  morphToPlantStage: (softSoilSpot, stage) => {
    gsap.to(softSoilSpot.selectorId, {
      duration: 1,
      x: softSoilSpot.x,
      y: softSoilSpot.y,
      morphSVG: softSoilSpot.plantedHere.plantPaths[stage],
    });
  },
  plant: (softSoilSpot, plant) => {
    SoftSoil.changePlantedHere(softSoilSpot, plant);
    SoftSoil.morphToPlantStage(softSoilSpot, 0);
  },
};
