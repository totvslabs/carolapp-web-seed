import { Component, OnInit } from '@angular/core';
import { Carol } from 'src/app/services/carol.service';
import { Customer } from 'src/data-models/customer';
import { InvoiceHeader } from 'src/data-models/invoice-header';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  pageTitle = 'Carol - Home';

  constructor(
    private carol: Carol
  ) {}

  ngOnInit() {
  }

}

