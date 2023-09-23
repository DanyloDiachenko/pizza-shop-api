import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export const getJWTConfig = async (
    ConfigService: ConfigService,
): Promise<JwtModuleOptions> => {
    return {
        secret: ConfigService.get("JWT_SECRET"),
    };
};
