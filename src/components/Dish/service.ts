import * as Joi from 'joi';
import DishModel, {IDishModel} from './model';
import DishValidation from './validation';
import { IDishService } from './interface';
import { Types } from 'mongoose';

/**
 * @export
 * @implements {IDishService}
 */
const DishService: IDishService = {
    /**
     * @returns {Promise < IDishModel[] >}
     * @memberof DishService
     */
    async findAll(): Promise < IDishModel[] > {
        try {
            return await DishModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IDishModel >}
     * @memberof DishService
     */
    async findOne(id: string): Promise < IDishModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = DishValidation.getDish({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            return await DishModel.findOne({
                _id: Types.ObjectId(id)
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IDishModel} cook
     * @returns {Promise < IDishModel >}
     * @memberof DishService
     */
    async insert(body: IDishModel): Promise < IDishModel > {
        try {
            const validate: Joi.ValidationResult < IDishModel > = DishValidation.createDish(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const dish: IDishModel = await DishModel.create(body);

            return dish;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {IDishModel} user
     * @returns {Promise < IDishModel >}
     * @memberof DishService
     */
    async update(body: IDishModel, id: string): Promise < IDishModel > {
        try {
            // TODO: Must return 404 in case the dish with this id does not exist; same in other similar requests
            const validate: Joi.ValidationResult < IDishModel > = DishValidation.updateDish(body, id);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const filter = { _id: id };

            const cook: IDishModel = await DishModel.findOneAndUpdate(filter, body, { new: true });

            return cook;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    /**
     * @param {string} id
     * @returns {Promise < IDishModel >}
     * @memberof DishService
     */
    async remove(id: string): Promise < IDishModel > {
        try {
            const validate: Joi.ValidationResult < {
                id: string
            } > = DishValidation.removeDish({
                id
            });

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const cook: IDishModel = await DishModel.findOneAndRemove({
                _id: Types.ObjectId(id)
            });

            return cook;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

export default DishService;
