const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cvSchema = new Schema({
    nom: {
        type: String,
        requried: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numeroDeTelephone: {
        type: String,
        required: true
    },
    poste: {
        type: String,
        required: true
    },
    cv: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('CV', cvSchema);