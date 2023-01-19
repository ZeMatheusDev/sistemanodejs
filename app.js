const express = require("express");
const app = express();
const handlebars = require ('express-handlebars');
const Sequelize = require('sequelize');

app.use(express.static(__dirname + '/public')); // salvando o caminho da pasta public

//definindo o template principal do handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

//conexao com o banco
const sequelize = new Sequelize('sistema', 'root', '',{
    host: "localhost",
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

app.get('/cadastro', function(req, res){
    res.render(`cadastro`);
})

app.listen(80, function(){
    console.log('Servidor funcionando...')
});

