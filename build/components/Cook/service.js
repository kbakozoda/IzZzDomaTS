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
const model_1 = require("./model");
const validation_1 = require("./validation");
const mongoose_1 = require("mongoose");
/**
 * @export
 * @implements {ICookService}
 */
const CookService = {
    /**
     * @returns {Promise < ICookModel[] >}
     * @memberof UserService
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield model_1.default.find({});
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < ICookModel >}
     * @memberof UserService
     */
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.getCook({
                    id
                });
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                return yield model_1.default.findOne({
                    _id: mongoose_1.Types.ObjectId(id)
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {ICookModel} user
     * @returns {Promise < ICookModel >}
     * @memberof UserService
     */
    insert(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.createCook(body);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const user = yield model_1.default.create(body);
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} id
     * @returns {Promise < ICookModel >}
     * @memberof UserService
     */
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.removeCook({
                    id
                });
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const user = yield model_1.default.findOneAndRemove({
                    _id: mongoose_1.Types.ObjectId(id)
                });
                return user;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
};
exports.default = CookService;
//# sourceMappingURL=service.js.map