const Sequelize = require('sequelize');

//conexao com o banco
const sequelize = new Sequelize('sistema', 'root', '',{
    host: "localhost",
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}