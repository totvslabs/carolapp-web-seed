
export class InvoiceHeader {

  static dataModelName = 'invoiceheader';

  mdmId: string;
  mdmUpdatedUser: string;
  mdmEntityType: string;
  mdmCreatedUser: string;
  mdmLastUpdated: Date;
  mdmCreated: string;
  mdmCrosswalk: {
    mdmApplicationId: string;
    mdmStagingType: string;
    mdmConnectorId: string;
    mdmCrossreference: any;
  };
  mdmGoldenFieldAndValues: {
    mdmtaxid: string;
    branch: string;
    blocked: boolean;
    mdminvoicetype: string;
    cashierid: string;
    mdminvoiceamount: number;
    masterkey: string;
    mdminvoicecode: string;
    mdmcreationdate: Date;
  };
}

