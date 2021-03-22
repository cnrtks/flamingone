class PointOfInterest {
  constructor(id, standX, standY, ...descriptions) {
    this.id = id;
    this.standX = standX;
    this.standY = standY;
    this.descriptions = descriptions;
  }
}

class Tool {
  constructor(id, name, path, qty, description) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.qty = qty;
    this.description = description;
  }
}
