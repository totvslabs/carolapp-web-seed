import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { I18nService } from './../../services/i18n.service';
import { AuthService } from '../../services/auth.service';
import { ToolbarSearchService } from '../../services/carol-querys/toolbar-search.service';

import 'rxjs/add/operator/debounceTime';
import * as jp from 'jsonpath/jsonpath';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  showUserDropdown = false;
  showLanguageDropdown = false;
  showSearchBox = false;

  language;
  searchInput = '';
  face = 'face.png';
  user;

  items: any = [];
  searchingItems = false;

  literals;

  @ViewChild('inputElement', {read: ElementRef}) inputElement: ElementRef;

  constructor(private i18n: I18nService,
              private toolbarService: ToolbarSearchService,
              private authService: AuthService,
              private renderer: Renderer2,
              private router: Router) {

    renderer.listen('document', 'click', (event: MouseEvent) => {
      this.wasClickedOutOfSearchBox(event);
    });
  }

  ngOnInit() {

    this.literals = this.i18n.getLiterals();

    this.language = this.i18n.getLanguage();
    const email = localStorage.getItem('user');
    this.user = email.substring(0, email.indexOf('@'));
  }

  changeLanguage(language) {
    this.language = language;
    this.i18n.setLanguage(language);
  }

  logout() {
    this.authService.logout();
  }

  changeSearch(value) {
    this.showSearchBox = true;
    this.searchingItems = true;
    this.items = [];

    if (value.length) {
      this.toolbarService.getList(value)
        .subscribe(result => {
          setTimeout(() => {
            this.items = result;
            this.searchingItems = false;
          }, 2000);
       });
    } else {
      this.searchingItems = false;
    }
  }

  wasClickedOutOfSearchBox(event) {
    if (!this.inputElement.nativeElement.contains(event.target)) {
      this.showSearchBox = false;
    }
  }

}
