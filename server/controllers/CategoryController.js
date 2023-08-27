import categoryModel from "../models/categoryModel.js";
import slugify from 'slugify';

// Create Product
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Name is required" })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exisits"
            })
        }
        const category = await categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "new category created",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        })
    }
}

// Update Category
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating"
        })
    }
}

// Get Category
export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            category,
            message: "All Category List"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Something Wrong"
        })
    }
}

// Get Single Category
export const singleCategoryController = async (req, res) => {
    try {
        // const { id } = req.params;
        // const category = await categoryModel.findById(id)

        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            category,
            message: "Category"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while geting single category"
        })
    }
}

// Delete Category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Delete Successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while delete"
        })
    }
}
