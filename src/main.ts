import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import { json as bodyParser } from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const httpsOptions = process.env.NODE_ENV === "production" ? {
    key: fs.readFileSync('/etc/letsencrypt/live/server.wault.app/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/server.wault.app/cert.pem', 'utf8'),
    ca: fs.readFileSync('/etc/letsencrypt/live/server.wault.app/chain.pem', 'utf8'),
} : undefined;

const bootstrap = async () => {
    // create a new nest instance
    const app = await NestFactory.create(AppModule, {
        httpsOptions,
    });

    // setup swagger module
    const config = new DocumentBuilder()
        .setTitle('Wault API documentation')
        .setDescription('This is the official API documentation of Wault.')
        .setVersion('1.0')
        .addBearerAuth()
        .setContact("Gál Péter (pepyta)", "https://github.com/pepyta", "pepyta118@gmail.com")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // enable cors requests from wault.app
    app.enableCors({
        origin: "https://wault.app",
        optionsSuccessStatus: 200,
        credentials: true,
    });

    // use cookie parser to be able to recieve session token
    app.use(cookieParser());

    // use body parser to be able to recieve data from the client
    app.use(bodyParser());

    // use helmet for more security
    app.use(helmet());

    // start the server on specified port
    await app.listen(process.env.PORT || 3000);
};

bootstrap();
