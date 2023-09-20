import { Controller, Delete, Get, Patch } from "@nestjs/common";

@Controller()
export class PizzasController {
    @Get("")
    async get() {}

    @Get(":id")
    async getById() {}

    @Delete(":id")
    async delete() {}

    @Patch(":id")
    async patch() {}
}
