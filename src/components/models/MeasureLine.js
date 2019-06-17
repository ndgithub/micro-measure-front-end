export default class MeasureLine {
  constructor(pt1, pt2, color = '#ff0000', hover = true, isHover = false, isSelected = false) {
    this.id = MeasureLine.counter++;
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.color = color;
    this.isHover = isHover;
    this.isSelected = isSelected;



    // status: hover, active,  
  }


}

MeasureLine.counter = 0;
