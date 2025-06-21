import { Router } from 'express';
import fs from 'fs-extra';
import { authenticateToken, isAdmin } from '../middleware/auth';
import { Product } from '../models/product';

const router = Router();
const PRODUCTS_FILE = './data/products.json';

const readProducts = () => fs.readJson(PRODUCTS_FILE).catch(() => []);
const writeProducts = (data: any) => fs.writeJson(PRODUCTS_FILE, data);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', authenticateToken, async (_req, res) => {
  const products = await readProducts();
  res.json(products);
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created
 *       403:
 *         description: Forbidden (admin only)
 */
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  const products = await readProducts();
  const product = new Product(req.body);
  products.push(product);
  await writeProducts(products);
  res.status(201).json(product);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get('/:id', authenticateToken, async (req: any, res: any) => {
  const products = await readProducts();
  const product = products.find((p: any) => p.id === +req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update a product by ID (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 *       403:
 *         description: Forbidden (admin only)
 */
router.patch('/:id', authenticateToken, isAdmin, async (req: any, res: any) => {
  const products = await readProducts();
  const index = products.findIndex((p: any) => p.id === +req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  products[index] = { ...products[index], ...req.body, updatedAt: Date.now() };
  await writeProducts(products);
  res.json(products[index]);
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product to delete
 *     responses:
 *       204:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       403:
 *         description: Forbidden (admin only)
 */
router.delete('/:id', authenticateToken, isAdmin, async (req: any, res: any) => {
  const products = await readProducts();
  const index = products.findIndex((p: any) => p.id === +req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });

  products.splice(index, 1);
  await writeProducts(products);
  res.status(204).send();
});

export default router;
