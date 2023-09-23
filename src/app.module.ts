import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";
import { AuthModule } from "./auth/auth.module";
import { getMongoConfig } from "./configs/mongo.config";
import { PizzasModule } from "./pizzas/pizzas.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        PizzasModule,
        AuthModule
    ],
})
export class AppModule {}
