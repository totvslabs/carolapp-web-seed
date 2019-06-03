
export class Products {

  static dataModelName = 'product';

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
    categoryid: string;
    departmentid: string;
    sectionid: string;
    groupid: string;
    subgroupid: string;
    ean: string;
    productname: string;
    parentproductid: string;
    suppliercode: string;
    productid: string;
  };
}

