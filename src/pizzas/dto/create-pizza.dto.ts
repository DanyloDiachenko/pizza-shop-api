import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
    ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { PizzaTag } from "../pizza.model";
import { PIZZA_FIELDS_ERROR } from "../pizzas.constants";

class Size {
    @IsNumber()
    thin: number;

    @IsNumber()
    standard: number;
}

export class CreatePizzaDto {
    @IsString({ message: PIZZA_FIELDS_ERROR("image", "string") })
    image: string;

    @IsString()
    title: string;

    @IsNumber()
    @Min(1, { message: "Field `rating` can not be less than 1." })
    @Max(5, { message: "Field `rating` can not be bigger than 5." })
    rating: number;

    @IsArray({ message: PIZZA_FIELDS_ERROR("tags", "array") })
    @IsString({ each: true })
    tags: PizzaTag[];

    @IsNotEmpty({ message: PIZZA_FIELDS_ERROR("size26", "object") })
    @ValidateNested()
    @Type(() => Size)
    size26: {
        thin: number;
        standard: number;
    };

    @IsNotEmpty({ message: PIZZA_FIELDS_ERROR("size30", "object") })
    @ValidateNested()
    @Type(() => Size)
    size30: {
        thin: number;
        standard: number;
    };

    @IsNotEmpty({ message: PIZZA_FIELDS_ERROR("size40", "object") })
    @ValidateNested()
    @Type(() => Size)
    size40: {
        thin: number;
        standard: number;
    };
}
