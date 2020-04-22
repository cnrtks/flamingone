//move flamingone to x y coordinates and scales according to y
moveTo = function (x, y) {
    walk = gsap.timeline();
    walk.to(flamingone, 2, { x: x, y: y, scale: .6 + y / 400 });
}