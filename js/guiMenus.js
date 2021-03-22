//descriptionDialog
descriptionDialog = function (message) {
    $("#messageImg").hide();
    $("#messageP").html(message);
    $("#messageContainer").dialog({ closeText: "X", modal: false, buttons: {} });
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

//yesNo
yesNo = function(message, functionYes, functionNo) {
  $("#messageP").html(message);
  $("#messageContainer").dialog({
    closeText: "X",
    modal: true,
    buttons: {
      Yes: function () {
        functionYes();
        $(this).dialog("close");
      },
      No: function () {
        functionNo();
        $(this).dialog("close");
      },
    },
  });
}

//unused?
$('.closeButton').click(function (e) {
    $(e.target).parent().hide();
})