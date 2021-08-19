"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("./validation");
const model_1 = require("../User/model");
/**
 * @export
 * @implements {IAuthService}
 */
const AuthService = {
    /**
     * @param {IUserModel} body
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.createUser(body);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const user = new model_1.default({
                    phone: body.phone,
                    fullName: body.fullName,
                    password: body.password
                });
                const query = yield model_1.default.findOne({
                    phone: body.phone
                });
                if (query) {
                    throw new Error('This phone number already exists');
                }
                const saved = yield user.save();
                return saved;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    },
    /**
     * @param {IUserModel} body
     * @returns {Promise <IUserModel>}
     * @memberof AuthService
     */
    getUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.getUser(body);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const user = yield model_1.default.findOne({
                    phone: body.phone
                });
                const isMatched = user && (yield user.comparePassword(body.password));
                if (isMatched) {
                    return user;
                }
                throw new Error('Invalid password or phone');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
};
exports.default = AuthService;
//# sourceMappingURL=service.js.map