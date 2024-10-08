export type TempleType = "ORDER" | "VERIFY_ACCOUNT" | "FORGOT_PASSWORD";

export type Template = Base & {
  type: TempleType;
  template: string;
};
