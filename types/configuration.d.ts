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

export type GeminiConfig = {
  apiKey: string;
  projectNumber: string;
  model: GeminiModel;
};

type GeminiModel =
  | "gemini-1.5-pro"
  | "gemini-1.5-flash-latest"
  | "gemini-1.5-flash"
  | "gemini-1.5-flash-002"
  | "gemini-1.5-flash-8b";
