import * as Joi from 'joi';
import Validation from '../validation';
import { IDishModel } from './model';

/**
 * @export
 * @class DishValidation
 * @extends Validation
 */
class DishValidation extends Validation {

    /**
     * Creates an instance of DishValidation.
     * @memberof DishValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IDishModel} params
     * @returns {Joi.ValidationResult<IDishModel >}
     * @memberof DishValidation
     */
    createDish(
        params: IDishModel
    ): Joi.ValidationResult < IDishModel > {
        const schema: Joi.Schema = Joi.object().keys({
            isActivated: Joi.boolean(),
            price: Joi.number().required(),
            pictureUrls: Joi.array().items(Joi.string()),
            hoursToPrepare: Joi.number().required(),
            cookId: this.customJoi.objectId().required(),
            allergens: Joi.array().items(Joi.string()),
            categories: Joi.array().items(Joi.string()).required(),
            coverPhotoUrl: Joi.string(),
            description: Joi.string().required(),
            compound: Joi.string().required()
        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {IDishModel} params
     * @returns {Joi.ValidationResult<IDishModel >}
     * @memberof DishValidation
     */
        updateDish(
            params: IDishModel,
            id: string
        ): Joi.ValidationResult < IDishModel > {
            params._id = id;
            const schema: Joi.Schema = Joi.object().keys({
                isActivated: Joi.boolean(),
                price: Joi.number(),
                pictureUrls: Joi.array().items(Joi.string()),
                hoursToPrepare: Joi.number(),
                cookId: this.customJoi.objectId(),
                allergens: Joi.array().items(Joi.string()),
                categories: Joi.array().items(Joi.string()),
                coverPhotoUrl: Joi.string(),
                description: Joi.string(),
                compound: Joi.string(),
                _id: this.customJoi.objectId()
            });

            return Joi.validate(params, schema);
        }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof DishValidation
     */
    getDish(
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
     * @memberof DishValidation
     */
    removeDish(
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

export default new DishValidation();
