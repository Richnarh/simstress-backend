import { Router } from "express";
import { signup, accountList, doLogin } from "../controllers/auth.controller";
import { BASE_PATH } from "../lookup-obj/constants";

const router = Router();

    router.post(BASE_PATH + '/auth/signup', signup);
    router.post(BASE_PATH + '/auth/login', doLogin);
    router.get(BASE_PATH + '/auth/list', accountList);


export default router;