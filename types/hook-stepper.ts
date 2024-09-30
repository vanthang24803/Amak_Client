export type StepperFormValues = {
  name?: string;
  brand?: string;
  introduction?: string;
  specifications?: string;
  thumbnail?: File;
  categories: string[];
  options: Array<{
    name: string;
    sale: number;
    quantity: number;
    price: number;
  }>;
};
