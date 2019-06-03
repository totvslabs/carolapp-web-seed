
export class WhoBoughtThisAlsoBought {

  static dataModelName = 'alsobought';

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
    alsobought: string;
    categoryid: string;
    score: number;
    departmentid: string;
    sectionid: string;
    groupid: string;
    subgroupid: string;
    suppliercode: string;
    alsoboughtdescription: string;
    model_exec_date: Date;
    productid: string;
    productname: string;
  };
}

