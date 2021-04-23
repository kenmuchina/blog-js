
const Article = require('../models/Article');

module.exports = {
 index : function (req, res, next){
    // do authorization
    //if not authorization or there is error
    // return next(error)
    // if authorization and no errors
    // query database
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
 }
}



