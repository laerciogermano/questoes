'use strict';

const express        = require('express');
const expressSession = require('express-session');
const mongoStore     = require('connect-mongo')(expressSession);
const mongoose       = require('mongoose');
const app            = express();

// Inicia conexão com o banco de dados MongoDB
const db = mongoose.connect('mongodb://127.0.0.1/sample', function(err){

    // Caso aconteça algum erro na conexao, interrompe o fluxo
    if(err) throw new Error(err.message);

    // Configura instância session
    const session = configureSession(db, {
        secret: 'sample',
        collection: 'sample',
        cookie: 'sample',
        name: 'sample.sid'
    });

    // Adiciona middleware a instância express do projeto
    app.use(session);

    console.log('ok!');

    /**
        Desafio: Utilizar a instância app já configurada nos controladores
        em arquivos diferentes para o uso de sessão
        ex:

        app.get('/qualquercoisa', function(req, res){
            req.session.user = 'nomeDoUsuario';   <---
        });

     **/
});

function configureSession(db, config){
    return expressSession({
        secret: config.secret,
        store: new mongoStore({
            mongooseConnection: db.connection,
            collection: config.collection
        }),
        cookie: config.cookie,
        name: config.name,
        resave: true,
        saveUninitialized: true
    });
}

    
