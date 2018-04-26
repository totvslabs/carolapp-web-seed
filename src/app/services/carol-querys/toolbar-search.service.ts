import { Injectable } from '@angular/core';

import { HttpRequestsService } from '../../services/http-requests.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ToolbarSearchService {

  constructor(private request: HttpRequestsService) { }

  getList(value) {

    // Example request:
    // const params = {
    //   name: value
    // };
    // return this.request.executeNamedQuery('findSomething', params);

    // Fake request
    return new Observable((observer) => {
      observer.next([
        {label: 'Item 1', value: '1'},
        {label: 'Item 2', value: '2'},
        {label: 'Item 3', value: '3'},
        {label: 'Item 4', value: '4'},
        {label: 'Item 5', value: '5'},
      ]);
      observer.complete();
    });
  }

}
