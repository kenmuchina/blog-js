
const Author = require('../models/Author');

module.exports = {
    index : function (req, res, next){
        // res.statusCode = 200;
        // res.setHeader('Content-Type: 'text/plain');
        // res.send();
        // res.json();
        Article.find({ limit: 2,sort: { 'timestamp': -1 }}).toArray(function (err, articles) {
            if (err) {
                console.log(err);
            }
            res.render( 'index.hbs', articles);
        });
    },
    login: (req, res, next) => {
        if (request.method== "POST") {
            if (req.body.email && req.body.password) {
                const email = req.body.email
                const password = req.body.password
                Author.getAuthor(email, (error, author) => {
                    if (error) {
                        console.log("An error occurred while registering author. Please try again later.");
                    } else {
                        Author.comparePassword(password, author.password, (isMatch) => {
                            if (isMatch) {
                                const payload = { id: user.id };
                                const token = jwt.sign(payload, jwtOptions.secretOkay);
                                res.redirect('/article_new.hbs', {payload: payload, token: token });
                            } else {
                                res.json({message: "The password is incorrect."});
                                // return new Error("The password is incorrect.");
                            }
                        });
                    };
                });
            } else {
                res.render('layouts/login.hbs')
            }
        }
    },
    article : function (req, res, next){
        url = req.params.articleurl
        Article.findOne({url}, function(err, article){
            
            if(article) {
                articleObj = new Object();
                articleObj.title = article.title;
                articleObj.timestamp = article.timestamp;
                articleObj.content = article.content;
                res.render( 'article.hbs', articleObj);
            } else {
                console.log(err);
            }
        });
    },
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
    newarticle : function (req, res) {
        if (req.method == 'POST') {
                var newArticle = {
                    "url" : req.body.url,
                    "title" : req.body.title,
                    "content" : req.body.content
                };
                
                newArticle = new Article();
                
                newArticle.save((error) => {
                    if (error) {
                        res.status(400).send(err);
                    } else {
                        console.log("Saved sucessfully!!!");
                    }
                });
                
                res.redirect('index.hbs');
            
        } else {
            res.render('/article_new.hbs')
        }
    },
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