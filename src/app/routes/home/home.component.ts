import { Component, OnInit } from '@angular/core';
import { Carol } from 'src/app/services/carol.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  pageTitle = 'Carol - Home';
  response: any;

  constructor(
    private carol: Carol
  ) {}

  ngOnInit() {
  }

}

