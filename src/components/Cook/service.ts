import * as Joi from 'joi';
import CookModel, {ICookModel} from './model';
import CookValidation from './validation';
import { ICookService } from './interface';
import { Types } from 'mongoose';
import { IUserModel, UserRoles } from '../User/model';
import UserService from '../User/service';

/**
 * @export
 * @implements {ICookService}
 */
const CookService: ICookService = {
    /**
     * @returns {Promise < ICookModel[] >}
     * @memberof CookService
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
     * @memberof CookService
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
     * @param {ICookModel} cook
     * @returns {Promise < ICookModel >}
     * @memberof CookService
     */
    async insert(body: ICookModel): Promise < ICookModel > {
        try {
            const validate: Joi.ValidationResult < ICookModel > = CookValidation.createCook(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const cook: ICookModel = await CookModel.create(body);
            await UserService.update({ role: UserRoles.Cook } as IUserModel, body.userId);

            return cook;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {ICookModel} user
     * @returns {Promise < ICookModel >}
     * @memberof CookService
     */
    async update(body: ICookModel, id: string): Promise < ICookModel > {
        try {
            const validate: Joi.ValidationResult < ICookModel > = CookValidation.updateCook(body, id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const filter = { _id: id };

            const cook: ICookModel = await CookModel.findOneAndUpdate(filter, body, { new: true });

            return cook;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < ICookModel >}
     * @memberof CookService
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

            const cook: ICookModel = await CookModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return cook;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default CookService;
