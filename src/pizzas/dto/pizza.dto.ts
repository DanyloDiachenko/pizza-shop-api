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
import { ApiProperty, ApiTags } from "@nestjs/swagger";

class Size {
    @ApiProperty()
    @IsNumber()
    thin: number;

    @ApiProperty()
    @IsNumber()
    standard: number;
}

@ApiTags("Pizzas")
export class PizzaDto {
    @IsString({ message: PIZZA_FIELDS_ERROR("image", "string") })
    @ApiProperty({ description: "URL of the pizza image" })
    image: string;

    @IsString()
    @ApiProperty({ description: "Title of the pizza" })
    title: string;

    @IsNumber()
    @Min(1, { message: "Field `rating` can not be less than 1." })
    @Max(5, { message: "Field `rating` can not be bigger than 5." })
    @ApiProperty({ description: "Rating of the pizza (between 1 and 5)" })
    rating: number;

    @IsArray({ message: PIZZA_FIELDS_ERROR("tags", "array") })
    @IsString({ each: true })
    @ApiProperty({ type: [String], description: "Array of pizza tags" })
    tags: PizzaTag[];

    @IsNotEmpty({ message: PIZZA_FIELDS_ERROR("size26", "object") })
    @ValidateNested()
    @Type(() => Size)
    @ApiProperty({ type: Size, description: "Pizza size for 26 cm" })
    size26: {
        thin: number;
        standard: number;
    };

    @IsNotEmpty({ message: PIZZA_FIELDS_ERROR("size30", "object") })
    @ValidateNested()
    @Type(() => Size)
    @ApiProperty({ type: Size, description: "Pizza size for 30 cm" })
    size30: {
        thin: number;
        standard: number;
    };

    @IsNotEmpty({ message: PIZZA_FIELDS_ERROR("size40", "object") })
    @ValidateNested()
    @Type(() => Size)
    @ApiProperty({ type: Size, description: "Pizza size for 40 cm" })
    size40: {
        thin: number;
        standard: number;
    };
}
