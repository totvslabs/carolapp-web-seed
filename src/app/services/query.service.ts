import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QueryFactory {

    constructor(
        private http: HttpClient
    ) {}

    getInstance() {
        return new Query(this.http);
    }
}

export class FilterStatement {
    query;
    field;
    filterType;

    constructor(query, field, filterType) {
        this.query = query;
        this.field = field;
        this.filterType = filterType;
    }

    greaterThan(value) {
        const queryObj = {
            mdmFilterType: this.isNested(this.field)? 'NESTED_RANGE_FILTER' : 'RANGE_FILTER',
            mdmKey: this.field,
            mdmValue: [value, null]
        };

        if (this.filterType === 'and') {
            this.query.query.mustList.push(queryObj);
        } else if (this.filterType === 'or') {
            this.query.query.shouldList.push(queryObj);
        }

        return this.query;
    }

    lowerThan(value) {
        const queryObj = {
            mdmFilterType: this.isNested(this.field)? 'NESTED_RANGE_FILTER' : 'RANGE_FILTER',
            mdmKey: this.field,
            mdmValue: [null, value]
        };

        if (this.filterType === 'and') {
            this.query.query.mustList.push(queryObj);
        } else if (this.filterType === 'or') {
            this.query.query.shouldList.push(queryObj);
        }

        return this.query;
    }

    between(min, max) {
        const queryObj = {
            mdmFilterType: this.isNested(this.field)? 'NESTED_RANGE_FILTER' : 'RANGE_FILTER',
            mdmKey: this.field,
            mdmValue: [min, max]
        };

        if (this.filterType === 'and') {
            this.query.query.mustList.push(queryObj);
        } else if (this.filterType === 'or') {
            this.query.query.shouldList.push(queryObj);
        }

        return this.query;
    }

    equals(value) {
        const queryObj = {
            mdmFilterType: this.isNested(this.field)? 'NESTED_TERM_FILTER' : 'TERM_FILTER',
            mdmKey: `${this.field}.raw`,
            mdmValue: value
        };

        if (this.filterType === 'and') {
            this.query.query.mustList.push(queryObj);
        } else if (this.filterType === 'or') {
            this.query.query.shouldList.push(queryObj);
        }

        return this.query;
    }

    like(value) {
        const queryObj = {
            mdmFilterType: this.isNested(this.field)? 'NESTED_TERM_FILTER' : 'TERM_FILTER',
            mdmKey: `${this.field}.folded`,
            mdmValue: value
        };

        if (this.filterType === 'and') {
            this.query.query.mustList.push(queryObj);
        } else if (this.filterType === 'or') {
            this.query.query.shouldList.push(queryObj);
        }

        return this.query;
    }

    notEquals(value) {
        const queryObj = {
            mdmFilterType: this.isNested(this.field)? 'NESTED_TERM_FILTER' : 'TERM_FILTER',
            mdmKey: `${this.field}.raw`,
            mdmValue: value
        };

        if (this.filterType === 'and') {
            this.query.query.mustNotList.push(queryObj);
        } else if (this.filterType === 'or') {
            this.query.query.shouldNotList.push(queryObj);
        }

        return this.query;
    }

    notLike(value) {
        const queryObj = {
            mdmFilterType: this.isNested(this.field)? 'NESTED_TERM_FILTER' : 'TERM_FILTER',
            mdmKey: `${this.field}.folded`,
            mdmValue: value
        };

        if (this.filterType === 'and') {
            this.query.query.mustNotList.push(queryObj);
        } else if (this.filterType === 'or') {
            this.query.query.shouldNotList.push(queryObj);
        }

        return this.query;
    }

    isNested(field) {
        if (field.includes('mdmGoldenFieldAndValues.')) {
            return field.substr(24).indexOf('.') > -1;
        }
    }
}

export class Query {
    private httpClient;
    private fields = null;
    private idx = 'MASTER';
    private size = 20;
    private off = 0;

    private namedQuery: string = null;
    private namedQueryParams: object = null;

    private sort = 'mdmLastUpdated';
    private sortOrder = 'DESC';
    query = {
        mustList: [],
        mustNotList: [],
        shouldList: [],
        shouldNotList: [],
        aggregationList: []
    };

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    named(name: string) {
        this.namedQuery = name;
        return this;
    }

