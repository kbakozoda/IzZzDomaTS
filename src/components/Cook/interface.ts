import { ICookModel } from './model';

/**
 * @export
 * @interface IUserService
 */
export interface ICookService {

    /**
     * @returns {Promise<ICookModel[]>}
     * @memberof ICookService
     */
    findAll(): Promise<ICookModel[]>;

    /**
     * @param {string} code
     * @returns {Promise<ICookModel>}
     * @memberof ICookService
     */
    findOne(code: string): Promise<ICookModel>;

    /**
     * @param {ICookModel} ICookModel
     * @returns {Promise<ICookModel>}
     * @memberof ICookService
     */
    insert(IUserModel: ICookModel): Promise<ICookModel>;

    /**
     * @param {ICookModel} ICookModel
     * @returns {Promise<ICookModel>}
     * @memberof ICookService
     */
    update(IUserModel: ICookModel, id: string): Promise<ICookModel>;


    /**
     * @param {string} id
     * @returns {Promise<ICookModel>}
     * @memberof ICookService
     */
    remove(id: string): Promise<ICookModel>;
}
