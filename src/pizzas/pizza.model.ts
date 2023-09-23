import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

export enum PizzaTag {
    All = "all",
    Meat = "meat",
    Vegetarian = "vegetarian",
    Grill = "grill",
    Spicy = "spicy",
    Calzone = "calzone",
}
export type PizzaTagType =
    | "all"
    | "meat"
    | "vegetarian"
    | "grill"
    | "spicy"
    | "calzone";

export interface PizzaModel extends Base {}
export class PizzaModel extends TimeStamps {
    @prop()
    rating: number;

    @prop()
    image: string;

    @prop()
    title: string;

    @prop({ type: () => [String] })
    tags: PizzaTagType[];

    @prop({ _id: false })
    size26: {
        thin: number;
        standard: number;
    };

    @prop({ _id: false })
    size30: {
        thin: number;
        standard: number;
    };

    @prop({ _id: false })
    size40: {
        thin: number;
        standard: number;
    };
}
