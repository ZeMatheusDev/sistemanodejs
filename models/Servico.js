const db = require('./db')

// modelando a tabela usuario
const Servico = db.sequelize.define('servico',{
    nome:{
        type: db.Sequelize.STRING
    },
    profissional:{
        type: db.Sequelize.STRING
    },
    preco:{
        type: db.Sequelize.STRING
    },
    comissao:{
        type: db.Sequelize.STRING
    },
}, {tableName: 'servico'})

module.exports = Servico