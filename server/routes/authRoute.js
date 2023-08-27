import express from "express";
import {
    registerController,
    loginController,
    forgotPasswordController,
    testController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController
} from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

// Login || POST 
router.post('/login', loginController)

// Forgot Password || POST
router.post('/forgot-password', forgotPasswordController)

// test routes
router.get('/test', requireSignIn, isAdmin, testController)

// Protected route auth for User
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

// Protected route auth for Admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

// User Profile Update 
router.put('/profile', requireSignIn, updateProfileController)

//Get Orders
router.get('/orders', requireSignIn, getOrdersController)

//Get all Orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

// Order Status Update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)

export default router;



