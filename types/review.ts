import { Base } from "./base";
import { Pagination } from "./pagination";
import { Photo } from "./photo";

export type ListReview = Pagination<Review[]> & {
  average_star: number;
};

export type Review = Base & {
  content: string;
  star: number;
  photos: Photo[];
  updateAt: string;
  author: Author;
};

type Author = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phoneNumber: string;
};
