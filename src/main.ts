import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: ["http://localhost:3000", "https://pizza-shop-api-jade.vercel.app/"],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    app.setGlobalPrefix('api');

    const options = new DocumentBuilder()
        .setTitle('Your title')
        .setDescription('Your description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document, {
        customCssUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
        ],
    });

    await app.listen(3000);
}

bootstrap();
