const express = require("express");
const nedb = require("nedb");
const path = require("path");
const bodyParser = require("body-parser");

const App = express();

// settings for App
App.set("views", path.join(__dirname, "views"));
App.set("view engine", "ejs")
App.use(express.static("./views"));
App.use(bodyParser.urlencoded({extended: true}));

const database = new nedb("./database/database.db");
database.loadDatabase();

// port and server
const port = 3000
const server = "0.0.0.0"

// Listen to 0.0.0.0:3000
App.listen(port, server, () => {
	console.log(`Listening to ${server}:${port}`);
})

// Index
App.get("/", (req, res) => {
	database.find({}, function (err, list) {
		let quote_num = list[Math.floor(Math.random() * list.length)];
		res.render("public/index.ejs", {
			quote: quote_num.quote, person_quote: quote_num.person_quote
		});
	})
})


// Add Quote
App.get("/addQuote", (req, res) => {
	res.render("public/addQuote.ejs")
})

App.post("/submitQuote", (req, res) => {
	database.insert({
		quote: req.body.quote,
		person_quote: req.body.person_quote
	})
	res.redirect("http://" + server + ":" + port + "/");
})

// Random Quote
App.get("/randomQuote", (req, res) => {
	database.find({}, function (err, list) {
		let quote_num = list[Math.floor(Math.random() * list.length)];
		res.render("public/randomQuote.ejs", {
			quote: quote_num.quote, person_quote: quote_num.person_quote
		});
	})
});
