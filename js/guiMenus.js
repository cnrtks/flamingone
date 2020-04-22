//descriptionDialog
descriptionDialog = function (message) {
    $("#messageImg").hide();
    $("#messageP").html(message);
    $("#messageContainer").dialog({ closeText: "X" });
}

itemDialog = function (path, name, message) {
    $("#messageImg").attr({
        src: path,
        alt: message
    }).show();
    $("#messageP").html(`You got ${name}`);
    $("#messageContainer").dialog({ closeText: "X" });
}

displayInventory = function () {
    $("#invnetoryContainer").hide();
}

//unused?
$('.closeButton').click(function (e) {
    $(e.target).parent().hide();
})