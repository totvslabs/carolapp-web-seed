
export class Customer {

  static dataModelName = 'customer';

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
    gender: string;
    clientid: string;
    maritalstatus: string;
    mdmname: string;
    mdmentitytype: string;
    mdmbirthday: Date;
  };
}

