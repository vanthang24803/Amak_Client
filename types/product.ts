import { Base } from './base';
import { Category } from './category';
import { Option } from './options';
import { Photo } from './photo';
import { Review } from './review';

export type Product = Base & {
  name: string;
  brand: string;
  thumbnail: string;
  sold: number;
  categories: Category[];
  options: Option[];
  photos: Photo[];
};

export type ProductDetail = Product & {
  introduction?: string;
  specifications?: string;
  reviews: Review[];
  updateAt: string;
};
