import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

class Size {
    [key: string]: {
        thin: number;
        standard: number;
    };
}

export enum PizzaTag {
    All = "all",
    Meat = "meat",
    Vegetarian = "vegetarian",
    Grill = "grill",
    Spicy = "spicy",
    Calzone = "calzone",
}

export interface PizzaModel extends Base {}
export class PizzaModel extends TimeStamps {
    @prop()
    rating: number;

    @prop()
    image: string;

    @prop()
    title: string;

    @prop({ type: () => [PizzaTag] })
    tags: PizzaTag[];

    @prop({ type: () => Size })
    size26: {
        thin: number;
        standard: number;
    };

    @prop({ type: () => Size })
    size30: {
        thin: number;
        standard: number;
    };

    @prop({ type: () => Size })
    size40: {
        thin: number;
        standard: number;
    };
}
