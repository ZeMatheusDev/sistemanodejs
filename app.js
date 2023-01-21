const express = require("express");
const app = express();
const handlebars = require ('express-handlebars');
const bodyParser = require('body-parser')
const Usuario = require('./models/Usuario')
const Servico = require('./models/Servico')
const Usuario_servico = require('./models/Usuario_servico')
var dadosDaConta = []; // variavel que armazenara os dados da conta apos fazer o login

app.use(express.static(__dirname + '/public')); // salvando o caminho da pasta public

//definindo o template principal do handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main', helpers:{
    ifAdmin: function(a, b, opts){
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        } 
    },
    ifService: function(a, b, opts){
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        } 
    }
}}));
app.set('view engine', 'handlebars')
//final do handlebars

//body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//final do body-parser

//definindo rotas
app.get('/cadastro', function(req, res){
    res.render('cadastro', {dadosDaConta: dadosDaConta})
})

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
                res.render('home', {dadosDaConta: dadosDaConta})
            }).catch(function(){
                res.send('Erro ao criar o usuario')
            })
        }
        else{
            res.render('home', {dadosDaConta: dadosDaConta})

        }
    });
})

app.post('/iniciar', async function(req, res){
    var now = Date.now();
    var date = new Date(now);
    var horas = date.getHours();
    var minutes = date.getMinutes();
    if(minutes < 10){
        minutes = '0'+minutes;
    }
    minutosFinais = horas + ':' + minutes; 
    Usuario_servico.update({iniciado: 1, minutosAtuais: minutosFinais}, {where: {id: req.body.id}});
    res.render('home', {dadosDaConta:dadosDaConta})
})

app.post('/parar', async function(req, res){
    var horasAtuais;    
    await Usuario_servico.findOne({where: {id: req.body.id}}).then(function(val){
        horasAtuais = val.dataValues.minutosAtuais;
    })
    separacao = horasAtuais.split(':');
    minutosDasHoras = parseInt(separacao[0]*60) + parseInt(separacao[1]);
    var now = Date.now();
    var date = new Date(now);
    var horas = date.getHours();
    var minutes = date.getMinutes();
    if(minutes < 10){
        minutes = '0'+minutes;
    }
    minutosFinais = horas + ':' + minutes; 
    separacao = minutosFinais.split(':');
    minutosDasHorasAtuais = parseInt(separacao[0] * 60) + parseInt(separacao[1]);
    subtracaoDeMinutos = minutosDasHorasAtuais - minutosDasHoras;
    transformacaoHoras = parseInt(subtracaoDeMinutos/60);
    if(transformacaoHoras < 10){
        transformacaoHoras = '0'+transformacaoHoras;
    }
    transformacaoMin = parseInt(subtracaoDeMinutos%60);
    if(transformacaoMin < 10){
        transformacaoMin = '0'+transformacaoMin;
    }
    transformacaoFinal = transformacaoHoras + ':' + transformacaoMin;
    Usuario_servico.update({iniciado: 0, minutosAtuais: minutosFinais, minutosFinais: transformacaoFinal}, {where: {id: req.body.id}});
    res.render('home', {dadosDaConta:dadosDaConta})
})

app.post('/contratar', async function(req, res){
    var valorFinal;
    Usuario_servico.create({
        usuario_id: dadosDaConta.id,
        servico_id: req.body.id,
        iniciado: null,
        minutosAtuais: null,
        minutosFinais: null,
        loginUsuario: dadosDaConta.login,
        comissao: req.body.comissao,
    })
        value = await Usuario.findOne({where: {id: dadosDaConta.id}}).then(function(data){
            const usuarioSelecionado = data.dataValues;
            valorInicial = parseInt(usuarioSelecionado.valorTotal)+ parseInt(req.body.preco);
            valorFinal = valorInicial;
        })
    Usuario.update({valorTotal: valorFinal}, {where: {id: dadosDaConta.id}})
    dadosDaConta.valorTotal = valorFinal;
    res.render('home', {dadosDaConta: dadosDaConta})

})

app.get('/', function(req, res){
    res.render('home', {dadosDaConta: dadosDaConta})
})

app.get('/admin', async function(req, res){
    await Usuario_servico.findAll().then(async function(dados){
        res.render('admin', {dados: dados, dadosDaConta: dadosDaConta})
    })
})

app.get('/servicos', function(req, res){
    Servico.findAll().then(function(servicos){
        console.log(servicos)
        res.render('servico', {servicos:servicos, dadosDaConta: dadosDaConta})
    });
})

app.get('/deslogar', function(req, res){
    dadosDaConta = [];
    res.render('home', {dadosDaConta: dadosDaConta})
})

app.post('/logar', async function(req, res){
    const login = req.body.login;
    const senha = req.body.senha;
    await Usuario.findAll().then(async function(dados){
        Object.values(dados).forEach(async val => {
            if(val['login'] == login){
                dadosDaConta = val.dataValues;
            }
        })
    });
    res.redirect('./')
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
// final de rotas

module.exports = app

app.listen(80, function(){
    console.log('Servidor funcionando...')
});

