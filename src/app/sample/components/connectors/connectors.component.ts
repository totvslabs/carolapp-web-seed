import { Component, OnInit } from '@angular/core';
import { PoTreeViewItem } from '@po-ui/ng-components';
import { CarolStagingTablesService, Connector, Connectors, StagingTable, StagingTableProperty, StagingTables } from '@totvslabs/carol-app-fe-sdk';

@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.scss']
})

export class ConnectorsComponent implements OnInit {
  constructor(private stService: CarolStagingTablesService) { }

  loadingConnectors: boolean = true;
  connectors: ConnectorRender[] = [];
    
  async ngOnInit() {
    const [
      connectors,
      stagingTables 
    ] = await Promise.all([
      this.stService.getConnectors(),
      this.stService.getStagingTables()
    ])
    
    this.connectors = this.prepareConnectors(connectors, stagingTables)
    this.loadingConnectors = false;
  }  

  private prepareConnectors(connectors: Connectors, stagings: StagingTables): ConnectorRender[] {
    return Object.entries(connectors)
      .map(([connectorId, connector]: [string, Connector]) => {
        const connectorStagings: Array<StagingTable> = stagings[connectorId];
        const stagingTables: Array<StagingTableRender> = connectorStagings.map((staging) => ({
            label: `${staging.name} (${staging.id})`,
            ready: staging.ready ? 'Ready' : 'Not Ready',
            properties: staging.properties?.map((p) => this.prepareTreeView(p))
        }))

        return {
          label: `${connector.name} (${connectorId})`,
          stagingTables
        }
      });
  }

  private prepareTreeView(stagingProperties: StagingTableProperty): PoTreeViewItem {
    const treeView = {
      label: `${stagingProperties.name} - ${stagingProperties.type}`,
      value: `${stagingProperties.name}__${stagingProperties.type}`,
      expanded: true
    } as PoTreeViewItem;

    if (stagingProperties.properties) {
      treeView.subItems = stagingProperties.properties.map(p => this.prepareTreeView(p));
    }

    return treeView;
  }
}

interface ConnectorRender {
  label: string;
  stagingTables: Array<StagingTableRender>,
}

interface StagingTableRender {
  label: string;
  ready: string;
  properties: Array<PoTreeViewItem>
}
