var express = require("express");
var app = express();
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var Book = require("./models/book");


// APP CONFIG
mongoose.Promise = global.Promise; 
mongoose.connect("mongodb://localhost/bookabulary");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// APP ROUTES

// Root route- the main page of the app.
app.get("/", function(req, res){
    res.render("main");
});

// Index route - display all books.

app.get("/books", function(req, res){
    // get all boks from DB
    Book.find({}, function(err, allBooks){
        if(err){
            console.log(err);
        } else {
            res.render("index", {books: allBooks});
        }
    });
});

// new route - show new book form where user can create a new book.

app.get("/books/new", function(req, res){
    res.render("new");
});














app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started!");
})