    params(params: object) {
        this.namedQueryParams = params;
        return this;
    }
   
    index(index) {
        this.idx = index;

        return this;
    }
    
    select(fields) {
        if (fields) {
            fields = fields.map(field => {
                return this.appendGolden(field);
            });
        }
        this.fields = fields;

        return this;
    }

    from(dataModelName) {
        this.query.mustList.push({
            mdmFilterType: 'TYPE_FILTER',
            mdmValue: dataModelName
        });

        return this;
    }

    pageSize(size) {
        this.size = size;

        return this;
    }

    offset(off) {
        this.off = off;

        return this;
    }

    groupBy(field) {
        this.aggregate(field, 'TERM');
        return this;
    }

    count(field) {
        this.aggregate(field, 'COUNT');
        return this;
    }

    min(field) {
        this.aggregate(field, 'MINIMUM');
        return this;
    }

    max(field) {
        this.aggregate(field, 'MAXIMUM');
        return this;
    }

    sum(field) {
        this.aggregate(field, 'SUM');
        return this;
    }

    stats(field) {
        this.aggregate(field, 'STATS');
        return this;
    }

    extendedStats(field) {
        this.aggregate(field, 'EXTENDED_STATS');
        return this;
    }

    unique(field) {
        this.aggregate(field, 'CARDINALITY');
        return this;
    }

    private aggregate(field, aggregationType) {
        field = this.appendGolden(field);
        let fieldParts = field.split('.');
        let aggregationRoot = {};
        let aggregation: any = aggregationRoot;
        if (fieldParts.length > 1) {
            for (let i = 1; i < fieldParts.length; i++) {
                let type = 'NESTED';
                if (i === fieldParts.length - 1) {
                    type = aggregationType;
                }
    
                let param = fieldParts.slice(0, i + 1).join('.');
    
                if (aggregationType === 'TERM') {
                    if (i === fieldParts.length - 1) {
                        param += '.raw';
                    }
                }
    
                let name = fieldParts[i];
                if (i === 1) {
                    name = 'goldenValues';
                }
    
                aggregation.type = type;
                aggregation.name = name;
                aggregation.params = [param];
    
                if (i < fieldParts.length - 1) {
                    aggregation.subAggregations = [{}];
                    aggregation = aggregation.subAggregations[0];
                }
            }
        } else {
            aggregationRoot = {
                type: aggregationType,
                name: field,
                params: [field]
            };
        }
        this.query.aggregationList.push(aggregationRoot);

    }

    or(field) {
        field = this.appendGolden(field);
        return new FilterStatement(this, field, 'or');
    }

    and(field) {
        field = this.appendGolden(field);
        return new FilterStatement(this, field, 'and');
    }

    orderBy(field) {
        this.sort = this.appendGolden(field);
        return this;
    }

    ascending() {
        this.sortOrder = 'ASC';
        return this;
    }

    descending() {
        this.sortOrder = 'DESC';
        return this;
    }

    private appendGolden(field) {
        if (field.indexOf('.') === 0) {
            return 'mdmGoldenFieldAndValues' + field;
        }

        return field;
    }

    execute(): Observable<any> {
       
        let queryParams = `?pageSize=${this.size}&offset=${this.off}&index=${this.idx}&sortBy=${this.sort}&sortOrder=${this.sortOrder}`;
        
        if (this.fields) {
            queryParams += `&fields=${this.fields.join(',')}`;
        }

        if (!this.namedQuery) {
            let url = `api/v1/queries/filter${queryParams}`;
    
            if (this.query.mustNotList.length === 0) {
                delete this.query.mustNotList;
            }
    
            if (this.query.shouldList.length === 0) {
                delete this.query.shouldList;
            }
    
            if (this.query.shouldNotList.length === 0) {
                delete this.query.shouldNotList;
            }
    
            if (this.query.aggregationList.length === 0) {
                delete this.query.aggregationList;
            }
    
            return this.httpClient.post(url, this.query);
        } else {
            let url = `api/v2/queries/named/${this.namedQuery}${queryParams}`;
            return this.httpClient.post(url, this.namedQueryParams);
        }
        
    }
}


