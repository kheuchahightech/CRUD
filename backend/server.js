const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();

const app = express();
app.use(cors()); // ➔ autoriser toutes les origines
app.use(express.json());

app.use('/api/books', bookRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    app.listen(5000, () => console.log('🚀 Serveur lancé sur le port 5000'));
  })
  .catch((err) => console.log(err));
