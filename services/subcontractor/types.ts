export type SubContractor = {
  subcontractorId: string;
  email: string;
  fullname: string;
  referalCode: string;
  active: boolean;
  noOfUsers: number;
  noOfSubscriptions: number;
  createdAt: string;
};
export type RequesSubContractor = {
  subcontractorId: string;
  firstname: string;
  lastname: string;
  noOfUsers: number;
  noOfSubscription: number;
  referalCode: string;
  active: boolean;
  createdAt: string;
  email: string;
};

export type SubContractorByIdRes = {
  subcontractor: MainSubContractorType;
  noOfUsers: number;
  noOfSubscriptions: number;
};

export type MainSubContractorType = {
  subcontractorId: string;
  firstname: string;
  lastname: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  governmentId: string;
  socialSecurity: string;
  w_9: string;
  fullLegalName: string;
  referalCode: string;
  createdAt: string;
  active: boolean;
  status: string;
};

export type SubContractorCustomer = {
  fullName: string;
  email: string;
  userId: string;
  subscribedPlan: string;
};

export type PaginatedDataInSubContractor<T> = {
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  //   totalPages: number;
  subcontractors: T[];
};

export type PaginatedDataInSubContractorCustomer<T> = {
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
  subcontractor: {
    subcontractorId: string;
    firstname: string;
    lastname: string;
  };
  users: T[];
};

export type UserInSubContractor = {
  plan: string;
  email: string;
  userType: string;
  userId: string;
};
