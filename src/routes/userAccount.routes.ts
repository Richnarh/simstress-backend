import { Router } from "express";
import { createUserAccount, accountList } from "../controllers/account.controller";

const router = Router();

    router.post('/account', createUserAccount);
    router.get('/account/list', accountList);


export default router;