import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { QueryFactory } from './query.service';

@Injectable({
  providedIn: 'root'
})
export class Carol {

  private templatesMapByName: any;

  constructor(
    private queryFactory: QueryFactory,
    private http: HttpClient
  ) {}

  query<T>() {
    return this.queryFactory.getInstance<T>();
  }

  postGolden(dataModel: any, mdmGoldenFieldAndValues: T) {
    if (typeof dataModel !== 'string') {
      dataModel = dataModel.prototype.dataModelName;
    }

    return new Observable(observer => {
      this.getTemplates().subscribe(templatesByName => {
        this.http
          .post(`/api/v1/entities/templates/${templatesByName[dataModel].mdmId}/goldenRecords`, mdmGoldenFieldAndValues)
          .subscribe(response => {
            observer.next(response);
            observer.complete();
          });
      });
    });
  }

  updateGolden(dataModel: any, mdmId: string, mdmGoldenFieldAndValues: any) {
    if (typeof dataModel !== 'string') {
      dataModel = dataModel.prototype.dataModelName;
    }

    return new Observable(observer => {
      this.getTemplates().subscribe(templatesByName => {
        this.http
          .post(`/api/v1/entities/templates/${templatesByName[dataModel].mdmId}/goldenRecords/${mdmId}/edit`, mdmGoldenFieldAndValues)
          .subscribe(response => {
            observer.next(response);
            observer.complete();
          });
      });
    });
  }


  deleteGolden(dataModel: any, mdmId: string) {
    if (typeof dataModel !== 'string') {
      dataModel = dataModel.prototype.dataModelName;
    }

    return new Observable(observer => {
      this.getTemplates().subscribe(templatesByName => {
        this.http
          .delete(`/api/v1/entities/templates/${templatesByName[dataModel].mdmId}/goldenRecords/${mdmId}`)
          .subscribe(response => {
            observer.next(response);
            observer.complete();
          });
      });
    });
  }

  private getTemplates() {
    if (this.templatesMapByName) {
      return new Observable(observer => {
        observer.next(this.templatesMapByName);
        observer.complete();
      });
    }

    return this.http.get('/api/v1/admin/entities/templates').pipe(map(
      (templates: any) => {
        this.templatesMapByName = {};
        templates.hits.forEach(template => {
          this.templatesMapByName[template.mdmName] = template;
        });

        return this.templatesMapByName;
      }
    ));
  }
}
