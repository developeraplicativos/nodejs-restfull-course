module.exports = {
    user:(app, req, res) => { 
        req.assert('name', 'O nome é obrigatório').notEmpty();
        req.assert('email', 'O email esta invalido').notEmpty().isEmail();

        let erros = req.validationErrors();

        if(erros){
            app.utils.erros.send(erros, req, res); 
            return false;
        } else {
            return true;
        }
    }
}