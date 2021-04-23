
const Article = require('models/article');

// Autharization and authenitication modules
// const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithSchema('jwt');
jwtOptions.secrectOrKey = 'thisisthesecretkey';


module.exports = {
    editarticle : function (req, res){ 
        if (req.method == 'POST'){
                // how will I know which ariticle.
                // Have a search bar query the database and returning a title that is submitted.
                // Since s/he is logged in, I can get his/her detail and use their email's to query
                email = req.user.email
                Article.findOneAndUpdate(email, {new: true})
                    .exec((err, article) =>  {
                        if (err) { 
                            res.status(400).send(err);
                        } else {
                            res.status(200).json(article.title);
                            res.redirect('/index.hbs');
                        }
                    });
        } else {
            res.render('/article_edit.hbs');
        }
    },
};