go = function(){
    var houses = d3.select("#houses");
    houses.append("circle").attr("r", 50).attr("fill", "url(/css/firstMap.css#gradPines)");
    for (var i = 0; i < 10; i++){
        houses.append("use").attr("href", "#house").attr("y", 20).attr("x", i*300);
    }
    var gasStation = d3.select("#gasStation");

    sideScroll = function (e) {
        console.log(e.currentTarget);
        var clickRight = e.currentTarget.position().left;
        console.log(clickRight);
        var mainRight = $("#mainGround").offsetLeft();
        gsap.to($("#mainGround"), 3, { xPercent: `${clickRight / mainRight}`, ease: Linear.easeNone });
    }

    $(".clickScroll").click(sideScroll);
}


svgContainer.load(`assets/suburbMapUseDefs/houseDefs.svg`, go);