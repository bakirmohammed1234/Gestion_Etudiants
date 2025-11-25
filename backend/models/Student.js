const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateNaissance: { type: String, required: true }, // Ou Date
    gender: { type: String, required: true },
    studentNumber: { type: String, required: true, unique: true },
    filiere: { type: String, required: true },
    level: { type: String, required: true },
    annee: { type: Number, required: true },
    moyenne: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);