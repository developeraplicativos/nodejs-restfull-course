// const express = require('express');
// let routes = express.Router();

// routes.get('/', (req, res) => {
//     res.statusCode = 200;
//     res.getHeader('content-type','html/text')
//     res.end( 'sou D+'); 
// });

// module.exports = routes;


module.exports = (app) => {
    app.get('/', (req, res) => {
        res.statusCode = 200;
        res.getHeader('content-type','html/text')
        res.end( 'sou D+'); 
    });
};