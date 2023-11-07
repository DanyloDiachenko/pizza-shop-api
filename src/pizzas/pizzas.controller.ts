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
    ApiHeader,
    ApiProperty,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { BAD_REQUEST_ERROR_RESPONSE } from "../../constants/bad-request.constant";
import { PIZZA_NOT_FOUND_ERROR_RESPONSE } from "../../constants/not-found.contant";
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
        description: "Success in getting pizzas",
        type: [PizzaDto],
    })
    @ApiResponse(BAD_REQUEST_ERROR_RESPONSE)
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
    @ApiResponse({
        status: 200,
        description: "Success in getting pizza by id",
        type: PizzaDto,
    })
    @ApiResponse(BAD_REQUEST_ERROR_RESPONSE)
    @ApiResponse(PIZZA_NOT_FOUND_ERROR_RESPONSE)
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
    @ApiResponse(BAD_REQUEST_ERROR_RESPONSE)
    @ApiResponse(PIZZA_NOT_FOUND_ERROR_RESPONSE)
    @ApiResponse({
        status: 200,
        description: "Pizza with provided id was created successfuly",
        type: PizzaDto,
    })
    async create(@Body() dto: PizzaDto) {
        const createdPizza = await this.pizzasService.create(dto);

        return {
            success: true,
            data: createdPizza,
        };
    }

    @Delete(":id")
    @ApiResponse({
        status: 200,
        description: "Pizza with provided `id` was deleted",
        schema: {
            example: { success: true },
        },
    })
    @ApiResponse(PIZZA_NOT_FOUND_ERROR_RESPONSE)
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
    @ApiResponse(PIZZA_NOT_FOUND_ERROR_RESPONSE)
    @ApiResponse(BAD_REQUEST_ERROR_RESPONSE)
    @ApiResponse({
        status: 200,
        description: "Pizza with provided id was updated successfuly",
        schema: {
            example: PizzaDto,
        },
    })
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
