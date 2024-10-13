
import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import db from '../models';

const Product = db.Product;

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const { name, price, description, category } = req.body;
    // console.log('Product model:', Product);

    if (!name || !price || !category) {
        return res.status(400).json({ message: 'Name, price, and category are required.' });
    }

    const newProduct = await Product.create({ name, price, description, category });
    res.status(201).json(newProduct);
});

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.findAll();
    res.status(200).json(products);
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json(product);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }

    const { name, price, description, category } = req.body;
    await product.update({ name, price, description, category });
    res.status(200).json(product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
    }

    await product.destroy();
    res.status(204).send();
});
