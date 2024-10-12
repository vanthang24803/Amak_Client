export type MailConfig = {
  email: string;
  password: string;
  host: string;
  displayName: string;
  port: number;
};

export type GoogleConfig = {
  clientId: string;
  clientSecret: string;
};

export type CloudinaryConfig = {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
};

export type MomoConfig = {
  partnerCode: string;
  returnUrl: string;
  ipnUrl: string;
  accessKey: string;
  secretKey: string;
  paymentUrl: string;
};
