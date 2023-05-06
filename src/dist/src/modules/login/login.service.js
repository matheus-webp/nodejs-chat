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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../../../auth/jwt.service");
const prisma_service_1 = require("../../database/prisma.service");
const encryption_service_1 = require("../../../encryption/encryption.service");
let LoginService = class LoginService {
    constructor(jwtService, prisma, encryptionService) {
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.encryptionService = encryptionService;
    }
    async login(data) {
        const { email, password } = data;
        if (!email || !password) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!existingUser) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const isValidPassword = await this.encryptionService.compare(password, existingUser.password);
        if (!isValidPassword) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        return await this.jwtService.generate(existingUser.id);
    }
};
LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JWTService,
        prisma_service_1.PrismaService,
        encryption_service_1.EncryptionService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map