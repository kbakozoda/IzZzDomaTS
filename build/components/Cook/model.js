"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connections = require("../../config/connection/connection");
const mongoose_1 = require("mongoose");
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
const CookSchema = new mongoose_1.Schema({
    isActivated: Boolean,
    workStartHour: Number,
    workEndHour: Number,
    workStartDay: Number,
    workEndDay: Number,
    userId: String,
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
exports.default = connections.db.model('CookModel', CookSchema);
//# sourceMappingURL=model.js.map