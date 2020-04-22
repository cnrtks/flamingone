var tools = new Array();

//import inventoryItems.json for inventories data// this should probably move to file load js or something?
$.ajax({
    type: "GET", url: "data/inventoryItems.json",
    dataType: "json", success: loadInventory,
    error: function (e) { alert(`${e.status} - ${e.statusText}`) }
});

// loadInventory into tools array//
function loadInventory(data) {
    for (let tool of data.tools) {
        tools.push(new Tool(tool.id, tool.name, tool.path, tool.qty, tool.description));
    }
    populateToolMenu();
} // end of loadInventory

//adds each inventory image to inventory container
populateToolMenu = function () {
    $("#toolContainer").html("");
    $.each($(tools), function (i, value) {
        if (value.qty > 0)
            $("#toolContainer").append(createToolImg(value.id, value.path, value.description));
    });
}

//creates <img> strings from tools array
createToolImg = function (id, path, description) {
    return `<img id=${id} src=${path} alt="${description}" title="${description}" width="256px" height="256px"/>`
}

//adds tool to inventory and alerts player via dialog
youGot = function (tool) {
    tool.qty++;
    $("#toolContainer").append(createToolImg(tool.id, tool.path, tool.description));
    itemDialog(tool.path, tool.name, tool.message);
}