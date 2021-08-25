import * as Joi from 'joi';
import Validation from '../validation';
import { ICookModel } from './model';

/**
 * @export
 * @class CookValidation
 * @extends Validation
 */
class CookValidation extends Validation {

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
    createCook(
        params: ICookModel
    ): Joi.ValidationResult < ICookModel > {
        const schema: Joi.Schema = Joi.object().keys({
            isActivated: Joi.boolean(),
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
     * @param {ICookModel} params
     * @returns {Joi.ValidationResult<ICookModel >}
     * @memberof CookValidation
     */
        updateCook(
            params: ICookModel,
            id: string
        ): Joi.ValidationResult < ICookModel > {
            params._id = id;
            const schema: Joi.Schema = Joi.object().keys({
                isActivated: Joi.boolean(),
                workStartHour: Joi.number().less(25),
                workEndHour: Joi.number().less(25),
                workStartDay: Joi.number().less(8),
                workEndDay: Joi.number().less(8),
                userId: this.customJoi.objectId(),
                address: Joi.object().keys({
                    description: Joi.string(),
                    lat: Joi.number(),
                    lon: Joi.number(),
                }),
                avatarUrl: Joi.string(),
                description: Joi.string(),
                _id: this.customJoi.objectId().required()
            });

            return Joi.validate(params, schema);
        }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof CookValidation
     */
    getCook(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof CookValidation
     */
    removeCook(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
}

export default new CookValidation();
