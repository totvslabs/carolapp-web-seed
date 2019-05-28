import { Component, OnInit } from '@angular/core';
import { Carol } from 'src/app/services/carol.service';
import { ThfNotificationService } from '@totvs/thf-ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  
  pageTitle: string;
  queryResponse: any;
  customer: any = {};

  constructor(
    private carol: Carol,
    private notification: ThfNotificationService

  ) {}

  ngOnInit() {
    this.pageTitle = 'Home';

    this.carol.query().from('mdmcustomerGolden').execute().subscribe(response => this.queryResponse = response);
  }

  save(customer) {
    this.carol.postGolden('mdmcustomer', customer).subscribe(response => {
      this.notification.success('Customer saved');
    });
  }
} 

