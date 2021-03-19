let ns = {
  svg: "http://www.w3.org/2000/svg",
  xlink: "http://www.w3.org/1999/xlink",
};

//create svg elements
createSvgElement = function (element, params) {
  let e = document.createElementNS(ns.svg, element);
  if (!params) return e;
  Object.entries(params).forEach((p) => {
    const [attribute, value] = p;
    e.setAttributeNS(null, attribute, value);
  });
  return e;
};

//shortcuts for common elements
group = function (params) {
  return createSvgElement("g", params);
};

path = function (params) {
  return createSvgElement("path", params);
};

use = function (params) {
  return createSvgElement("use", params);
};

rect = function (params) {
  return createSvgElement("rect", params);
};

//what the fuck is this?
ringFromPath = function (pathId, params) {
  let boundingRect = pathId.getBoundingClientRect();
  let midX = boundingRect.width / 2 + boundingRect.left;
  let midY = boundingRect.height / 2 + boundingRect.top;
  let radius = params && params["radius"] ? params.radius : boundingRect.height;
  let circumference = radius * 2 * Math.PI;
  let cuts =
    params && params["cuts"]
      ? params.cuts
      : Math.floor(circumference / boundingRect.width);
  let sourcePathD = pathId.getAttribute("d");
  let fullPath = "";

  for (i = 1; i <= cuts; i++) {
    let pathPartial = path({ d: sourcePathD });
    var angleRad = (2 * Math.PI * i) / cuts;
    pathPartial.style.transformOrigin = "center";
    pathPartial.style.transform = `rotate(${angleRad}rad)`;
    pathPartial.style.transform = `translate(${radius * Math.sin(angleRad)}, ${
      radius * Math.cos(angleRad)
    })`;
    fullPath += pathPartial.getAttribute("d");
  }

  console.log(radius, circumference, cuts, path);
  console.log(fullPath);
};
