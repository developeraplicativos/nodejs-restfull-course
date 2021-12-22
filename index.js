const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(bodyParser.json());

consign().include('routes').include('utils').into(app);
// let routerIndex = require('./routes/index.js');
// let routerUsers = require('./routes/users.js');

// app.use(routerIndex);
// app.use('/users',routerUsers);

app.listen(3000, '127.0.0.1', () => {
    console.log(`servidor esta rodando`);
});
/*
const http = require('http');
const { text } = require('stream/consumers');

let server = http.createServer((req, resp) => {
    console.log('requerido :', req.url);
    console.log('method :', req.method);
    switch (req.url) {
        case '/index': 
            resp.getHeader('content-type','html/text')
            resp.statusCode = 200;
            resp.end( 'sou D+'); 
            break;
    
        case '/users': 
            resp.getHeader('content-type','application/json')
            resp.statusCode = 200;
            resp.end( JSON.stringify({
                users : [{
                    name: 'Emerson'
                }]
            }) ); 
            break;
    
        default:
            resp.getHeader('content-type','html/text')
            resp.statusCode = 200;
            resp.end( 'resposta padrão --'); 
            break;
    } 
});
server.listen(3000, '127.0.0.1', () => {
    console.log(`servidor esta rodando`);
}); */