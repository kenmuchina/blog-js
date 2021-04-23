
const Article = require('models/Article');


//module.exports = {
// newarticle : function (req, res, next){
//    if (req.method == 'POST'){
//        Models.Article.save({url = req.body.url ,title = req.body.title, content = req.body.content}, function(err)//{
//            if (err) { 
//                res.status(200).send("Error detected when saving!!!");
//            } else {
//                console.log('Saved Successfully!!!');
//            }
//            
//            res.redirect( '/')
//        });
//    } else {
//        res.render('article_new.pug')
//    }
// }
//};

module.exports = {
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
}


