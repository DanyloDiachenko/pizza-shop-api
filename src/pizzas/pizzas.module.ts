import { Module } from "@nestjs/common";
import { PizzasController } from "./pizzas.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { PizzaModel } from "./pizza.model";
import { PizzasService } from "./pizzas.service";

@Module({
    controllers: [PizzasController],
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: PizzaModel,
                schemaOptions: {
                    collection: 'Pizzas'
                },
            },
        ]),
    ],
    providers: [PizzasService]
})
export class PizzasModule {}
