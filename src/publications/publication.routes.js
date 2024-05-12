import { Router } from "express";
import { check } from "express-validator";
import {publicationPost} from "./publication.controller.js";
const router = Router();

router.post('/',[
    check('title','The title of publication is required').not().isEmpty(),
    check('mainText','The main text is required for publication').not().isEmpty(),
    check('link','The link is required for publication').not().isEmpty(),
    check('category','The category is required for publication').not().isEmpty()
],publicationPost);

export default router;