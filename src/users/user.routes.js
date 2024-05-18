import {Router} from 'express'; 
import {check} from 'express-validator';
import {existsUsername,
    existsUserEmail} from '../helpers/db-validator.js';
import {validateFields} from '../middlewares/validate-field.js';
import {validateJWT} from '../middlewares/validate-jwt.js';
import { validateUsername } from '../middlewares/validate-username.js';
import {verifyPassword,
    userPut,
    userPost} from './user.controller.js';
const router = Router();

router.put('/',[validateJWT,
    check("username","The username is required").not().isEmpty(),
    validateUsername,
    check("passwordNew","The password is mandatory for security and with minimum 8 characters").isLength({min:8}),
    validateFields,
    verifyPassword
],userPut);

router.post('/',[check("name","Name is required to register").not().isEmpty(),
    check("username","Username is required to register").not().isEmpty(),
    check("username").custom(existsUsername),
    check("userEmail","A valid email is required").isEmail(),
    check('userEmail').custom(existsUserEmail),
    check("password","The password is mandatory for security and with minimum 8 characters").isLength({min:8}),
    validateFields
],userPost);

export default router; 