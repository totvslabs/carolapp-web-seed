import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})
export class ChartPieComponent implements OnInit {

  @Input() colors = ['#FF817D', '#32C3D1', '#FFD357', '#8ADC6B', '#508CF4', '#7A7492', '#E2376D', '#00B4C4', '#D7C2B6', '#92F5CC'];

  /**
   * Example:
   * [
   *   { label: 'Eaten', value: 0.42 },
   *   { label: 'Not eaten', value: 0.58 }
   * ]
   */
  _data = [];
  @Input() set data(data) {
    if (data.length > this.colors.length) {
      data.forEach(x => {
        this.colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
      });
    }
    this._data = data;
  }

  /**
   * Pie, Donut
   */
  @Input() type = 'pie';

  @Input() legend = true;

  @Input() legendPosition = 'bottom';

  @Input() legendOrientation = 'horizontal';

  @Input() tooltip = false;

  @Input() height = '';

  /**
   * category or value
   */
  @Input() content = false;

  constructor() { }

  ngOnInit() {
  }

  labelContent(e) {
    return e['value'];
  }

}
