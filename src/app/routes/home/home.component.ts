import { Component, OnInit } from '@angular/core';
import { Carol } from 'src/app/services/carol.service';
import { Customer } from 'src/data-models/customer';

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
    this.carol.query<Customer>()
        .from(Customer)
        .and(Customer.mdmGoldenFieldAndValues.mdmname).like('alfredo')
        .execute().subscribe(response => {
      this.response = response;
    });
  }

}

