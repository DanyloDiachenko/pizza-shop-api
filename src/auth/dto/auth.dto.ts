import { IsEmail, IsString } from "class-validator";
import { AUTH_FIELDS_ERROR } from "../auth.constants";

export class AuthDto {
    @IsString({ message: AUTH_FIELDS_ERROR("login") })
    @IsEmail()
    login: string;

    @IsString({ message: AUTH_FIELDS_ERROR("password") })
    password: string;
}
