'use strict';

const socketIo       = require('socket.io');
const shared         = require('express-socket.io-session');
const express        = require('express');
const expressSession = require('express-session');
const mongoStore     = require('connect-mongo')(expressSession);
const mongoose       = require('mongoose');
const app            = express();
const io             = socketIo(app.Server);

// Inicia conexão com o banco de dados MongoDB
const db = mongoose.connect('mongodb://45.32.168.136/sample', function(err){

    // Caso aconteça algum erro na conexao, interrompe o fluxo
    if(err) throw new Error(err.message);

    // Configura instância session
    const session = configureSession(db, {
        secret: 'sample',
        collection: 'sample',
        cookie: 'sample',
        name: 'sample.sid'
    });

    // Compartilha sessão do express (session) para a instância io do projeto
	io.use(shared(session, { autoSave:true }));

    console.log('ok!');


    /** 
     Desafio: Utilizar a instância io já configurada nos controladores
    em arquivos diferentes para o uso de sessão

    io.on('connection', function(socket){
        socket.handshake.session.userdata = userdata; <--
    });
     
    */

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

    
