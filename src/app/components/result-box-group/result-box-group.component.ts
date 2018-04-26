import { Component, Input, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'result-box-group',
  templateUrl: './result-box-group.component.html',
  styleUrls: ['./result-box-group.component.css']
})
export class ResultBoxGroupComponent implements OnInit {

   _values = [
    {
      title: '',
      content: '',
      color: '',
      percentageValue: '',
      percentageText: ''
    }
  ];

  @Input() set values(values) {
    if (typeof values === 'object') {
      this._values = values;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
