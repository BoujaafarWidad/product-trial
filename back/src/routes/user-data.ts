import { Router } from 'express';
import fs from 'fs-extra';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const USERS_FILE = './data/users.json';

const updateUserField = async (userId: number, field: 'cart' | 'wishlist', data: any[]) => {
  const users = await fs.readJson(USERS_FILE);
  const user = users.find((u: any) => u.id === userId);
  if (!user) throw new Error('User not found');

  user[field] = data;
  await fs.writeJson(USERS_FILE, users);
};

/**
 * @swagger
 * /user/cart:
 *   get:
 *     summary: Get the user's cart
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/cart', authenticateToken, async (req: any, res) => {
  const users = await fs.readJson(USERS_FILE);
  const user = users.find((u: any) => u.id === req.user.id);
  res.json(user?.cart || []);
});

/**
 * @swagger
 * /user/cart:
 *   post:
 *     summary: Update the user's cart
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *     responses:
 *       200:
 *         description: Cart updated successfully
 */
router.post('/cart', authenticateToken, async (req: any, res) => {
  await updateUserField(req.user.id, 'cart', req.body);
  res.json({ message: 'Cart updated' });
});

/**
 * @swagger
 * /user/wishlist:
 *   get:
 *     summary: Get the user's wishlist
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/wishlist', authenticateToken, async (req: any, res) => {
  const users = await fs.readJson(USERS_FILE);
  const user = users.find((u: any) => u.id === req.user.id);
  res.json(user?.wishlist || []);
});

/**
 * @swagger
 * /user/wishlist:
 *   post:
 *     summary: Update the user's wishlist
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *     responses:
 *       200:
 *         description: Wishlist updated successfully
 */
router.post('/wishlist', authenticateToken, async (req: any, res) => {
  await updateUserField(req.user.id, 'wishlist', req.body);
  res.json({ message: 'Wishlist updated' });
});

export default router;
