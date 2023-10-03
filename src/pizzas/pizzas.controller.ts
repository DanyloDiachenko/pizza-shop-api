import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import {
    ApiBody,
    ApiProperty,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { PizzaPageNumberType } from "src/types/pizzaPageNumber.type";
import { PizzaSortByType } from "src/types/pizzaSortBy.type";
import { PizzaTagType } from "src/types/pizzaTag.type";
import { ObjectIdValidationPipe } from "../pipes/objectIdValidation.pipe";
import { PizzaDto } from "./dto/pizza.dto";
import { PizzaModel } from "./pizza.model";
import {
    PAGE_NUMBER_LIMIT_ERROR,
    PAGE_NUMBER_NOT_PROVIDED_ERROR,
    PIZZA_NOT_FOUND_ERROR,
    SORT_BY_NOT_PROVIDED_ERROR,
    SORT_BY_VALIDATION_ERROR,
    TAG_NOT_PROVIDED_ERROR,
    TAG_VALIDATION_ERROR,
} from "./pizzas.constants";
import { PizzasService } from "./pizzas.service";

@Controller("pizzas")
@ApiTags("Pizzas")
export class PizzasController {
    constructor(private readonly pizzasService: PizzasService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description:
            "Get a list of pizzas with optional filters `tag` and `pageNumber`",
        type: [PizzaDto],
    })
    @ApiResponse({
        status: 400,
        description: "Parameters validation errors",
        schema: {
            example: {
                message: "message",
                error: "Bad Request",
                statusCode: 400,
            },
        },
    })
    async get(
        @Query("tag") tag: PizzaTagType,
        @Query("pageNumber") pageNumber: PizzaPageNumberType,
        @Query("sortBy") sortBy: PizzaSortByType,
    ) {
        const validPizzaTags: Record<PizzaTagType, boolean> = {
            all: true,
            meat: true,
            vegetarian: true,
            grill: true,
            spicy: true,
            calzone: true,
        };
        
        const validPizzasSortBy: Record<PizzaSortByType, boolean> = {
            rating: true,
            priceDesc: true,
            priceAsc: true,
            alphabetDesc: true,
            alphabetAsc: true,
        };

        if (!tag) {
            throw new BadRequestException(TAG_NOT_PROVIDED_ERROR);
        }
        if (!validPizzaTags[tag]) {
            throw new BadRequestException(TAG_VALIDATION_ERROR);
        }

        if (!pageNumber) {
            throw new BadRequestException(PAGE_NUMBER_NOT_PROVIDED_ERROR);
        }
        if (!pageNumber || pageNumber < 1 || pageNumber > 3) {
            throw new BadRequestException(PAGE_NUMBER_LIMIT_ERROR);
        }

        if (!sortBy) {
            throw new BadRequestException(SORT_BY_NOT_PROVIDED_ERROR);
        }
        if (!validPizzasSortBy[sortBy]) {
            throw new BadRequestException(SORT_BY_VALIDATION_ERROR);
        }

        const pizzas = await this.pizzasService.get(tag, pageNumber, sortBy);
        return {
            success: true,
            data: pizzas,
        };
    }

    @Get(":id")
    async getById(@Param("id", ObjectIdValidationPipe) id: string) {
        const pizza = await this.pizzasService.findById(id);

        if (!pizza) {
            throw new NotFoundException(PIZZA_NOT_FOUND_ERROR);
        }

        return {
            success: true,
            data: pizza,
        };
    }

    @UsePipes(new ValidationPipe())
    @Post("create")
    async create(@Body() dto: PizzaDto) {
        const createdPizza = await this.pizzasService.create(dto);

        return {
            success: true,
            data: createdPizza,
        };
    }

    @Delete(":id")
    async delete(@Param("id", ObjectIdValidationPipe) id: string) {
        const deletedPizza = await this.pizzasService.deleteById(id);

        if (!deletedPizza) {
            throw new NotFoundException(PIZZA_NOT_FOUND_ERROR);
        }

        return {
            success: true,
        };
    }

    @Patch(":id")
    async patch(
        @Param("id", ObjectIdValidationPipe) id: string,
        @Body() dto: PizzaDto,
    ) {
        const updatedPizza = await this.pizzasService.updateById(id, dto);

        if (!updatedPizza) {
            throw new NotFoundException(PIZZA_NOT_FOUND_ERROR);
        }

        return {
            success: true,
            data: updatedPizza,
        };
    }
}
