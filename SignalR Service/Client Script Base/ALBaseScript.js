//Get jquery.signalR-2.3.0.js from the source project "Scripts" Folder. 
//Save as SignalR in AL. 
load_code("SignalR");

var connected = false;

$.connection.hub.url = 'http://localhost:8080/signalr';

var connection = $.hubConnection();

connection.url = 'http://localhost:8080/signalr';

var hubProxy = connection.createHubProxy('signalRServiceHub');

connection.start().done(function () {
    game_log("Connected");
    connected = true;
}).fail(function () {
    game_log('Could not Connect!');
});

var lastPing;
hubProxy.on('Pong', function (message) {
    game_log("Server responded in " + (new Date() - lastPing) + "ms.");
    lastPing = null;
});

setInterval(function () {
    if (connected) {
        if (lastPing == null) {
            hubProxy.invoke('Ping');
            lastPing = new Date();
        }
    }
}, 40);
