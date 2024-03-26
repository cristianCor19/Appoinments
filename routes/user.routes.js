import { Router } from "express";

import {
    saveUser,
    loginUser
}from '../controllers/controll_user.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints for users
 */

/**
 * @swagger
 * /user/registerUser:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Register a new user in the system.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         in: body
 *         description: User data to register.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User successfully registered.
 *         schema:
 *           $ref: '#/definitions/SuccessfullyRegister'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.post('/registerUser', saveUser)


/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: User login
 *     description: User login in the system.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         in: body
 *         description: User data to login.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserLogin'
 *     responses:
 *       200:
 *         description: User successfully registered.
 *         schema:
 *           $ref: '#/definitions/SuccessfullyLogin'
 *       500:
 *         description: Server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 *         
 *          
 */
router.post('/login', loginUser)




/**
 * @swagger
 * definitions:
 *   Error:
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *         example: false
 *       error:
 *         type: string
 *         example: Error message
 *   SuccessfullyRegister:
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *         example: true
 *       success:
 *         type: string
 *         example: message of successfully
 *   SuccessfullyLogin: 
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *         example: true
 *       data: 
 *         type: object
 *         example: {
 *          "uid": "uid value",
 *          "email": "cristian9@gmail.com",
 *          "token": "token value"
 *          }
 *       success:
 *         type: string
 *         example: message of successfully login
 *       
 * 
 * 
 *   Role:
 *     type: string
 *     enum: ['patient', 'doctor']
 *     default: 'patient'
 *   User:
 *     type: object
 *     properties:
 *       idCardNumer:
 *         type: number
 *         unique: true
 *         required: true
 *         description: Enter number of identify card 
 *         example: 1002602877
 *       name:
 *         type: string
 *         required: true
 *         description: Enter user name
 *         example: Cristian
 *       lastname:
 *         type: string
 *         required: true
 *         description: Enter user lastname
 *         example: Cordoba
 *       email:
 *         type: string
 *         unique: true
 *         required: true
 *         description: Enter user email 
 *         example: example@gmail.com
 *       password:
 *         type: string
 *         required: true
 *         description: Enter user passwords
 *         example: darioGomez123
 *       phone:
 *         type: number
 *         require: false
 *         description: Enter user phone
 *         example: 3107258789
 *       role:
 *         $ref: '#/definitions/Role' 
 *   
 *   UserLogin:
 *      type: object
 *      properties:
 *        email:
 *         unique: true
 *         required: true
 *         type: string
 *         example: jexample@gmail.com
 *        password:
 *         required: true
 *         type: string
 *         example: dariogomez133  
 */

export default router