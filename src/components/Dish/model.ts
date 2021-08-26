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
    categories: Array<string>;
    title: string;
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
 *        categories:
 *          type: array
 *        title:
 *          type: string
 *
 *    Dishes:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/DishSchema'
 */

const DishSchema: Schema = new Schema({
    isActive: { type: Boolean, default: true },
    price: { type: Number, required: true }, // currently this price indicates the price for only one portion. But we need to consider the discounts and packs.[Like in Savol & Amazon]
    pictureUrls: Array,
    hoursToPrepare: { type: Number, required: true },
    cookId: { type: String, required: true },
    description: { type: String, required: true },
    compound: { type: String, required: true },
    allergens: Array,
    coverPhotoUrl: { type: String, default: "https://google.com" },
    categories: { type: Array, required: true },
    title: { type: String, required: true }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export default connections.db.model < IDishModel > ('DishModel', DishSchema);
