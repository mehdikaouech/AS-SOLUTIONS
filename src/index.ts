import express from 'express';
import productController from './controllers/productController';
import sequelize from './db-connection';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/products', productController.createProduct);
app.post('/calculateQuote/:productId', productController.calculateQuote);
app.get('/products/:productId', productController.getProduct);

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
