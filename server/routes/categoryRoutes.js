import express from 'express';
import {
    requireSignIn,
    isAdmin
} from '../middlewares/authMiddleware.js';
import {
    categoryController,
    createCategoryController,
    deleteCategoryController,
    singleCategoryController,
    updateCategoryController
} from '../controllers/CategoryController.js';

const router = express.Router();

// routes
// Create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

// Update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

// Get All Category
router.get('/get-category', categoryController)

// Get Single Category
// router.get('/single-category/:id', singleCategoryController)
router.get('/single-category/:slug', singleCategoryController)

// Delete
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router;
