import { ApiResponseOptions } from "@nestjs/swagger";
import { PIZZA_NOT_FOUND_ERROR } from "src/pizzas/pizzas.constants";

export const PIZZA_NOT_FOUND_ERROR_RESPONSE: ApiResponseOptions = {
    status: 404,
    description: PIZZA_NOT_FOUND_ERROR,
    schema: {
        example: {
            message: PIZZA_NOT_FOUND_ERROR,
            error: "Bad Request",
            statusCode: 404,
        },
    },
};
