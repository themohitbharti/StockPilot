import express from 'express';
import db from '../models'; 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Sync models with DB
db.sequelize.sync({ force: false }).then(() => {
  console.log('Database synced!');
}).catch((err: Error) => {
  console.error('Error syncing database:', err);
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
