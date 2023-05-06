"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./modules/user/user.module");
const login_module_1 = require("./modules/login/login.module");
const authentication_1 = require("../middleware/authentication");
const jwt_service_1 = require("../auth/jwt.service");
const mail_service_1 = require("../mail/mail.service");
const change_password_module_1 = require("./modules/change-password/change-password.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(authentication_1.AuthenticationMiddleware)
            .forRoutes({ path: 'user', method: common_1.RequestMethod.DELETE }, { path: 'user', method: common_1.RequestMethod.PATCH }, { path: 'recover-password', method: common_1.RequestMethod.POST }, { path: 'change-password', method: common_1.RequestMethod.PATCH });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, login_module_1.LoginModule, change_password_module_1.ChangePasswordModule],
        controllers: [],
        providers: [jwt_service_1.JWTService, mail_service_1.EmailService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map