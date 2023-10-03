import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { PizzaTagType } from "src/types/pizzaTag.type";

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
