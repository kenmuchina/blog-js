
const Author = require('models/Author');

module.exports = {
    newauthor: (req, res) => {
        if (request.method== "POST") {
            const firstname = req.body.firstname
            const secondname = req.body.secondname
            const email = req.body.email
            const contact = req.body.contact
            const password = req.body.password
            const field = req.body.field
            const profile = req.body.profile
            const about = req.body.profile
            
            Author.register(firstname, secondname, email, contact, password, field, profile,  about);
            
            res.redirect('/authors/login');
        } else {
            res.render('layouts/signup.hbs')
        }
    }
};