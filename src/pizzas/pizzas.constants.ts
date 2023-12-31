export const PAGE_NUMBER_LIMIT_ERROR =
    "Invalid `page`. It must be between 0(no includes) and 4(no includes).";
export const PAGE_NUMBER_NOT_PROVIDED_ERROR =
    "Query parametr `page` wasn`t provided.";

export const TAG_NOT_PROVIDED_ERROR = "Query parametr `tag` wasn`t provided.";
export const TAG_VALIDATION_ERROR =
    "Invalid `tag`. It can be `all` or `meat` or `vegetarian` or `grill` or `spicy` or `calzone`.";

export const PIZZA_NOT_FOUND_ERROR = "Pizza with provided `id` wasn`t found.";

export const SORT_BY_NOT_PROVIDED_ERROR = "Query parametr `sortBy` wasn`t provided.";
export const SORT_BY_VALIDATION_ERROR =
    "Invalid `sortBy`. It can be `rating` or `priceDesc` or `priceAsc` or `alphabetDesc` or `alphabetAsc`.";

export const PIZZA_FIELDS_ERROR = (
    field:
        | "image"
        | "title"
        | "rating"
        | "tags"
        | "size26"
        | "size30"
        | "size40",
    type: "string" | "object" | "array",
): string => {
    return `Field '${field}' must be ${type}.`;
};
