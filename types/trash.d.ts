type ProductTrash = {
  id: string;
  name: string;
  thumbnail: string;
  brand: string;
  options: number;
  sold: number;
  deletedAt: string;
};

type OptionTrash = {
  id: string;
  name: string;
  sale: number;
  price: number;
  quantity: number;
  deletedAt: string;
};

export { ProductTrash, OptionTrash };
