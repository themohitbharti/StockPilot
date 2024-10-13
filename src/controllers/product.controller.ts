
import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import db from '../models';
import { Op } from 'sequelize';

const Product = db.Product;

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const { name, price, description, category } = req.body;
    // console.log('Product model:', Product);

    if (!name || !price || !category) {
        return res.status(400).json({ message: 'Name, price, and category are required.' });
    }

    if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ success: false, message: 'Price must be a positive number.' });
    }

    if (description && description.length > 500) {
        return res.status(400).json({ success: false, message: 'Description must be less than 500 characters.' });
    }

    const newProduct = await Product.create({ name, price, description, category });
    res.status(201).json(newProduct);
});



export const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, search } = req.query; // Get query parameters

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const offset = (pageNumber - 1) * pageSize;

    if (pageNumber < 1 || pageSize < 1) {
        return res.status(400).json({ success: false, message: 'Page and limit must be positive numbers.' });
    }

    try {
        const whereClause: any = {};
        if (search) {
            whereClause[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { category: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const { count, rows } = await Product.findAndCountAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
        });

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found.' });
        }

        res.status(200).json({
            success: true,
            products: rows,
            totalProducts: count,
            currentPage: pageNumber,
            totalPages: Math.ceil(count / pageSize),
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching products. Please try again later.' });
    }
});



export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!productId) {
        return res.status(400).json({ success: false, message: 'Product ID is required.' });
    }

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the product. Please try again later.' });
    }
});



export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!productId) {
        return res.status(400).json({ success: false, message: 'Product ID is required.' });
    }

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        const { name, price, description, category } = req.body;

        if (!name && !price && !description && !category) {
            return res.status(400).json({ success: false, message: 'At least one field (name, price, description, category) must be provided to update.' });
        }

        if (name && typeof name !== 'string') {
            return res.status(400).json({ success: false, message: 'Name must be a string.' });
        }
        if (price && typeof price !== 'number') {
            return res.status(400).json({ success: false, message: 'Price must be a number.' });
        }
        if (description && typeof description !== 'string') {
            return res.status(400).json({ success: false, message: 'Description must be a string.' });
        }
        if (category && typeof category !== 'string') {
            return res.status(400).json({ success: false, message: 'Category must be a string.' });
        }
        await product.update({ name, price, description, category }, {
            fields: ['name', 'price', 'description', 'category'].filter(field => req.body[field] !== undefined)
        });

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the product. Please try again later.' });
    }
});



export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;

    if (!productId) {
        return res.status(400).json({ success: false, message: 'Product ID is required.' });
    }

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        await product.destroy();

        res.status(200).json({ success: true, message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the product. Please try again later.' });
    }
});
