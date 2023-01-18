const express = require("express");
const app = express();

app.get('/', function(req, res){
    res.sendFile(__dirname + "/html/index.html");
})

app.get("/sobre/:nome", function(req, res){
    res.send('minha pagina sobre...'+req.params.nome);
})

app.listen(80, function(){
    console.log('Servidor funcionando...')
});

