
export class InvoiceItems {

  static dataModelName = 'invoiceitems';

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
    branch: string;
    blocked: boolean;
    cashierid: string;
    masterkey: string;
    mdminvoicecode: string;
    mdmcreationdate: Date;
    productid: string;
    ean: string;
    quantity: number;
    totalvalue: number;
    unitprice: number;
    item: any;
  };
}

