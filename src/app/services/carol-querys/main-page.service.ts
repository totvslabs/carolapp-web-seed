import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { HttpRequestsService } from '../../services/http-requests.service';

@Injectable()
export class MainPageService {

  constructor(private request: HttpRequestsService) { }

  getDataResultBoxes(param) {

    // Exemple real request:
    //   return this.request.executeNamedQuery('dataResultBoxes', { filter: param });

    // Fake request
    return new Observable((observer) => {
      observer.next('');
      observer.complete();
    });
  }

}
