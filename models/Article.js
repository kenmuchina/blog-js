var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Author = ("./author.js");

ArticleSchema = new Schema({
    url: {type: String, required: true},
    // ref: {type: Author}
    title: {type: String, required: true},
    content: {type: String, required: true},
    timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Article', ArticleSchema);


