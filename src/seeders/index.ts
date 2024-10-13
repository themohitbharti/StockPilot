import express from 'express';
import db from '../models'; 
import productRoutes from '../routes/product.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync models with DB
db.sequelize.sync({ force: false }).then(() => {
  console.log('Database synced!');
}).catch((err: Error) => {
  console.error('Error syncing database:', err);
});



app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
