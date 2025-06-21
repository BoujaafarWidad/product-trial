import { Router } from 'express';
import fs from 'fs-extra';
import bcrypt from 'bcrypt';
import { generateToken } from '../middleware/auth';
import { Request, Response } from 'express';

const router = Router();
const USERS_FILE = './data/users.json';

/**
 * @swagger
 * /account:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstname
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account created successfully
 *       400:
 *         description: Email already exists
 */
router.post('/account', async (req:Request, res:any) => {
  const users = await fs.readJson(USERS_FILE).catch(() => []);
  const { email, password, username, firstname } = req.body;

  if (users.find((u:any) => u.email === email))
    return res.status(400).json({ message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), email, password: hashedPassword, username, firstname, cart: [], wishlist: [] };

  users.push(user);
  await fs.writeJson(USERS_FILE, users);
  res.status(201).json({ message: 'Account created' });
});

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Authenticate user and return JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourpassword
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT access token
 *       401:
 *         description: Invalid credentials
 */
router.post('/token', async (req: Request, res:any) => {
  const { email, password } = req.body;
  const users = await fs.readJson(USERS_FILE).catch(() => []);
  const user = users.find((u: any) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken({ id: user.id, email: user.email });
  res.json({ token });
});

export default router;
