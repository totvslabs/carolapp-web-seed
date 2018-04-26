import { Injectable, OnInit } from '@angular/core';

import { EN } from '../i18n/literalsEN';
import { PT } from '../i18n/literalsPT';

@Injectable()
export class I18nService implements OnInit {

  currentLanguage;
  literals;

  constructor() {
    this.currentLanguage = (localStorage.getItem('language')) ?
                            localStorage.getItem('language') :
                            navigator.language.substring(0, 2).toUpperCase();

    this.setLiterals(this.currentLanguage);
  }

  ngOnInit() {
  }

  getLanguage() {
    return this.currentLanguage;
  }

  setLanguage(language: string) {
    this.setLiterals(language);
    localStorage.setItem('language', language);
    location.reload();
  }

  setLiterals(language) {
    this.literals = (language === 'PT') ? PT : EN;
  }

  getLiterals() {
    return this.literals;
  }
}
