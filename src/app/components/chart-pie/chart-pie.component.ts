import { Component, Input, OnInit } from '@angular/core';

import { highlightsColors } from './../../utils/highlights-colors';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'chart-pie',
  templateUrl: './chart-pie.component.html',
  styleUrls: ['./chart-pie.component.css']
})
export class ChartPieComponent implements OnInit {

  @Input() title = '';

  /**
   * Example:
   * [
   *   { label: 'Eaten', value: 0.42 },
   *   { label: 'Not eaten', value: 0.58 }
   * ]
   */
  @Input() data: Array<any>;

  /**
   * Example:
   * ['orange', 'blue', '#F00']
   */
  @Input() colors: Array<string> = [
    highlightsColors.blue,
    highlightsColors.green,
    highlightsColors.purple,
    highlightsColors.red,
    highlightsColors.yellow,
    highlightsColors.lightBlue
  ];

  @Input() legend = true;

  @Input() height = '';

  constructor() { }

  ngOnInit() {
  }

}
