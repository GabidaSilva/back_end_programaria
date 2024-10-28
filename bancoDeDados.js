const mongoose = require('mongoose')
require('dotenv').config()
async function conectaBancoDeDados(){
    try{
        console.log('Conectando ao banco de dados...')
    
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Conectado ao banco de dados!')
    }catch(erro){
        console.log(erro)
    }
}
    module.exports = conectaBancoDeDados
