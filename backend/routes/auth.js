const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// INSCRIPTION (Utile pour créer ton premier admin)
router.post('/register', async (req, res) => {
    try {
        // Hash du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Création user
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN (Celui utilisé par ton Login.tsx)
router.post('/login', async (req, res) => {
    try {
        // 1. Vérifier si l'email existe
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        // 2. Vérifier le mot de passe
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Mot de passe incorrect" });

        // 3. Créer le Token JWT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // 4. Répondre au Frontend (Token + Info User)
        res.header('auth-token', token).json({ 
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;