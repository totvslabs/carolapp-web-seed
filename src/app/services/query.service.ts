import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { _sanitizeHtml } from '@angular/core/src/sanitization/html_sanitizer';

@Injectable({
  providedIn: 'root'
})
export class QueryFactory {

  constructor(
    private http: HttpClient
  ) {}

  getInstance<T>() {
    return new Query<T>(this.http);
  }
}

export class Join {
  dataModel: string;
  fieldOriginDataModel: string;
  fieldTargetDataModel: string;
  alias: string;

  constructor(dataModel: string, fieldOriginDataModel: string, fieldTargetDataModel: string, alias: string) {
    this.dataModel = dataModel;
    this.fieldOriginDataModel = fieldOriginDataModel;
    this.fieldTargetDataModel = fieldTargetDataModel;
    this.alias = alias;
  }
}

export class FilterStatement {
  query: Query<any>;
  field: string;
  filterType: string;

  constructor(query, field, filterType) {
    this.query = query;
    this.field = field;
    this.filterType = filterType;
  }

  greaterThan(value) {
    const queryObj = {
      mdmFilterType: this.isNested(this.field) ? 'NESTED_RANGE_FILTER' : 'RANGE_FILTER',
      mdmKey: this.field,
      mdmValue: [value, null]
    };

    if (this.filterType === 'and') {
      this.query.raw.mustList.push(queryObj);
    } else if (this.filterType === 'or') {
      this.query.raw.shouldList.push(queryObj);
    }

    return this.query;
  }

  lowerThan(value) {
    const queryObj = {
      mdmFilterType: this.isNested(this.field) ? 'NESTED_RANGE_FILTER' : 'RANGE_FILTER',
      mdmKey: this.field,
      mdmValue: [null, value]
    };

    if (this.filterType === 'and') {
      this.query.raw.mustList.push(queryObj);
    } else if (this.filterType === 'or') {
      this.query.raw.shouldList.push(queryObj);
    }

    return this.query;
  }

  between(min, max) {
    const queryObj = {
      mdmFilterType: this.isNested(this.field) ? 'NESTED_RANGE_FILTER' : 'RANGE_FILTER',
      mdmKey: this.field,
      mdmValue: [min, max]
    };

    if (this.filterType === 'and') {
      this.query.raw.mustList.push(queryObj);
    } else if (this.filterType === 'or') {
      this.query.raw.shouldList.push(queryObj);
    }

    return this.query;
  }

  isTrue() {
    const queryObj = {
      mdmFilterType: this.isNested(this.field) ? 'NESTED_BOOL_FILTER' : 'BOOL_FILTER',
      mdmKey: `${this.field}`,
      mdmValue: true
    };

    if (this.filterType === 'and') {
      this.query.raw.mustList.push(queryObj);
    } else if (this.filterType === 'or') {
      this.query.raw.shouldList.push(queryObj);
    }

    return this.query;
  }

  equals(value) {
    const queryObj = {
      mdmFilterType: this.isNested(this.field) ? 'NESTED_TERM_FILTER' : 'TERM_FILTER',
      mdmKey: `${this.field}.raw`,
      mdmValue: value
    };

    if (this.filterType === 'and') {
      this.query.raw.mustList.push(queryObj);
    } else if (this.filterType === 'or') {
      this.query.raw.shouldList.push(queryObj);
    }

    return this.query;
  }

  like(value) {
    const queryObj = {
      mdmFilterType: this.isNested(this.field) ? 'NESTED_TERM_FILTER' : 'TERM_FILTER',
      mdmKey: `${this.field}.folded`,
      mdmValue: value
    };

    if (this.filterType === 'and') {
      this.query.raw.mustList.push(queryObj);
    } else if (this.filterType === 'or') {
      this.query.raw.shouldList.push(queryObj);
    }

    return this.query;
  }

  notEquals(value) {
    const queryObj = {
      mdmFilterType: this.isNested(this.field) ? 'NESTED_TERM_FILTER' : 'TERM_FILTER',
      mdmKey: `${this.field}.raw`,
      mdmValue: value
    };

    if (this.filterType === 'and') {
      this.query.raw.mustNotList.push(queryObj);
    } else if (this.filterType === 'or') {
      this.query.raw.shouldNotList.push(queryObj);
    }

    return this.query;
  }

