import { Injectable } from '@angular/core';
import { QueryFactory } from './query.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class Carol {

    private templatesMapByName: any;

    constructor(
        private queryFactory: QueryFactory,
        private http: HttpClient
    ) {}

    query() {
        return this.queryFactory.getInstance();
    }

    postGolden(dataModelName: string, mdmGoldenFieldAndValues: object) {
        return new Observable(observer => {
            this.getTemplates().subscribe(templatesByName => {
                this.http
                    .post(`/api/v1/entities/templates/${templatesByName[dataModelName].mdmId}/goldenRecords`, mdmGoldenFieldAndValues)
                    .subscribe(response => {
                        observer.next(response);
                        observer.complete();
                    });
            });
        });
    }

    updateGolden(dataModelName: string, mdmId: string, mdmGoldenFieldAndValues: any) {
        return new Observable(observer => {
            this.getTemplates().subscribe(templatesByName => {
                this.http
                    .post(`/api/v1/entities/templates/${templatesByName[dataModelName].mdmId}/goldenRecords/${mdmId}/edit`, mdmGoldenFieldAndValues)
                    .subscribe(response => {
                        observer.next(response);
                        observer.complete();
                    });
            });
        });
    }


    deleteGolden(dataModelName: string, mdmId: string) {
        return new Observable(observer => {
            this.getTemplates().subscribe(templatesByName => {
                this.http
                    .delete(`/api/v1/entities/templates/${templatesByName[dataModelName].mdmId}/goldenRecords/${mdmId}`)
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