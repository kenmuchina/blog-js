const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var AuthorSchema = new Schema({
    firstname: {type: String, required: true},
    secondname: {type: String, required: true},
    email: {type: String, required: true},
    contact: {type: Number, required: true},
    password: {type: String, required: true},
    field: {type: String},
    profile: {type: String},
    about: {type: String}
});

AuthorSchema.virtual('fullname').get(function(fullname){
    return this.firstname + '' + this.lastname;
})
.set(function(fullname){
    var parts = fullname.split('');
    this.firstname = parts[0];
    this.lastname = parts[1];
});

AuthorSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Author', AuthorSchema);

/*
var bcryptjs = require('bcryptjs');
module.exports.createAuthor = (newAuthor, callback) => {
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newAuthor.password, salt, (error, hash) => {
            // store the hashed password
            const newAuthorResource = newAuthor;
            newAuthorResource.password = hash;
            newAuthorResource.save(callback);
        });
    });
};

module.exports.getAuthorByEmail = (email, callback) => {
    const email = { email };
    Author.findOne(email, author);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) {
            isMatch = false
        } else {
            isMatch = true
        }
        return isMatch
    });
};
*/
