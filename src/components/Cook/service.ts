import * as Joi from 'joi';
import CookModel, {ICookModel} from './model';
import CookValidation from './validation';
import { ICookService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {ICookService}
 */
const CookService: ICookService = {
    /**
     * @returns {Promise < ICookModel[] >}
     * @memberof UserService
     */
    async findAll(): Promise < ICookModel[] > {
        try {
            return await CookModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < ICookModel >}
     * @memberof UserService
     */
    async findOne(id: string): Promise < ICookModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = CookValidation.getCook({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await CookModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {ICookModel} user
     * @returns {Promise < ICookModel >}
     * @memberof UserService
     */
    async insert(body: ICookModel): Promise < ICookModel > {
        try {
            const validate: Joi.ValidationResult < ICookModel > = CookValidation.createCook(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: ICookModel = await CookModel.create(body);

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < ICookModel >}
     * @memberof UserService
     */
    async remove(id: string): Promise < ICookModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = CookValidation.removeCook({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const user: ICookModel = await CookModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default CookService;
