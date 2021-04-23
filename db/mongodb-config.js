var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://kennie:kennieuser@cluster0.9y806.mongodb.net/blogjs?retyWrites=true&w=majority", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
);
mongoose.connection.on('open', function(){
    console.log("Mongoose connected successfully!");
});

  
