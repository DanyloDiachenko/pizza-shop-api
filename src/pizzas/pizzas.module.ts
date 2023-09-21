import { Module } from "@nestjs/common";
import { TypegooseModule } from "nestjs-typegoose";
import { PizzaModel } from "./pizza.model";
import { PizzasController } from "./pizzas.controller";
import { PizzasService } from "./pizzas.service";

@Module({
    controllers: [PizzasController],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: PizzaModel,
                schemaOptions: {
                    collection: "Pizzas",
                },
            },
        ]),
    ],
    providers: [PizzasService],
})
export class PizzasModule {}
