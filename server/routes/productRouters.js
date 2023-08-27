import express from 'express';
import {
    barintreePaymentContreoller,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getPhotoController,
    getProductController,
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFilterController,
    productListController,
    productSearchController,
    realtedProductController,
    updateProductController
} from '../controllers/ProductController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';

const router = express.Router();

// router
// Create
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// Update Product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// Get All Product
router.get('/get-all-product', getProductController);

// Single Product
router.get('/get-sigle-product/:slug', getSingleProductController)

// Get Photo
router.get('/get-photo/:pid', getPhotoController)

// Delete Product
router.delete('/delete-product/:pid', deleteProductController)

// Filters Product
router.post('/product-filters', productFilterController)

// Product count
router.get('/product-count', productCountController)

// Product per page
router.get('/product-list/:page', productListController)

// Search product
router.get('/search/:keyword', productSearchController)

// Similar Product
router.get('/related-product/:pid/:cid', realtedProductController)

// Category wise product
router.get('/product-category/:slug', productCategoryController)

// PAYMENTS GATEWAY ROUTES
// Token
router.get('/braintree/token', braintreeTokenController);

// Payments 
router.post('/braintree/payment', barintreePaymentContreoller)

export default router;