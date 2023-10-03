import { Injectable } from "@nestjs/common";
import { PizzaDto } from "./dto/pizza.dto";
import { PizzaModel } from "./pizza.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";
import { PizzaTagType } from "src/types/pizzaTag.type";
import { PizzaPageNumberType } from "src/types/pizzaPageNumber.type";
import { PizzaSortByType } from "src/types/pizzaSortBy.type";

@Injectable()
export class PizzasService {
    constructor(
        @InjectModel(PizzaModel)
        private readonly pizzaModel: ModelType<PizzaModel>,
    ) {}

    async get(
        tag: PizzaTagType,
        pageNumber: PizzaPageNumberType,
        sortBy: PizzaSortByType,
    ): Promise<PizzaModel[]> {
        const pageSize = 4;
        const skip = (pageNumber - 1) * pageSize;

        let query = {};

        if (tag !== "all") {
            query = { tags: tag };
        }

        let sortOptions = {};

        switch (sortBy) {
            case "rating":
                sortOptions = { rating: -1 };
                break;
            case "priceDesc":
                sortOptions = { price: -1 };
                break;
            case "priceAsc":
                sortOptions = { price: 1 };
                break;
            case "alphabetDesc":
                sortOptions = { name: -1 };
                break;
            case "alphabetAsc":
                sortOptions = { name: 1 };
                break;
            default:
                break;
        }

        const result = await this.pizzaModel
            .find(query)
            .skip(skip)
            .limit(pageSize)
            .sort(sortOptions)
            .exec();

        return result;
    }

    async create(dto: PizzaDto): Promise<PizzaModel> {
        return this.pizzaModel.create(dto);
    }

    async findById(id: string): Promise<PizzaModel | null> {
        return this.pizzaModel.findById(id).exec();
    }

    async deleteById(id: string): Promise<PizzaModel | null> {
        return this.pizzaModel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: PizzaDto): Promise<PizzaModel | null> {
        return this.pizzaModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
}
