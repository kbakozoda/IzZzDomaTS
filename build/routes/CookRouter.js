"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("../components");
const express_1 = require("express");
/**
 * @constant {express.Router}
 */
const router = express_1.Router();
/**
 * GET method route
 * @example http://localhost:PORT/v1/cooks
 *
 * @swagger
 * /v1/cooks:
 *   get:
 *     description: Get all stored users in Database
 *     tags: ["cooks"]
 *     security:
 *      - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: An array of cooks
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Cooks'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get('/', components_1.CookComponent.findAll);
/**
 * POST method route
 * @example http://localhost:PORT/v1/cooks
 *
 * @swagger
 * /v1/cooks:
 *   post:
 *      description: Create new Cooks
 *      tags: ["cooks"]
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *        description: user creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CookSchema'
 *            example:
 *              name: userName
 *              email: test.user@mail.com
 *      responses:
 *        201:
 *          description: return created user
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/CookSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post('/', components_1.CookComponent.create);
/**
 * GET method route
 * @example http://localhost:PORT/v1/cooks/:id
 *
 * @swagger
 * /v1/cooks/{id}:
 *  get:
 *    description: Get cook by userId
 *    tags: ["cooks"]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique cookId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return coko by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/UserSchema'
 */
router.get('/:id', components_1.CookComponent.findOne);
/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/cooks/:id
 *
 * @swagger
 * /v1/cooks/{id}:
 *  delete:
 *    description: Delete user by userId
 *    tags: ["cooks"]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted user
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/CookSchema'
 */
router.delete('/:id', components_1.CookComponent.remove);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=CookRouter.js.map