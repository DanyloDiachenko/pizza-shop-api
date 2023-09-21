import { Injectable } from "@nestjs/common";
import { CreatePizzaDto } from "./dto/create-pizza.dto";
import { PizzaModel, PizzaTag } from "./pizza.model";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { InjectModel } from "nestjs-typegoose";

@Injectable()
export class PizzasService {
    constructor(
        @InjectModel(PizzaModel)
        private readonly pizzaModel: ModelType<PizzaModel>,
    ) {}

    async get(tag: PizzaTag, pageNumber: number): Promise<PizzaModel[]> {
        const pageSize = 4;
        const skip = (pageNumber - 1) * pageSize;

        if (tag === "all") {
            return this.pizzaModel.find().skip(skip).limit(pageSize).exec();
        } else {
            return this.pizzaModel
                .find({ tags: tag })
                .skip(skip)
                .limit(pageSize)
                .exec();
        }
    }

    async create(dto: CreatePizzaDto): Promise<PizzaModel> {
        return this.pizzaModel.create(dto);
    }

    async findById(id: string): Promise<PizzaModel | null> {
        return this.pizzaModel.findById(id).exec();
    }

    async deleteById(id: string): Promise<PizzaModel | null> {
        return this.pizzaModel.findByIdAndDelete(id).exec();
    }

    async updateById(
        id: string,
        dto: CreatePizzaDto,
    ): Promise<PizzaModel | null> {
        return this.pizzaModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
}
