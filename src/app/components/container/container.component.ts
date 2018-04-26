import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  @Input() filtersTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
