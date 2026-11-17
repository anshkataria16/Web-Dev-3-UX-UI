import Product from "../model/productmodel.js";

// 1. Create Product
export const createProduct = async (req, res, next) => {
    try {
        const product = new Product(req.body);

        await product.save();

        res.status(201).json({
            message: "Product Added Successfully",
            product: product
        });
    }
    catch (error) {
        next(error);
    }
};


// 2. Get All Products
export const getProducts = async (req, res, next) => {
    try {
        const category = req.query.category;
        const search = req.query.search;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        let filter = {};

        // Filter by category
        if (category) {
            filter.category = category;
        }

        // Search by product name
        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Sorting
        let sort = {};

        if (req.query.sort === "price") {
            sort.price = 1;
        }
        else if (req.query.sort === "-price") {
            sort.price = -1;
        }
        else if (req.query.sort === "name") {
            sort.name = 1;
        }
        else {
            sort.createdAt = -1;
        }

        // Pagination
        const total = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            total: total,
            page: page,
            totalPages: Math.ceil(total / limit),
            count: products.length,
            products: products
        });
    }
    catch (error) {
        next(error);
    }
};


// 3. Get Single Product
export const getSingleProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json(product);
    }
    catch (error) {
        next(error);
    }
};


// 4. Update Product
export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        const product = await Product.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            message: "Product Updated Successfully",
            product: product
        });
    }
    catch (error) {
        next(error);
    }
};


// 5. Delete Product
export const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json({
            message: "Product Deleted Successfully",
            id: product._id
        });
    }
    catch (error) {
        next(error);
    }
};


// 6. Low Stock Report
export const lowStockReport = async (req, res, next) => {
    try {
        const products = await Product.find({
            $expr: {
                $lte: ["$quantity", "$reorderLevel"]
            }
        });

        res.status(200).json({
            count: products.length,
            lowStockItems: products
        });
    }
    catch (error) {
        next(error);
    }
};


// 7. Category Wise Summary
export const categorySummary = async (req, res, next) => {
    try {
        const summary = await Product.aggregate([

            {
                $group: {
                    _id: "$category",

                    totalProducts: {
                        $sum: 1
                    },

                    totalQuantity: {
                        $sum: "$quantity"
                    },

                    totalStockValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    }
                }
            },

            {
                $sort: {
                    _id: 1
                }
            }

        ]);

        res.status(200).json({
            message: "Category Summary",
            summary: summary
        });
    }
    catch (error) {
        next(error);
    }
};