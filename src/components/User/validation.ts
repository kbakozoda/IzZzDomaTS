import * as Joi from 'joi';
import Validation from '../validation';
import { IUserModel, UserRoles } from './model';

/**
 * @export
 * @class UserValidation
 * @extends Validation
 */
class UserValidation extends Validation {

    /**
     * Creates an instance of UserValidation.
     * @memberof UserValidation
     */
    constructor() {
        super();
    }

    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    createUser(
        params: IUserModel
    ): Joi.ValidationResult < IUserModel > {
        const schema: Joi.Schema = Joi.object().keys({
            fullName: Joi.string().required(),
            phone: Joi.string().required(),
            password: Joi.string().required()
        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {IUserModel} params
     * @returns {Joi.ValidationResult<IUserModel >}
     * @memberof UserValidation
     */
    updateUser(
        params: IUserModel,
        id: string
    ): Joi.ValidationResult < IUserModel > {

        params._id = id;

        const schema: Joi.Schema = Joi.object().keys({
            fullName: Joi.string(),
            password: Joi.string(),
            role: Joi.valid(Object.values(UserRoles)),
            _id: this.customJoi.objectId().required()
        });

        return Joi.validate(params, schema);
    }

    /**
     * @param {{ id: string }} body
     * @returns {Joi.ValidationResult<{ id: string }>}
     * @memberof UserValidation
     */
    getUser(
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
     * @memberof UserValidation
     */
    removeUser(
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

export default new UserValidation();
