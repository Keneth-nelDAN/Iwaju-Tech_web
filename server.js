var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html')
})//ouverture du fichier index.html
io.on('connection', function(socket){
    console.log("Un utilisateur vient de se connecté")
    socket.on('disconnect', function(){
        console.log("Un utilisateur vient de se déconnecté")
    })
    socket.on('messages', function(message){
        console.log('Message reçu');
        io.emit('messages', message);//Renvoie du message au client
    })//écoute des messages
})//socket.io écoute les connexions et déconnexions et affiche un message
http.listen(3000, function(){
    console.log("Le serveur écoute le port 3000")
})//écoute du port 3000 avec message de confirmation dans la console