import { Injectable } from "@nestjs/common";
import { CreatePizzaDto } from "./dto/create-pizza.dto";

@Injectable()
export class PizzasService {
    async get() {}

    async create(dto: CreatePizzaDto) {}

    async findById(id: string) {}

    async deleteById(id: string) {}

    async updateById(id: string) {}
}
