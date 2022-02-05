import { Component, OnInit } from '@angular/core';
import { CarolStagingTablesService } from '@totvslabs/carol-app-fe-sdk';

@Component({
  selector: 'app-connectors',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.scss']
})

export class ConnectorsComponent implements OnInit {
  constructor(private stService: CarolStagingTablesService) { }

  loadingConnectors: boolean = true;
  connectors: any;
    
  async ngOnInit(
    
  ) {
    this.connectors = await this.stService.getConnectors();
    this.loadingConnectors = false;
  }  
}
