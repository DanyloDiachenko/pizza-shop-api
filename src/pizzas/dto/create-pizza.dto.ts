import { IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class Size {
    @IsNumber()
    thin: number;

    @IsNumber()
    standard: number;
}

export class CreatePizzaDto {
    @IsString()
    image: string;

    @IsString()
    title: string;

    @IsNumber()
    rating: number;

    @ValidateNested()
    @Type(() => Size)
    size26: Size;

    @ValidateNested()
    @Type(() => Size)
    size30: Size;

    @ValidateNested()
    @Type(() => Size)
    size40: Size;
}
