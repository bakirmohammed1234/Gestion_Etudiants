const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();

// --- Middlewares ---
app.use(express.json());

app.use(cors({
    origin: [
        process.env.FRONTEND_URL,      // URL envoyée dans le docker-compose
        'http://localhost',
        'http://localhost:5173',
        'http://localhost:3000'
    ],
    credentials: true
}));

// --- Connexion MongoDB ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connecté ✔️'))
    .catch((err) => console.error('Erreur MongoDB ❌ :', err));

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// --- Serveur ---
const PORT = process.env.PORT || 5000;

// 🔥 IMPORTANT : écoute sur 0.0.0.0 pour Docker
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Backend lancé sur le port ${PORT}`);
});
