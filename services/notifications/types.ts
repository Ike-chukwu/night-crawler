export type Activity = {
  id: string;
  subject: string;
  message: string;
  noOfFailed: number;
  createdAt: string;
  noOfRecipient: number;
};

export type ActivityById = {
  id: string;
  failedAttempts: string[];
  recipients: Recipient[];
};

export type Recipient = {
  name: string;
  email: string;
  status: string;
  phone: string;
  _id: string;
};

export type UsersNotif = {
  email: string;
  name: string;
  phone: string;
  userId: string;
  plan: string;
};
