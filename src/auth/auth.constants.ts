export const ALREADY_REGISTERED_ERROR = "This user is already registered.";
export const USER_NOT_FOUND_ERROR = "User with this email have not found.";
export const WRONG_PASSWORD_ERROR = "Incorrect password.";
export const AUTH_FIELDS_ERROR = (
    field: "login" | "password",
): string => {
    return `Field '${field}' must be string.`;
};
