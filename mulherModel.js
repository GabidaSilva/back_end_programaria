const mongoose = require('mongoose')
const MulherSchema = new mongoose.Schema({
    nome: {
        type: String, 
        required: true}, // nome: String,
    imagem: {
        type: String, 
        required: true}, // imagem: String,
    citacao: {
        type: String, 
        required: true}, // citacao: String
    minibio: {
        type: String, 
        required: true}, // minibio: String
})

module.exports = mongoose.model('diva', MulherSchema)
