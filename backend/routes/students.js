const router = require('express').Router();
const Student = require('../models/Student');
const verifyToken = require('../middleware/authMiddleware'); // Protection

// Récupérer tous les étudiants (GET /api/students)
router.get('/', verifyToken, async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 }); // Plus récents en premier
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Récupérer UN étudiant par ID (GET /api/students/:id)
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if(!student) return res.status(404).json({ message: "Étudiant introuvable" });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Créer un étudiant (POST /api/students)
router.post('/', verifyToken, async (req, res) => {
    const newStudent = new Student(req.body); // req.body contient firstName, lastName, etc.
    try {
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mettre à jour un étudiant (PUT /api/students/:id)
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Renvoie la version modifiée
        );
        res.json(updatedStudent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Supprimer un étudiant (DELETE /api/students/:id)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Étudiant supprimé !" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;