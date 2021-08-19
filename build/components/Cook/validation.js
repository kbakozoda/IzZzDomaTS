"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class CookValidation
 * @extends Validation
 */
class CookValidation extends validation_1.default {
    /**
     * Creates an instance of CookValidation.
     * @memberof CookValidation
     */
    constructor() {
        super();
    }
    /**
     * @param {ICookModel} params
     * @returns {Joi.ValidationResult<ICookModel >}
     * @memberof CookValidation
     */
    createCook(params) {
        const schema = Joi.object().keys({
            isActivated: Joi.number().less(2),
            workStartHour: Joi.number().less(25).required(),
            workEndHour: Joi.number().less(25).required(),
            workStartDay: Joi.number().less(8).required(),
            workEndDay: Joi.number().less(8).required(),
            userId: this.customJoi.objectId().required(),
            address: Joi.object().keys({
                description: Joi.string().required(),
                lat: Joi.number().required(),
                lon: Joi.number().required(),
            }).required(),
            avatarUrl: Joi.string(),
            description: Joi.string().required()
        });
        return Joi.validate(params, schema);
    }
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof CookValidation
     */
    getCook(body) {
        const schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema);
    }
    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof CookValidation
     */
    removeCook(body) {
        const schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });
        return Joi.validate(body, schema);
    }
}
exports.default = new CookValidation();
//# sourceMappingURL=validation.js.map