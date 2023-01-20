const db = require('./db')

// modelando a tabela usuario
const Usuario_servico = db.sequelize.define('usuario_servico',{
    usuario_id:{
        type: db.Sequelize.STRING
    },
    servico_id:{
        type: db.Sequelize.STRING
    },
    iniciado:{
        type: db.Sequelize.BOOLEAN
    },
    minutosAtuais:{
        type: db.Sequelize.STRING
    },
    minutosFinais:{
        type: db.Sequelize.STRING
    },
    loginUsuario:{
        type: db.Sequelize.STRING
    },
    comissao:{
        type: db.Sequelize.STRING
    },
}, {tableName: 'usuario_servico'})

module.exports = Usuario_servico