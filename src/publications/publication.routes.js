import { Router } from "express";
import { check } from "express-validator";
import {publicationPost,publicationGet, publicationGetById, publicationDelete} from "./publication.controller.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
const router = Router();

router.post('/',[validateJWT,
    check('title','The title of publication is required').not().isEmpty(),
    check('mainText','The main text is required for publication').not().isEmpty(),
    check('link','The link is required for publication').not().isEmpty(),
    check('category','The category is required for publication').not().isEmpty()
],publicationPost);

router.get('/',[validateJWT],publicationGet);

router.get('/byId',[validateJWT],publicationGetById);

router.delete('/',[validateJWT],publicationDelete);
export default router;