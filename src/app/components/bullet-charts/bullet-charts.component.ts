import { Component, Input, OnInit } from '@angular/core';

import { BulletCharts } from './bullet-charts.interface';

import { numberPunctation } from '../../utils/numbers.util';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bullet-charts',
  templateUrl: './bullet-charts.component.html',
  styleUrls: ['./bullet-charts.component.css']
})
export class BulletChartsComponent implements OnInit {

  _bulletCharts = [];

  @Input() title = '';

  @Input() height = '100';

  @Input() primaryColor = '#98CBE5';

  @Input() secundaryColor = '#CCE5F1';

  @Input('values') set bulletCharts(bulletCharts: Array<BulletCharts>) {
    this._bulletCharts = bulletCharts;

    this._bulletCharts.forEach(value => {
      value['bulletValueAxis'] = {
        min: 0,
        max: value.max,
        plotBands: [
          {
            from: 0, to: value.value, color: value.primaryColor ? value.primaryColor : this.primaryColor
          }, {
            from: value.value, to: value.max, color: value.secundaryColor ? value.secundaryColor : this.secundaryColor
          }
        ]
      };
      value.value = numberPunctation(value.value);
      value.max = numberPunctation(value.max);
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
