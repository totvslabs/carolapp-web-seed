import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'percentage-result',
  templateUrl: './percentage-result.component.html',
  styleUrls: ['./percentage-result.component.css']
})
export class PercentageResultComponent implements OnInit {

  _color = '#AFB8C2';
  _direction = 'zero';
  _arrowImg = 'assets/arrows/arrow-zero.png';
  _value = '0%';

  @Input() set value(value) {
    this._value = value + '%';

    if (parseFloat(value) > 0) {
      this._direction = 'up';
      this._color = '#19BC7E';
      this._arrowImg = 'assets/arrows/arrow-up.png';
    } else if (parseFloat(value) < 0) {
      this._direction = 'down';
      this._color = '#FF0005';
      this._arrowImg = 'assets/arrows/arrow-down.png';
    } else {
      this._direction = 'zero';
      this._color = '##AFB8C2';
      this._arrowImg = 'assets/arrows/arrow-zero.png';
      this._value = '0%';
    }
  }

  @Input() text = '';

  constructor() { }

  ngOnInit() {
  }

}
