import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from 'fs';
import slugify from "slugify";
import orderModel from "../models/orderModel.js"
// import razorpay from "razorpay"
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

// Payment Gateway Instance
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,

});

// Create Product
export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" })
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: "Product Create Successfully",
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while creating product"
        })
    }
};

// Update Product
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // Validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" })
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Update Product",
            error: error.message
        })
    }
}

// Get all Product
export const getProductController = async (req, res) => {
    try {
        const product = await productModel
            .find({})
            .select("-photo")
            .limit(12)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalItem: product.length,
            message: "All Product List",
            product,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while get Product",
            error: error.message
        })

    }
};

// Get Single Product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select('-photo')
            .populate("category")
        res.status(200).send({
            success: true,
            message: "Product Details",
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while get single product",
            error
        })
    }
}

// Get photo
export const getPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while get photo",
            error
        })
    }
}

// Delete Product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while Delete product",
            error: error.message
        })
    }
}

// Filters Product
export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const product = await productModel.find(args)
        res.status(200).send({
            success: true,
            message: "All filter products",
            product,
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while filtering Products",
            error
        })
    }
}

// Product Count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in product count",
            error
        })
    }
}

// Product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page : 1
        const product = await productModel.
            find({}).
            select("-photo").
            skip((page - 1) * perPage).
            limit(perPage).
            sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            product,
        });

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in product per page',
            error
        })
    }
}

// Search Product
export const productSearchController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                ],
            })
            .select("-photo");
        res.json(results);

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in Searching product",
            error
        })
    }
}

// Similar Product
export const realtedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const product = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select('-photo').limit(3).populate("category")
        res.status(200).send({
            success: true,
            product
        })

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while getting related Products",
            error
        })
    }
}

// Category wise product
export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        const product = await productModel.find({ category }).populate('category')
        res.status(200).send({
            success: true,
            category,
            product
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error while getting category wise product',
            error
        })
    }
}

// Payment Gate APIs
// Token
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (error, response) {
            if (error) {
                res.status(500).send({
                    message: error,
                })
            } else {
                res.send(response);
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// Payments
export const barintreePaymentContreoller = async (req, res) => {
    try {
        const { cart, nonce } = req.body
        let total = 0;
        cart.map((i) => { total += i.price })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            },
        },
            function (error, result) {
                if (error) {
                    console.log(err);
                    return;
                }
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user_id
                    }).save();
                    res.json({ ok: true })
                } else {
                    res.status(500).send(error)
                }
            }
        )
    } catch (error) {
        console.log(error)
    }
}