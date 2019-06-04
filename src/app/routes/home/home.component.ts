import { Component, OnInit } from '@angular/core';
import { Carol } from 'src/app/services/carol.service';
import { ThfTableColumn } from '@totvs/thf-ui';

import { ThfBarChartSeries, ThfPieChartSeries } from '@totvs/thf-kendo/components/thf-chart';
import { RecommendationfortheUser } from 'src/data-models/recommendation-for-the-user';
import { Customer } from 'src/data-models/customer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  pageTitle = 'Carol - Products Recommendation';
  mostInvoices: Array<ThfBarChartSeries>;
  mostRecommended: Array<ThfPieChartSeries>;
  recommendationsByCustomer: Array<any>;
  cpf: string;

  tableColumns: Array<ThfTableColumn> = [
    {
      property: 'cpf',
      label: 'CPF'
    },
    {
      property: 'mdmname',
      label: 'Name'
    },
    {
      property: 'productName',
      label: 'Product Name'
    },
    {
      property: 'score',
      label: 'Score'
    }
  ];


  constructor(
    private carol: Carol
  ) {}

  ngOnInit() {
    this.showMostRecommended();
    this.showMostInvoices();
    this.showRecomendationsByClient();
  }

  showMostInvoices() {
    this.carol.query().from('invoiceheader')
      .count('.mdmtaxid', 10)
      .pageSize(0)
      .execute()
      .subscribe(response => {
        const buckets = response.aggs.goldenValues.buckets;

        this.mostInvoices = Object.keys(buckets).map(cpf => {
          const barChartSeries: ThfBarChartSeries = {};
          barChartSeries.name = cpf;
          barChartSeries.data = [buckets[cpf].docCount]
          return barChartSeries;
        });

      });
  }

  showMostRecommended() {
    this.carol.query()
      .from('recommendationuser')
      .count('.mdmproductname', 5)
      .pageSize(0)
      .execute()
      .subscribe(response => {
        const buckets = response.aggs.goldenValues.buckets;

        const series: ThfPieChartSeries = {};

        series.data = Object.keys(buckets).map(key => {
          return {
            category: buckets[key].key,
            value: buckets[key].docCount
          };
        });

        this.mostRecommended = [series];
      });
  }

  showRecomendationsByClient(taxId?: string) {
    const query = this.carol
      .query<RecommendationfortheUser>()
      .from(RecommendationfortheUser.dataModelName)
      .pageSize(20)
      .orderBy('.score')
      .descending();

    if (taxId) {
      query.and('.mdmtaxid').equals(taxId);
    }

    query.execute()
      .subscribe(response => {
        this.recommendationsByCustomer = response.hits.map(hit => {
          return {
            productName: hit.mdmGoldenFieldAndValues.mdmproductname,
            score: `${(hit.mdmGoldenFieldAndValues.score * 100).toFixed(2)}%`,
            cpf: hit.mdmGoldenFieldAndValues.mdmtaxid
          };
        });
      });
  }
}

