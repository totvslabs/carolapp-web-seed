import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'result-box',
  templateUrl: './result-box.component.html',
  styleUrls: ['./result-box.component.css']
})
export class ResultBoxComponent implements OnInit {

  _boxColor = '#D7D7D7';
  _titleColor = '#354050';

  @Input('box-color') set boxColor(boxColor) {
    if (boxColor) {
      this._boxColor = boxColor;
      this._titleColor = boxColor;
    }
  }

  @Input() title = '';

  @Input() titleUnit = '';

  constructor() { }

  ngOnInit() {
  }

}
