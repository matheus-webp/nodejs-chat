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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const common_2 = require("@nestjs/common");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(data) {
        try {
            return this.userService.create(data);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(error.message);
            }
            throw error;
        }
    }
    async delete(data) {
        try {
            const result = await this.userService.delete(data);
            return { message: result };
        }
        catch (error) {
            if (error.response) {
                throw new common_1.HttpException(error.response.message, error.response.statusCode);
            }
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async update(name, newName) {
        try {
            return await this.userService.update(name, newName);
        }
        catch (error) {
            if (error.response) {
                throw new common_1.HttpException(error.response.message, error.response.statusCode);
            }
        }
    }
};
__decorate([
    (0, common_2.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_2.Delete)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, common_2.Patch)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map