"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const httpsOptions = process.env.NODE_ENV === "production" ? {
    key: fs.readFileSync('/etc/letsencrypt/live/server.wault.app/privkey.pem', 'utf8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/server.wault.app/cert.pem', 'utf8'),
    ca: fs.readFileSync('/etc/letsencrypt/live/server.wault.app/chain.pem', 'utf8'),
} : undefined;
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        httpsOptions,
    });
    app.enableCors({
        origin: "https://wault.app",
        optionsSuccessStatus: 200,
    });
    app.use(cookieParser());
    app.use(helmet());
    await app.listen(process.env.PORT || 3000);
};
bootstrap();
//# sourceMappingURL=main.js.map