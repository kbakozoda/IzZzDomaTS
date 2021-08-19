import * as bcrypt from 'bcrypt';
import * as connections from '../../config/connection/connection';
import * as crypto from 'crypto';
import { Document, Schema } from 'mongoose';
import { NextFunction } from 'express';

/**
 * @export
 * @interface IUserModel
 * @extends {Document}
 */
export interface IUserModel extends Document {
    phone: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    tokens: AuthToken[];

    fullName: string;
    role: string;

    comparePassword: (password: string) => Promise < boolean > ;
    gravatar: (size: number) => string;
}

export type AuthToken = {
    accessToken: string,
    kind: string
};

export enum UserRoles {
    Cook = 'Cook',
    Admin = 'Admin',
    Moderator = 'Moderator',
    Customer = 'Customer'
};

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSchema:
 *      required:
 *        - phone
 *        - username
 *      properties:
 *        id:
 *          type: string
 *        fullName:
 *          type: string
 *        phone:
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
 *    Users:
 *      type: array
 *      items:
 *        $ref: '#/components/schemas/UserSchema'
 */
const UserSchema: Schema = new Schema({
    phone: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ UserRoles.Admin, UserRoles.Cook, UserRoles.Moderator, UserRoles.Customer ],
        default: UserRoles.Customer
    },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    tokens: Array
}, {
    collection: 'usermodel',
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
}).pre('save', async function (next: NextFunction): Promise < void > {
    const user: any = this; // tslint:disable-line

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt: string = await bcrypt.genSalt(10);

        const hash: string = await bcrypt.hash(user.password, salt);

        user.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

/**
 * Method for comparing passwords
 */
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise < boolean > {
    try {
        const match: boolean = await bcrypt.compare(candidatePassword, this.password);

        return match;
    } catch (error) {
        return error;
    }
};

/**
 * Helper method for getting user's gravatar.
 */
UserSchema.methods.gravatar = function (size: number): string {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5: string = crypto.createHash('md5').update(this.email).digest('hex');

    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export default connections.db.model < IUserModel > ('UserModel', UserSchema);
