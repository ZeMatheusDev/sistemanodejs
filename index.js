const express = require("express");
const app = express();

app.get('/', function(req, res){
    res.send('servidor em desenvolvimento...');
})

app.listen(80, function(){
    console.log('Servidor funcionando...')
});

