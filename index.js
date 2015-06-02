var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var Moniker = require('moniker');
var port = process.env.PORT || 5000;

//routes 
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public/index.html'))
app.use(express.static(__dirname + '/public/games.html'))
app.use(express.static(__dirname + '/public/animal.html'))




server.listen(port);

// socket.io
io.sockets.on('connection', function(socket) {
    var user = addUser();
    updateWidth();
    socket.emit("welcome", user);
    socket.on('disconnect', function() {
        removeUser(user);
    });
	socket.on("cat", function() {
	dogValue = 0;
	cowValue = 0;
	pigValue = 0;
	sheepValue = 0;
	birdValue = 0;
	duckValue = 0;
        catValue = 1;
        user.clicks += 1;
        if (catValue == 1) {
       
            var hero = 'images/cat.png'
            io.sockets.emit("win", {
                message: "<img src=" + hero + " />"
            });
        } 
        updateUsers();
    });
	
	socket.on("dog", function() {
	cowValue = 0;
	pigValue = 0;
	sheepValue = 0;
	birdValue = 0;
	duckValue = 0;
        catValue = 0;	
        dogValue = 1;
        user.clicks += 1;
        if (dogValue == 1) {
       
            var hero = 'images/dog.png'
            io.sockets.emit("win", {
                message: "<img src=" + hero + " />"
            });
        } 
        updateUsers();
    });
		socket.on("cow", function() {
	cowValue = 1;
	pigValue = 0;
	sheepValue = 0;
	birdValue = 0;
	duckValue = 0;
        catValue = 0;	
        dogValue = 0;
        user.clicks += 1;
        if (cowValue == 1) {
       
            var hero = 'images/cow.png'
            io.sockets.emit("win", {
                message: "<img src=" + hero + " />"
            });
        } 
        updateUsers();
    });
		socket.on("duck", function() {
	cowValue = 0;
	pigValue = 0;
	sheepValue = 0;
	birdValue = 0;
	duckValue = 1;
        catValue = 0;	
        dogValue = 0;
        user.clicks += 1;
        if (duckValue == 1) {
       
            var hero = 'images/duck.png'
            io.sockets.emit("win", {
                message: "<img src=" + hero + " />"
            });
        } 
        updateUsers();
    });
		socket.on("bird", function() {
	cowValue = 0;
	pigValue = 0;
	sheepValue = 0;
	birdValue = 1;
	duckValue = 0;
        catValue = 0;	
        dogValue = 0;
        user.clicks += 1;
        if (birdValue == 1) {
       
            var hero = 'images/bird.png'
            io.sockets.emit("win", {
                message: "<img src=" + hero + " />"
            });
        } 
        updateUsers();
    });
		
		socket.on("pig", function() {
	cowValue = 0;
	pigValue = 1;
	sheepValue = 0;
	birdValue = 0;
	duckValue = 0;
        catValue = 0;	
        dogValue = 0;
        user.clicks += 1;
        if (pigValue == 1) {
       
            var hero = 'images/pig.png'
            io.sockets.emit("win", {
                message: "<img src=" + hero + " />"
            });
        } 
        updateUsers();
    });
		socket.on("sheep", function() {
	cowValue = 0;
	pigValue = 0;
	sheepValue = 1;
	birdValue = 0;
	duckValue = 0;
        catValue = 0;	
        dogValue = 0;
        user.clicks += 1;
        if (sheepValue == 1) {
       
            var hero = 'images/sheep.png'
            io.sockets.emit("win", {
                message: "<img src=" + hero + " />"
            });
        } 
        updateUsers();
    });
		
		// color card functions
	socket.on("red", function() {
	redValue = 1;
	greenValue = 0;
        blueValue = 0;	
        yellowValue = 0;
        user.clicks += 1;
        if (redValue == 1) {
       
            var heroC = 'images/red.jpg'
            io.sockets.emit("colorz", {
                message: "<img src=" + heroC + " />"
            });
        } 
        updateUsers();
    });
	
		socket.on("green", function() {
	redValue = 0;
	greenValue = 1;
        blueValue = 0;	
        yellowValue = 0;
        user.clicks += 1;
        if (greenValue == 1) {
       
            var heroC = 'images/green.jpg'
            io.sockets.emit("colorz", {
                message: "<img src=" + heroC + " />"
            });
        } 
        updateUsers();
    });
			socket.on("blue", function() {
	redValue = 0;
	greenValue = 0;
        blueValue = 1;	
        yellowValue = 0;
        user.clicks += 1;
        if (blueValue == 1) {
       
            var heroC = 'images/blue.jpg'
            io.sockets.emit("colorz", {
                message: "<img src=" + heroC + " />"
            });
        } 
        updateUsers();
    });
		socket.on("yellow", function() {
	redValue = 0;
	greenValue = 0;
        blueValue = 0;	
        yellowValue = 1;
        user.clicks += 1;
        if (yellowValue == 1) {
       
            var heroC = 'images/yellow.jpg'
            io.sockets.emit("colorz", {
                message: "<img src=" + heroC + " />"
            });
        } 
        updateUsers();
    });
});
    
      


// game logic
var initialWidth = 1;
var currentWidth = initialWidth;
var winWidth = 2;

// color game
var redValue;
var greenValue;
var blueValue;
var yellowValue;

// animal game 
var dogValue;
var catValue;
var cowValue; 
var pigValue; 
var sheepValue; 
var birdValue;
var duckValue;
var users = [];

var curUser = function() {

}
var addUser = function() {
    var user = {
        name: Moniker.choose(),
        clicks: 0
    }
    users.push(user);
    updateUsers();
    return user;
}

var hideMe = function() {
    document.getElementById('users').style.visibility = "hidden";
}
var removeUser = function(user) {
    for (var i = 0; i < users.length; i++) {
        if (user.name === users[i].name) {
            users.splice(i, 1);
            updateUsers();
            return;
        }
    }
}
var updateUsers = function() {
    var str = '';
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        str += user.name + ' <small>(' + user.clicks + ' clicks)</small><br />';
    }
    io.sockets.emit("users", {
        users: str
    });
}
var updateWidth = function() {
    io.sockets.emit("update", {
        currentWidth: currentWidth
    });
}