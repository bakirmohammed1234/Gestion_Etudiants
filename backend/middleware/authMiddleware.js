const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Récupérer le token du header (Format: "Bearer <token>")
    const tokenHeader = req.header('Authorization');

    if (!tokenHeader) {
        return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
    }

    try {
        // On enlève le mot "Bearer " pour garder juste le token
        const token = tokenHeader.split(' ')[1];
        
        // 2. Vérifier le token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // On ajoute les infos du user à la requête
        next(); // On passe à la suite
    } catch (err) {
        res.status(400).json({ message: "Token invalide" });
    }
};