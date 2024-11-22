import express from 'express';
import ProductController from '../controllers/productController';

const router = express.Router();

router.post('/products', ProductController.createProduct);
router.post('/calculateQuote/:productId', ProductController.calculateQuote);
router.get('/products/:productId', ProductController.getProduct);

export default router;
