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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const encryption_service_1 = require("../../../encryption/encryption.service");
let UserService = class UserService {
    constructor(prisma, encryptionService) {
        this.prisma = prisma;
        this.encryptionService = encryptionService;
    }
    async create(data) {
        const { password, passwordConfirmation } = data, userData = __rest(data, ["password", "passwordConfirmation"]);
        if (!data.name ||
            !data.email ||
            !data.password ||
            !data.passwordConfirmation) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        const userExists = await this.prisma.user.findFirst({
            where: { name: data.name, email: data.email },
        });
        if (userExists) {
            throw new common_1.BadRequestException('User with this name/email already exists');
        }
        if (password !== data.passwordConfirmation) {
            throw new common_1.BadRequestException("Passwords don't match");
        }
        const encryptedPassword = await this.encryptionService.encrypt(password);
        return this.prisma.user.create({
            data: Object.assign(Object.assign({}, userData), { password: encryptedPassword }),
        });
    }
    async delete(data) {
        try {
            const { email } = data;
            const result = await this.prisma.user.deleteMany({ where: { email } });
            if (result.count === 0) {
                throw new common_1.NotFoundException('User not found or already deleted');
            }
            return `User with email ${email} has been deleted`;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Error deleting user: ${error.message}`);
        }
    }
    async update(name, newName) {
        const strNewName = newName.name;
        if (!strNewName) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { name: strNewName },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Name already taken');
        }
        return await this.prisma.user.update({
            where: { name },
            data: { name: strNewName },
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        encryption_service_1.EncryptionService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map