
const Author = require('models/Author');

module.exports = {
    login: (req, res, next) => {
        if (request.method== "POST") {
            if(req.body.email && req.body.password) {
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
                }
            } else {
            res.render('layouts/login.hbs')
            }
        }
    }
};