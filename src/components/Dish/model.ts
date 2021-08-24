import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';

/**
 * @export
 * @interface IDishModel
 * @extends {Document}
 */
export interface IDishModel extends Document {
    isActive: boolean;
    cookId: string;
    description: string;
    price: number;
    pictureUrls: Array<string>;
    hoursToPrepare: number;
    compound: string;
    allergens: Array<string>;
    coverPhotoUrl: string;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    CookSchema:
 *      required:
 *        - hoursToPrepare
 *        - compound
 *        - coverPhotoUrl
 *        - cookId
 *        - price
 *      properties:
 *        _id:
 *          type: string
 *        isActive:
 *          type: boolean
 *        cookId:
 *          type: string
 *        description:
 *          type: string
 *        price:
 *          type: number
 *        prictureUrls:
 *          type: array
 *        hoursToPrepare:
 *          type: number
 *        compound:
 *          type: string
 *        allergens:
 *          type: array
 *        coverPhotoUrl:
 *          type: string
 *
 *    Dishes:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/DishSchema'
 */

const DishSchema: Schema = new Schema({
    isActive: Boolean,
    price: Number, // currently this price indicates the price for only one portion. But we need to consider the discounts and packs.[Like in Savol & Amazon]
    prictureUrls: Array,
    hoursToPrepare: Number,
    workEndDay: Number,
    cookId: String,
    description: String,
    compound: String,
    allergens: Array,
    coverPhotoUrl: String
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export default connections.db.model < IDishModel > ('DishModel', DishSchema);
