import { IDishModel } from './model';

/**
 * @export
 * @interface IDishService
 */
export interface IDishService {

    /**
     * @returns {Promise<IDishModel[]>}
     * @memberof IDishService
     */
    findAll(): Promise<IDishModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<IDishModel>}
     * @memberof IDishService
     */
    findOne(code: string): Promise<IDishModel>;

    /**
     * @param {IDishModel} IDishModel
     * @returns {Promise<IDishModel>}
     * @memberof IDishService
     */
    insert(IDishModel: IDishModel): Promise<IDishModel>;

    /**
     * @param {IDishModel} IDishModel
     * @returns {Promise<IDishModel>}
     * @memberof IDishService
     */
    update(IDishModel: IDishModel, id: string): Promise<IDishModel>;

    /**
     * @param {string} id
     * @returns {Promise<IDishModel>}
     * @memberof IDishService
     */
    remove(id: string): Promise<IDishModel>;
}
