import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

const getMongoString = (configService: ConfigService) => {
    return configService.get("MONGO_CONNECTION_STRING");
};

const getMongoOptions = () => {
    return {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
};

export const getMongoConfig = async (
    configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoString(configService),
        ...getMongoOptions(),
    };
};
