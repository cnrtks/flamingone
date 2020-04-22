go = function(){
    $.get("assets/suburbMap/house1.svg", function(data){
        console.log(data);
        $("#suburbContent").html(data);
    });
    // gsap.to("#greyCloud", 45, {rotate: -360, transformOrigin: "center", repeat: -1, ease:Linear.easeNone});
    // gsap.to("#redCloud", 30, {rotate: 360, transformOrigin: "center", repeat: -1, ease:Linear.easeNone});
}
svgContainer.load(`assets/suburbMap/suburbMap.svg`, go);
// svgContainer.load(`assets/suburbMap/maelstrom.svg`, go);