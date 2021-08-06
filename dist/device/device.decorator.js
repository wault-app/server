"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const common_1 = require("@nestjs/common");
exports.Device = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.device;
});
//# sourceMappingURL=device.decorator.js.map