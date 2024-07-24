import { Base } from "./base";

export type Review = Base & {
    content:string;
    star:string;

    updateAt:string;
}