import { z } from "zod";

const validateMailConfig = z.object({
  displayName: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
  port: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
  host: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
  email: z.string().email({
    message: "Hãy nhập đúng định dạng email",
  }),
  password: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
});

const validateGoogleConfig = z.object({
  clientId: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
  clientSecret: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
});

const validateMomoConfig = z.object({
  partnerCode: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
  returnUrl: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
  ipnUrl: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
  accessKey: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
  secretKey: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
  paymentUrl: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
});

const validateCloudinaryConfig = z.object({
  cloudName: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
  apiKey: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
  apiSecret: z.string().min(1, {
    message: "Không được bỏ trông",
  }),
});

export {
  validateMailConfig,
  validateGoogleConfig,
  validateMomoConfig,
  validateCloudinaryConfig,
};
