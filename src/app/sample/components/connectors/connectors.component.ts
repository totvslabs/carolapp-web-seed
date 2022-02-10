import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalComponent, PoTreeViewItem } from '@po-ui/ng-components';
import {
  CarolSqlQueryService,
  CarolStagingTablesService,
  Connector,
  Connectors,
  StagingTable,
  StagingTableProperty,
  StagingTables,
} from '@totvslabs/carol-app-fe-sdk';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.scss'],
})
export class ConnectorsComponent implements OnInit {
  @ViewChild('recordsModal', { static: true }) recordsModalElement:
    | PoModalComponent
    | undefined;

  constructor(
    private stService: CarolStagingTablesService,
    private sqlService: CarolSqlQueryService
  ) {}

  loadingConnectors: boolean = true;
  connectors: ConnectorRender[] = [];

  titleRecordsModal: string = '';

  currentResults: Array<any> = [];
  loadingRecords: boolean = false;

  async ngOnInit() {
    const [connectors, stagingTables] = await Promise.all([
      this.stService.getConnectors(),
      this.stService.getStagingTables(),
    ]);

    this.connectors = this.prepareConnectors(connectors, stagingTables);
    this.loadingConnectors = false;
  }

  async runQuery(connector: ConnectorRender, staging: StagingTableRender) {
    this.currentResults = [];
    this.loadingRecords = true;
    this.recordsModalElement?.open();
    this.titleRecordsModal = `${connector.name} - ${staging.name}`;
    const response = await firstValueFrom(
      this.sqlService.runSQL(
        `select * from stg_${connector.name + '_' + staging.name} limit 50`
      )
    );
    this.currentResults = response.rows;
    this.loadingRecords = false;
  }

  private prepareConnectors(
    connectors: Connectors,
    stagings: StagingTables
  ): ConnectorRender[] {
    return Object.entries(connectors).map(
      ([connectorId, connector]: [string, Connector]) => {
        const connectorStagings: Array<StagingTable> = stagings[connectorId];
        const stagingTables: Array<StagingTableRender> = connectorStagings.map(
          (staging) => ({
            label: `${staging.name} (${staging.id})`,
            ready: staging.ready ? 'Ready' : 'Not Ready',
            name: staging.name,
            properties: staging.properties?.map((p) => this.prepareTreeView(p)),
          })
        );

        return {
          label: `${connector.name} (${connectorId})`,
          name: connector.name,
          stagingTables,
        };
      }
    );
  }

  private prepareTreeView(
    stagingProperties: StagingTableProperty
  ): PoTreeViewItem {
    const treeView = {
      label: `${stagingProperties.name} - ${stagingProperties.type}`,
      value: `${stagingProperties.name}__${stagingProperties.type}`,
      expanded: true,
    } as PoTreeViewItem;

    if (stagingProperties.properties) {
      treeView.subItems = stagingProperties.properties.map((p) =>
        this.prepareTreeView(p)
      );
    }

    return treeView;
  }
}

interface ConnectorRender {
  label: string;
  name: string;
  stagingTables: Array<StagingTableRender>;
}

interface StagingTableRender {
  label: string;
  name: string;
  ready: string;
  properties: Array<PoTreeViewItem>;
}
