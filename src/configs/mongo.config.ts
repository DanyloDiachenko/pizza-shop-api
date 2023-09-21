import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const getMongoConfig = async (
    configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoString(configService),
        ...getMongoOptions(),
    };
};

const getMongoString = (configService: ConfigService) => {
    return configService.get("MONGO_CONNECTION_STRING");
};

const getMongoOptions = () => ({
    useNewUrlParser: true,
    /* useCreateIndexes: true, */
    useUnifiedTopology: true,
});
