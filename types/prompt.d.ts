export type Prompt = {
  id: string;
  type: PromptType;
  context: string;
  updateAt: string;
};

export type PromptType =
  | "ANALYTIC_STATISTIC"
  | "ANALYTIC_REVIEW"
  | "ANALYTIC_REVENUE";
