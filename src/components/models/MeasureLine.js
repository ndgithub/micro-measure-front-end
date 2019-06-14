export default class MeasureLine {
  constructor(pt1, pt2, color = '#ff0000', hover = true, selected = false) {
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.color = color;
    this.hover = hover;
    this.selected = selected;
  }
}

