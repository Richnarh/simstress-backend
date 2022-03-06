import { Router } from "express";
import { createCustomer, deleteCustomer, getById, findAll, updateCustomer } from "../controllers/customer.controller";

const router = Router();

router.post('/customer', createCustomer);
router.get('/customer/list', findAll);
router.get("/customer/:id", getById);
router.put("/customer/:id", updateCustomer);
router.delete("/customer/:id", deleteCustomer);

export default router;