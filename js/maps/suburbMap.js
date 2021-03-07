go = function () {
    // $.get("assets/suburbMap/house1.svg", function(data){
    //     console.log(data);
    //     $("#suburbContent").html(data);
    // });
    gsap.to("#greyCloud", 45, { rotate: -360, transformOrigin: "center", repeat: -1, ease: Linear.easeNone });
    gsap.to("#redCloud", 30, { rotate: 360, transformOrigin: "center", repeat: -1, ease: Linear.easeNone });

    sideScroll = function (e) {
        console.log(e.offsetX);
        gsap.to("#mainground", 3, { x: `-=${2 * (e.offsetX - $(document).width()/2)}`, ease: Linear.easeNone });
    }

    $("#svgContainer").click(sideScroll);
}
svgContainer.load(`assets/suburbMap/suburbMap.svg`, go);
// svgContainer.load(`assets/suburbMap/maelstrom.svg`, go);

// var sampleSVG = d3.select("body").append("svg").attr({width: 300, height: 300});//delete moi

// var mapSvgs = [
//     { url: "https://cdn.worldvectorlogo.com/logos/something-special.svg", color:'purple' }
// ];

// var q = d3.queue();
// mapSvgs.forEach(function (mapSvg) {
//     q.defer(d3.xml, mapSvg.url, "image/svg+xml");
// });

// q.awaitAll(function (error, results) {
//     $("svgContainer").selectAll('g.mapSvg').data(mapSvgs).enter().append('g').attr('class', 'svgMap')
//         .attr('transform', function () {
//             return 'translate(0,0)'
//         }).each(function (d, i) {
//             this.appendChild(results[i].documentElement);
//             d3.select(this).select('svg').select("*").attr("stroke", function(){return d.color;});
//         })
// })