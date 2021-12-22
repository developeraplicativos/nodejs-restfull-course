// const express = require('express');
// let routes = express.Router();

// routes.get('/', (req, res) => {
//     res.statusCode = 200;
//     res.getHeader('content-type','application/json')
//     res.json({
//         user: [{
//             name: 'alberto roberto',
//             email: 'alb@gmail.com',
//             id: 1
//         }]
//     }); 
// });

// routes.get('/json' , (req, res) => {
//     res.statusCode = 200;
//     res.getHeader('content-type','application/json');
//     res.json([{
//         super: {
//             nome: 'Emerson'
//         }
//     }])
// })
// module.exports = routes;

let NeDb = require('nedb');
let db = new NeDb({
    filename: 'users.db',
    autoload: true
})

module.exports = (app) => {
    let routes = app.route('/users');
    routes.get(  (req, res) => {
        // res.statusCode = 200;
        // res.getHeader('content-type','application/json')
        // res.json({
        //     user: [{
        //         name: 'alberto roberto',
        //         email: 'alb@gmail.com',
        //         id: 1
        //     }]
        // }); 
        db.find({}).sort({name: 1}).exec( (err, user) => {
            if(err){
                console.log(`erro: ${err}`);
                app.utils.erros.send(err, req, res); 
            }else{
                res.status(200).json(user);
            }
        });
    });
    let routeId = app.route('/users/:id');
    routeId.get( (req, res) => {
        // res.json({
        //     value: req.params.id
        // }); 
        db.find({_id: req.params.id}).exec( (err, user) => {
            if(err){
                app.utils.erros.send(err, req, res);
            }else{
                res.status(200).json(user);
            }
        });
    });
    routeId.put( (req, res) => { 

        if( !app.utils.validator.user( app, req, res)) return false;

        db.update({_id: req.params.id}, req.body, err => {
            if(err){
                app.utils.erros.send(err, req, res);
            }else{
                res.status(200).json( Object.assign( req.params, req.body));
            }
        });
    });
    routeId.delete( (req, res) => { 
        db.remove({_id: req.params.id}, err => {
            if(err){
                app.utils.erros.send(err, req, res);
            }else{
                res.status(200).json( 'removido com sucesso' );
            }
        });
    });

    routes.post( (req, res) => {
        // res.statusCode = 200;
        // res.getHeader('content-type','application/json');
        // res.json(req.body);
        if( !app.utils.validator.user( app, req, res) ) return false;

        db.insert(req.body, (err, user) => {
            if(err){
                console.log(`erro: ${err}`);
                app.utils.erros.send(err, req, res); 
            }else{
                res.status(200).json(user);
            }
        })
    })
};