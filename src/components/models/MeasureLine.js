export default class MeasureLine {
  constructor(pt1, pt2, color = '#ff0000', active = true, selected = true) {
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.color = color;
    this.active = active;
    this.selected = selected;
  }
}

