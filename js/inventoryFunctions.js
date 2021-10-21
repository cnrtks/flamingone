const inventoryContainer = document.getElementById("inventoryContainer");

const items = {
  woodenHoe: {
    id: "woodenHoe",
    name: "Wooden Hoe",
    path: "assets/inventory/tools/woodenHoe.svg",
    qty: 0, //i forgot if qty's need to be here
    description: "It's a gardening tool made from wood.",
  },
  shingle: {
    id: "shingle",
    name: "Shingle",
    path: "assets/flamingone.svg",
    qty: 0,
    description: "This is the fruit of a shingle tree.",
    plantable: true,
    plantPaths: ["#plantShingleTrunkStage4"],
    grow: () => {
      console.log("morp plant here");
    },
  },
};

getInventory = function () {
  return JSON.parse(localStorage.getItem("inventory"));
};

setInventory = function (inventory) {
  localStorage.setItem("inventory", JSON.stringify(inventory));
  populateInventoryScreen();
};

populateInventoryScreen = function () {
  let inv = getInventory();
  $("#inventoryContainer").html("");
  inv.forEach((i) => $("#inventoryContainer").append(createItemImg(i)));
};

//creates <img> strings from tools array
createItemImg = function (item) {
  let itemImg = document.createElement("img");
  itemImg.setAttribute("id", item.id);
  itemImg.setAttribute("src", item.path);
  itemImg.setAttribute("alt", item.description);
  itemImg.setAttribute("title", item.description);
  itemImg.setAttribute("width", "20%");
  itemImg.setAttribute("height", "20%");
  $(itemImg).click(() => {
    equipThis(item);
  });
  return itemImg;
};

//adds item to inventory and alerts player via dialog
youGot = function (item) {
  let inv = getInventory();
  inv.push(item);
  setInventory(inv);
  itemDialog(item.path, item.name, item.message);
};

equipThis = function (item) {
  equipped = item;
};

doesInventoryIncludeId = function (id) {
  let inv = getInventory();
  return inv.some((el) => el.id === id);
};
