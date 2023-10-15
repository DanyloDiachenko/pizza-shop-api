import { ApiResponseOptions } from "@nestjs/swagger";

export const BAD_REQUEST_ERROR: ApiResponseOptions = {
    status: 400,
    description: "Bad request",
    schema: {
        example: {
            message: "message",
            error: "Bad Request",
            statusCode: 400,
        },
    },
};
