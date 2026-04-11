var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/autrespages'));

//Fonction trouver adresse IP locale
const os = require('os');

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName of Object.keys(interfaces)) {
        for (const iface of interfaces[interfaceName]) {
            // Filtre pour IPv4, non interne (exclut 127.0.0.1)
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1'; // Retourne localhost si aucune IP trouvée
}

        //console.log('Adresse IP locale :', getLocalIP());   
//Fin fonction trouver adresse IP locale

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

http.listen(3000, '0.0.0.0', function(){
    console.log("Le serveur écoute le port 3000")
    console.log("Accès distant à l'adresse: http://" + getLocalIP() + ":3000")
})//écoute du port 3000 avec message de confirmation dans la console
