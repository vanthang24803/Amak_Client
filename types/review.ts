import { Base } from "./base";
import { Photo } from "./photo";

export type Review = Base & {
    content:string;
    star:string;
    photos: Photo[];
    updateAt:string;
}