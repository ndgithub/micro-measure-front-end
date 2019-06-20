export default class MeasureLine {
  constructor(pt1, pt2, isHover = false, isSelected = false) {
    this.id = MeasureLine.counter++;
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.isHover = isHover;
    this.isSelected = isSelected;
  }


}

MeasureLine.counter = 0;
