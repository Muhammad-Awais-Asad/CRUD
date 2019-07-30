var mysql = require('mysql');
var express = require('express');
var app = express ();
var bodyParser = require("body-parser");
var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

  app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

app.get("/api/books", function(req, resp)
{
	console.log("Getting request at /api/books")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});		 
	 con.connect(function(err) {
		if (err) throw err;
			con.query("SELECT * FROM bookstb", function (err, result, fields) {
			if (err) throw err;
			resp.json(result);
		});
	});

})

app.post("/api/book/", function(req, resp, next) {

	console.log("Getting request at /api/addbooks")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});

	con.connect(function(err) {
		var jsondata = req.body;
		console.log(jsondata);
		var query = "INSERT INTO bookstb (number, title, description, author, price) VALUES ('"+jsondata.number+"', '"+jsondata.title+"', '"+jsondata.description+"', '"+jsondata.author+"', '"+jsondata.price+"')";
		console.log(query);
		con.query(query, function (err, result, fields) {
			if (err) throw err;
			resp.json({"success" : err ? false : true});
		});
	});

});



app.delete("/api/book/:id", function(req, resp, next) {

	console.log("Getting request at /api/book-delete")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});

	con.connect(function(err) {
		var ID = req.params.id;
		console.log("id=", ID);
		var query = "DELETE FROM bookstb WHERE id = '"+ID+"' " ;
		console.log(query);
		con.query(query, function (err, result, fields) {
			if (err) throw err;
			resp.json({"success" : err ? false : true});
		});
	});

});

app.get("/api/book/:id", function(req, resp, next) {

	console.log("Getting request at /api/book-edit")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});
	con.connect(function(err) {
		var ID = req.params.id;
		console.log("id=", ID);
		var query = "SELECT * FROM bookstb WHERE id = '"+ID+"' " ;
		console.log(query);
		con.query(query, function (err, result, fields) {
			if (err) throw err;
			resp.json(result[0]);
		});
	});

});


app.put("/api/book/", function(req, resp, next) {

	console.log("Getting request at /api/book-update")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});

	con.connect(function(err) {
		var jsondata = req.body;
		console.log(jsondata);
		var query = "UPDATE bookstb SET number = '"+jsondata.number+"' , title = '"+jsondata.title+"', description = '"+jsondata.description+"', author = '"+jsondata.author+"', price = '"+jsondata.price+"' WHERE id = '"+jsondata.id+"' ";
		console.log(query);
		con.query(query, function (err, result, fields) {
			if (err) throw err;
			resp.json({"success" : err ? false : true});
		});
	});

});

app.get("/api/book/:id", function(req, resp, next) {

	console.log("Getting request at /api/book-view")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});
	con.connect(function(err) {
		var ID = req.params.id;
		console.log("id=", ID);
		var query = "SELECT * FROM bookstb WHERE id = '"+ID+"' " ;
		console.log(query);
		con.query(query, function (err, result, fields) {
			if (err) throw err;
			resp.json(result[0]);
		});
	});

});

//code for users

app.get("/api/users", function(req, resp)
{
	console.log("Getting request at /api/users")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});		 
	 con.connect(function(err) {
		if (err) throw err;
			con.query("SELECT * FROM userstb", function (err, result, fields) {
			if (err) throw err;
			resp.json(result);
		});
	});

})

app.post("/api/user/", function(req, resp, next) {

	console.log("Getting request at /api/addusers")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});

	con.connect(function(err) {
		var jsondata = req.body;
		console.log(jsondata);
		var query = "INSERT INTO userstb (firstName, lastName, number, email, password, address) VALUES ('"+jsondata.firstName+"', '"+jsondata.lastName+"', '"+jsondata.number+"', '"+jsondata.email+"', '"+jsondata.password+"', '"+jsondata.address+"')";
		console.log(query);
		con.query(query, function (err, result, fields) {
			if (err) throw err;
			resp.json({"success" : err ? false : true});
		});
	});

});


app.delete("/api/user/:id", function(req, resp, next) {

	console.log("Getting request at /api/user-delete")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});

	con.connect(function(err) {
		var ID = req.params.id;
		console.log("id=", ID);
		var query = "DELETE FROM userstb WHERE id = '"+ID+"' " ;
		console.log(query);
		con.query(query, function (err, result, fields) {
			if (err) throw err;
			resp.json({"success" : err ? false : true});
		});
	});

});

app.get("/api/user/:id", function(req, resp, next) {

	console.log("Getting request at /api/user-edit")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});
	con.connect(function(err) {
		var ID = req.params.id;
		console.log("id=", ID);
		var query = "SELECT * FROM userstb WHERE id = '"+ID+"' " ;
		console.log(query);
		con.query(query, function (err, result, fields) {
			if (err) throw err;
			resp.json(result[0]);
		});
	});

});

app.put("/api/user/", function(req, resp, next) {

	console.log("Getting request at /api/user-update")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});

	con.connect(function(err) {
		var jsondata = req.body;
		console.log(jsondata);
		var query = "UPDATE userstb SET firstName = '"+jsondata.firstName+"' , lastName = '"+jsondata.lastName+"', number = '"+jsondata.number+"', email = '"+jsondata.email+"', password = '"+jsondata.password+"', address = '"+jsondata.address+"' WHERE id = '"+jsondata.id+"' ";
		console.log(query);
		con.query(query, function (err, result, fields) {
			if (err) throw err;
			resp.json({"success" : err ? false : true});
		});
	});

});

app.get("/api/user/:id", function(req, resp, next) {

	console.log("Getting request at /api/user-view")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});
	con.connect(function(err) {
		var ID = req.params.id;
		console.log("id=", ID);
		var query = "SELECT * FROM userstb WHERE id = '"+ID+"' " ;
		console.log(query);
		con.query(query, function (err, result, fields) {
			if (err) throw err;
			resp.json(result[0]);
		});
	});

});

//auth code

app.post("/auth/user/", function(req, resp, next) {

	console.log("Getting request at /auth/user")
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "booksdb",
	});
	con.connect(function(err) {
		var jsondata = req.body;
		console.log(jsondata);
		var query = "SELECT * FROM userstb WHERE email = '"+jsondata.email+"' AND password = '"+jsondata.password+"' " ;
		console.log(query);
		con.query(query, function (err, result, fields) {
			console.log(result);
			if (result.length > 0) {
				resp.json({"success" : true});
			} else {
				resp.json({"success" : false});
			}
			if (err) throw err;
		});
	});

});

app.listen(1337, function(){
	console.log("Server is ready to serve!");
});