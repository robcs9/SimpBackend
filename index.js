const express = require('express');
const app = express();
const urlencodedParser = require('body-parser').urlencoded({extended: false});
const port = 5000;
const Sequelize = require('sequelize');
const sequelize = new Sequelize('marketplace', 'breshopp', 'breshopp', {
    host: 'localhost',
    dialect: 'mysql'
});
//app.use('/print', );

sequelize.authenticate().then(
    () => console.log('Conectado ao BD')
).catch(
    (e) => console.log(`Erro: ${e}`)
);

const Administrador = sequelize.define('administrador', {
    nome: {
        type: Sequelize.STRING
    },
    sobrenome: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING(50)
    },
    senha: {
        type: Sequelize.STRING(32)
    },
    nivel: { // nível de acesso
        type: Sequelize.INTEGER
    },
    foto: {
        type: Sequelize.STRING
    },
    ativo: {
        type: Sequelize.BOOLEAN
    } 
}, {freezeTableName: true});

sequelize.sync().then(
    () => console.log('Sincronizado com o BD')
).catch(
    (e) => console.log(`Erro: ${e}`)
)

app.get('/print', (req, res) => {
    Administrador.sync().then(
        Administrador.findAll().then(
            (r) => {
                res.json({ "data": r });
            }
        )
    )
});

app.post('/add', urlencodedParser, (req, res) => {
    Administrador.create({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        email: req.body.email,
        senha: req.body.senha,
        nivel: req.body.nivel,
        foto: req.body.foto,
        ativo: req.body.ativo,
    });
    res.redirect('/print');
});

app.get('/recreate', (req, res) => {
   Administrador.sync({force: true}).then(
       () => console.log("Tabela administrador recriada.") 
   ).catch(
       (e) => console.log(`Erro: ${e}`)
   ); 
});

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));