import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

import { I18nService } from '../../services/i18n.service';
import { MainPageService } from '../../services/carol-querys/main-page.service';

import { highlightsColors } from '../../utils/highlights-colors';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  filterExample;

  resultBoxes;

  totalFidCustomers = '';
  totalNotFidCustomers = '';

  seriesFidCustomers = [];
  categoriesFidCustomers = [];

  literals = [];

  constructor(private mainPageService: MainPageService,
              private i18n: I18nService) { }

  ngOnInit() {

    this.literals = this.i18n.getLiterals();

    this.resultBoxes = [{
      title: '',
      content: this.literals['lExample'],
      color: highlightsColors.lightBlue
    },
    {
      title: '',
      content: this.literals['lExample'],
      color: highlightsColors.blue,
      percentageValue: '-10',
      percentageText: this.literals['lComparedToPreviousMonth']
    },
    {
      title: '',
      content: this.literals['lExample'],
      color: highlightsColors.purple
    },
    {
      title: '',
      content: this.literals['lExample'],
      color: highlightsColors.red,
      percentageValue: '50',
      percentageText: this.literals['lComparedToPreviousMonth']
    }];


    // to demonstrate the loading
    setTimeout(() => {
      this.resultBoxes[0].title = '1000';
      this.resultBoxes[1].title = '2000';
      this.resultBoxes[2].title = '3000';
      this.resultBoxes[3].title = '4000';
    }, 2000);


    this.loadData();
  }

  loadData() {

    this.mainPageService.getDataResultBoxes(this.filterExample)
      .subscribe(result => {

      }, error => {

      });

  }

}
