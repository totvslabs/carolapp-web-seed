import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalComponent } from '@po-ui/ng-components';
import {
  CarolDatamodelsService,
  CarolSqlQueryService,
  Datamodel,
} from '@totvslabs/carol-app-fe-sdk';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-datamodels',
  templateUrl: './datamodels.component.html',
  styleUrls: ['./datamodels.component.scss'],
})
export class DatamodelsComponent implements OnInit {
  @ViewChild('recordsModal', { static: true }) recordsModalElement:
    | PoModalComponent
    | undefined;

  private readonly pageSize = 100;
  private readonly page = 1;

  constructor(
    private datamodelsService: CarolDatamodelsService,
    private sqlService: CarolSqlQueryService
  ) {}

  datamodels: DatamodelRender[] = [];
  loadingDatamodels: boolean = true;

  titleRecordsModal: string = '';

  currentResults: Array<any> = [];
  loadingRecords: boolean = false;

  async ngOnInit() {
    const dms = Object.values(await this.datamodelsService.getDatamodels());
    this.datamodels = await Promise.all(
      dms.map((dm) => this.prepareDatamodel(dm))
    );
    this.loadingDatamodels = false;
  }

  openModal(e: DatamodelRender) {
    this.currentResults = [];
    this.titleRecordsModal = e.name;
    this.getRecords(e);
    this.recordsModalElement?.open();
  }

  private async getRecords(dm: DatamodelRender) {
    const sql = `select * from ${dm.name}`;

    this.loadingRecords = true;
    const response = await firstValueFrom(
      this.sqlService.runSQL(sql, this.pageSize, this.page)
    );
    this.currentResults = response.rows;
    this.loadingRecords = false;
  }

  private async prepareDatamodel(dm: Datamodel): Promise<DatamodelRender> {
    const tablePreview = await firstValueFrom(
      this.sqlService.tablePreview(dm.name)
    );

    const labels = dm.labels;
    return {
      ...dm,
      label: Object.values(labels)[0],
      totalRecords: tablePreview.totalRows,
    };
  }
}

interface DatamodelRender extends Datamodel {
  label: string;
  totalRecords: number;
}
