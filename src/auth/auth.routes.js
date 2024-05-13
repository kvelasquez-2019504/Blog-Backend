import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existsUserEmail } from "../helpers/db-validator.js";
import { validateFields } from "../middlewares/validate-field.js";

const router = Router();

router.post('/login',[
    check("user","Username or email is required").not().isEmpty(),
    check("password","Password is required for the logging").not().isEmpty(),
    validateFields
],login);


router.post('/register', 
    [
        check('email', 'Este no es un correo válido').isEmail(),
        check('email').custom(existsUserEmail),
        check('username','El username es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio').not().isEmpty(),
        check('password','El password debe de ser mayor a 6 caracteres').isLength({min:6,}),
        validarCampos
    ], register)

export default router;