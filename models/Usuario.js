const db = require('./db')

// modelando a tabela usuario
const Usuario = db.sequelize.define('usuario',{
    login:{
        type: db.Sequelize.STRING
    },
    senha:{
        type: db.Sequelize.STRING
    },
    valorTotal:{
        type: db.Sequelize.STRING
    },
    admin:{
        type: db.Sequelize.BOOLEAN
    },
}, {tableName: 'usuario'})

module.exports = Usuario