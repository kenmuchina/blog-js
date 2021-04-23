
const Article = require('/models/Article.js');

module.exports = {
 article : function (req, res, next){
    // do authorization
    // if not authorization or there is error
    // return next(error)
    // if authorization and no errors
    // query database; 
    // res.statusCode = 200;
    // res.setHeader('Content-Type: 'text/plain');
    // res.send();
    // res.json();
    article_url = req.params.articleurl
    Article.findOne({url=ariticle_url}, function(err, article){
        
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
 }
};


