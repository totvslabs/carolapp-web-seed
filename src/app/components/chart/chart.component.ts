import { Component, Input, OnInit } from '@angular/core';

import { highlightsColors } from './../../utils/highlights-colors';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() title = '';

  /**
   * Valid types
   *  - line
   *  - column
   *  - bar
   */
  @Input() type = 'line';

  /**
   * Example:
   * ['January', 'February', 'March']
   */
  @Input() categories = [];

  /**
   * Example:
   * [
   *  {data: [3, 4, 4.1, 3.5], label: 'Item 1'},
   *  {data: [4, 3, 2.1, 3.8], label: 'Item 2'}
   * ]
   */
  @Input() series = [];

  /**
   * Example:
   * ['orange', 'blue', '#F00']
   */
  @Input() colors = [
    highlightsColors.blue,
    highlightsColors.green,
    highlightsColors.purple,
    highlightsColors.red,
    highlightsColors.yellow,
    highlightsColors.lightBlue
  ];

  @Input() height = '';

  @Input() legend = true;

  @Input() tooltip = false;

  constructor() { }

  ngOnInit() {
  }

}
