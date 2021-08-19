import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface ICookModel extends Document {
    isActivated: boolean;
    workStartHour: number;
    workEndHour: number;
    workStartDay: number;
    workEndDay: number;
    userId: string;
    address: {
        description: string;
        lat: number;
        lon: number;
    };

    description: string;
    rating: number;
    avatarUrl: string;
}

/**
 * @swagger
 * components:
 *  schemas:
 *    CookSchema:
 *      required:
 *        - workStartHour
 *        - workEndHour
 *        - workStartDay
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        passwordResetToken:
 *          type: string
 *        passwordResetExpires:
 *          type: string
 *          format: date
 *        tokens:
 *          type: array
 *        avatarUrl:
 *          type: string
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */

const CookSchema: Schema = new Schema({
    isActivated: Boolean,
    workStartHour: Number,
    workEndHour: Number,
    workStartDay: Number,
    workEndDay: Number,
    userId: { type: String, unique: true },
    address: {
        description: String,
        lat: Number,
        lon: Number,
    },

    description: String,
    rating: { type: Number, default: 0 },
    avatarUrl: { type: String, default: "http://someavatar.url" }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export default connections.db.model < ICookModel > ('CookModel', CookSchema);
