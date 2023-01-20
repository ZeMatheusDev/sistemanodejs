const express = require("express");
const app = express();
const handlebars = require ('express-handlebars');
const bodyParser = require('body-parser')
const Usuario = require('./models/Usuario')
const session = require('express-session')
const flash = require('connect-flash')
var sessao =[];

//sessão
app.use(session({
    secret: 'hidhudwhqdhubbcx2',
    resave: true,
    saveUninitialized: true,
    secure:false,
    cookie: {nome: 'matheus'}
}))

app.use(express.static(__dirname + '/public')); // salvando o caminho da pasta public

//definindo o template principal do handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

//body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//definindo rotas
app.get('/cadastro', function(req, res){
    console.log(sessao);
    res.render(`cadastro`);
})

//cadastro de usuario verificando se existe o login enviado
app.post('/cadastrar', function(req, res){
    const login = req.body.login;
    const senha = req.body.senha;
    var existe = false;
    Usuario.findAll().then(function(dados){
        Object.values(dados).forEach(val =>{
            if(val['login'] == login){
                existe = true;
            }
        })   
        if(existe == false){  
            Usuario.create({
                login: login,
                senha: senha,
                valorTotal: 0,
                admin: 0
            }).then(function(){
                res.redirect('./login');
            }).catch(function(){
                res.send('Erro ao criar o usuario')
            })
        }
        else{
            res.redirect('./');
        }
    });
})



app.get('/', function(req, res){
    console.log(sessao);
    res.render('home', {sessao: sessao})
})

app.post('/logar', function(req, res){
    const login = req.body.login;
    const senha = req.body.senha;
    Usuario.findAll().then(function(dados){
        Object.values(dados).forEach(val => {
            if(val['login'] == login){
                sessao = val.dataValues;
            }
        })
    });
    res.redirect('./cadastro');
})

app.get('/login', function(req, res){
        res.render(`login`);
})

app.get('/deletar/:id', function(req, res){
    Usuario.destroy({where: {'id': req.params.id}}).then(function(){
        res.send('deletado com sucesso')
    }).catch(function(erro){
        res.send('erro' + erro)
    })
})


app.listen(80, function(){
    console.log('Servidor funcionando...')
});

