const express = require("express") //aqui estou iniciando o express
const req = require("express/lib/request")
const res = require("express/lib/response")
const router = express.Router() // aqui estou configurando a primeira parte da rota
const cors = require('cors')//aqui estou trazendo o pacote cors que permite consumir essa api no front-end

const conectaBancoDeDados = require('./bancoDeDados') //aqui estou ligando ao arquivo BD
conectaBancoDeDados()//aqui estou chamando a funcão que conecta o BD

const Mulher = require('./mulherModel')

const app = express() // aqui estou iniciando o app
app.use(express.json())
app.use(cors())
const porta = 3333 // aqui estou criando a porta



//GET
async function mostraMulheres(request, response){
    try {
        const mulheresVindasDoBancoDados = await Mulher.find()
        response.json(mulheresVindasDoBancoDados)
    } catch (error) {
        console.log(error)
    }
    
}
//POST
async function criaMulher(request, response){
    const novaMulher = new Mulher({
        
        nome: request.body.nome,
        imagem: request.body.imagem,
        citacao: request.body.citacao,
        minibio: request.body.minibio
    })
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (error) {
        console.log(error)
    }
}
//PATCH
async function corrigeMulher(request, response){
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id)
        if(request.body.nome){
            mulherEncontrada.nome = request.body.nome;
        }
        if(request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem;
        }
        if(request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio;
        }
        if (request.body.citacao){
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaBancoDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaBancoDados)

    } catch (error) {
        console.log(error)
    }
}

//DELETE
async function deletaMulher(request, response){
    try {
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: 'Mulher deletada com sucesso!'})  
    } catch (error) {
        console.log(error)
    }
}


app.use(router.get('/mulheres', mostraMulheres)) // configuracao rota GET/mulheres
app.use(router.post('/mulheres', criaMulher)) // configurei rota post/mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configurei rota PATCH/mulheres/:id
app.use(router.delete('/mulheres/:id',deletaMulher)) // configurei rota DELETE/mulheres/:id


//PORTA
function mostraPorta(){
    console.log('Servidor criado e rodando na porta ' + porta)
}

app.listen(porta, mostraPorta) // Servidor ouvindo a porta