import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
} from "@nestjs/common";
import { ObjectIdValidationPipe } from "src/pipes/objectIdValidation.pipe";
import { CreatePizzaDto } from "./dto/create-pizza.dto";
import { PizzaTag, PizzaTagType } from "./pizza.model";
import {
    PAGE_NUMBER_LIMIT_ERROR,
    PIZZA_NOT_FOUND_ERROR,
    TAG_VALIDATION_ERROR,
} from "./pizzas.constants";
import { PizzasService } from "./pizzas.service";

@Controller("pizzas")
export class PizzasController {
    constructor(private readonly pizzasService: PizzasService) {}

    @Get()
    async get(
        @Query("tag") tag: PizzaTag,
        @Query("pageNumber") pageNumber: number,
    ) {
        const validPizzaTags: Record<PizzaTagType, boolean> = {
            all: true,
            meat: true,
            vegetarian: true,
            grill: true,
            spicy: true,
            calzone: true,
        };

        if (!validPizzaTags[tag]) {
            throw new BadRequestException(TAG_VALIDATION_ERROR);
        }

        if (!pageNumber || pageNumber < 1 || pageNumber > 3) {
            throw new BadRequestException(PAGE_NUMBER_LIMIT_ERROR);
        }

        const pizzas = await this.pizzasService.get(tag, pageNumber);
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

    @Post("create")
    async create(@Body() dto: CreatePizzaDto) {
        /* create validation for fields like tags, title, img etc */

        const createdPizza = await this.pizzasService.create(dto);

        return {
            success: true,
            data: createdPizza,
        };
    }

    @Delete(":id")
    async delete(@Param() id: string) {
        const deletedPizza = await this.pizzasService.deleteById(id);

        if (!deletedPizza) {
            throw new NotFoundException(PIZZA_NOT_FOUND_ERROR);
        }
    }

    @Patch(":id")
    async patch(@Param() id: string, dto: CreatePizzaDto) {
        /* create validation for fields like tags, title, img etc */

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
