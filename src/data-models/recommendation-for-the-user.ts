
export class RecommendationfortheUser {

  static dataModelName = 'recommendationuser';

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
    categoryid: string;
    score: number;
    departmentid: string;
    sectionid: string;
    groupid: string;
    subgroupid: string;
    productid: string;
    suppliercode: string;
    model_exec_date: Date;
    mdmproductname: string;
    mdmname: string;
  };
}

