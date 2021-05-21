import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient.get('/api/v1/users/current').subscribe((res) => {
      console.log(res);
    });
  }
}
