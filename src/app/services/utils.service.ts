import { Injectable, isDevMode } from '@angular/core';
import * as configs from '../../../proxy.conf.json';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private objConnectors: any;

  getConnectorIdDefault(): string {
      return configs['connectorId'];
  }

  getApplicationId(): string {
      return this.getConnectors().applicationId;
  }

  getConnectorId(): string {
      return this.getConnectors().applicationIdInputConnector;
  }

  getAppIdInputConnStudentRetention(): string {
      return this.getConnectors().applicationIdInputConnStudentRetention;
  }

  getSubdomain(): string {
      if (isDevMode()) {
          return configs['subdomain'];
      } else {
          return window.location.host.split('.')[0];
      }
  }

  private getConnectors() {
      if (!this.objConnectors) {
          this.objConnectors = JSON.parse(localStorage.getItem('Connectors'));
      }

      return this.objConnectors;
  }

  capitalize(s) {
    if (typeof s !== 'string') {
      return '';
    }

    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  formatCpf(v) {
    v = v.replace( /\D/g , '');
    v = v.replace( /(\d{3})(\d)/ , '$1.$2');
    v = v.replace( /(\d{3})(\d)/ , '$1.$2');

    v = v.replace( /(\d{3})(\d{1,2})$/ , '$1-$2');
    return v;
  }

  formatCnpj(v) {
    v = v.replace( /\D/g , '');
    v = v.replace( /^(\d{2})(\d)/ , '$1.$2');
    v = v.replace( /^(\d{2})\.(\d{3})(\d)/ , '$1.$2.$3');
    v = v.replace( /\.(\d{3})(\d)/ , '.$1/$2');
    v = v.replace( /(\d{4})(\d)/ , '$1-$2');
    return v;
  }

  formatCnpjCpf(v) {
    if (!v) {
      return;
    }

    if (v.length < 12)  {
      return this.formatCpf(v);
    }

    return this.formatCnpj(v);
  }

  formatDate(v) {
    if (!v) {
      return;
    }
    try {
      if (0.1.toLocaleString().substr(1, 1) === '.') {
        return moment(v).format('MM/DD/YYYY');
      } else {
        return moment(v).format('DD/MM/YYYY');
      }
    } catch {}
  }


  formatDateMMYY(v) {
    if (!v) {
      return;
    }
    try {
      return moment(v).format('MM/YY');
    } catch {}
  }

  deepEquals(x, y) {
    if (x === y) {
      return true;
    } else if (!(x instanceof Object) || !(y instanceof Object)) {
      return false;
    } else if (x.constructor !== y.constructor) {
      return false;
    } else {
      for (const p in x) {
        if (!x.hasOwnProperty(p)) {
          continue;
        }
        if (!y.hasOwnProperty(p)) {
          return false;
        }
        if (x[p] === y[p]) {
          continue;
        }
        if (typeof (x[p]) !== 'object') {
          return false;
        }
        if (!this.deepEquals(x[p], y[p])) {
          return false;
        }
      }
      for (const p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
          return false;
        }
      }
      return true;
    }
  }

  copy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }


}
