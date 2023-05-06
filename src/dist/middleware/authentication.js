"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../auth/jwt.service");
let AuthenticationMiddleware = class AuthenticationMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new common_1.BadRequestException('Not authorized');
        }
        const token = authHeader.substring(7);
        const isValidToken = await this.jwtService.verify(token);
        if (!isValidToken) {
            throw new common_1.BadRequestException('Invalid token');
        }
        next();
    }
};
AuthenticationMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JWTService])
], AuthenticationMiddleware);
exports.AuthenticationMiddleware = AuthenticationMiddleware;
//# sourceMappingURL=authentication.js.map