  notLike(value) {
    const queryObj = {
      mdmFilterType: this.isNested(this.field) ? 'NESTED_TERM_FILTER' : 'TERM_FILTER',
      mdmKey: `${this.field}.folded`,
      mdmValue: value
    };

    if (this.filterType === 'and') {
      this.query.raw.mustNotList.push(queryObj);
    } else if (this.filterType === 'or') {
      this.query.raw.shouldNotList.push(queryObj);
    }

    return this.query;
  }

  isNested(field) {
    if (field.includes('mdmGoldenFieldAndValues.')) {
      return field.substr(24).indexOf('.') > -1;
    }
  }
}

export class Query<T> {
  private httpClient: HttpClient;
  private fields = null;
  private idx = 'MASTER';
  private size = 20;
  private off = 0;

  private namedQuery: string = null;
  private namedQueryParams: object = null;

  private sort = 'mdmLastUpdated';
  private sortOrder = 'DESC';

  private joins: Join[] = [];

  raw = {
    mustList: [],
    mustNotList: [],
    shouldList: [],
    shouldNotList: [],
    aggregationList: []
  };

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  join(dataModel: string, fieldOriginDataModel: string, fieldTargetDataModel: string, alias: string) {
    this.joins.push(new Join(dataModel, fieldOriginDataModel, fieldTargetDataModel, alias));
    return this;
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

  from(dataModel: string) {
    this.raw.mustList.push({
      mdmFilterType: 'TYPE_FILTER',
      mdmValue: `${dataModel}Golden`
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

  count(field, size: number) {
    this.aggregate(field, 'TERM', size);
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

  private aggregate(field, aggregationType, size = 10) {
    field = this.appendGolden(field);
    const fieldParts = field.split('.');
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
          aggregation.size = size;
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
        params: [field],
        size: size
      };
    }
    this.raw.aggregationList.push(aggregationRoot);

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

  addJoin(joinStatement: Join) {
    this.joins.push(joinStatement);
  }

  execute(): Observable<Response<T>> {

    let queryParams = new HttpParams()
      .set('pageSize', this.size.toString())
      .set('offset', this.off.toString())
      .set('index', this.idx)
      .set('sortBy', this.sort)
      .set('sortOrder', this.sortOrder);

    if (this.fields) {
      queryParams = queryParams.set('fields', this.fields.join(','));
    }

    if (!this.namedQuery) {
      const url = '/api/v1/queries/filter';

      if (this.raw.mustNotList.length === 0) {
        delete this.raw.mustNotList;
      }

      if (this.raw.shouldList.length === 0) {
        delete this.raw.shouldList;
      }

      if (this.raw.shouldNotList.length === 0) {
        delete this.raw.shouldNotList;
      }

      if (this.raw.aggregationList.length === 0) {
        delete this.raw.aggregationList;
      }

      return this.httpClient.post(url, this.raw, { params: queryParams }).pipe(map(
        (response: any) => {
          const resDto = new Response<T>();
          resDto.count = response.count;
          resDto.hits = response.hits;
          resDto.took = response.took;
          resDto.totalHits = response.totalHits;

          /*
          this.joins.forEach((join) => {
            response.hits.forEach(hit => {
              hit[join.alias] = new Query(this.httpClient)
                  .from(join.dataModel)
                  .and(this.appendGolden(join.fieldTargetDataModel))
                  .equals(this.deepFind(hit, this.appendGolden(join.fieldOriginDataModel)))
                  .pageSize(1)
                  .execute()
                  .pipe(map(res => res.hits.length ? res.hits[0] : null));
            });
          });
          */

          return response;
        }
      ));

    } else {
      const url = `/api/v2/queries/named/${this.namedQuery}`;
      return <Observable<Response<any>>> this.httpClient.post(url, this.namedQueryParams, { params: queryParams });
    }

  }

  private deepFind(obj, path) {
    const paths = path.split('.');
    let current = obj;
    let i;

    for (i = 0; i < paths.length; ++i) {
      if (current[paths[i]] === undefined) {
        return undefined;
      } else {
        current = current[paths[i]];
      }
    }
    return current;
  }
}

export class Response<T> {
  hits: Array<T>;
  aggs: any;
  count: number;
  totalHits: number;
  took: number;
}
