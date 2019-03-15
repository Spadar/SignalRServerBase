load_code("SignalR");
game_log("Starting");
class ALHub{
	constructor(url, hubname){
		this.url = url;
		this.hubname = hubname;
		
		this.Connect(url, hubname);
		
	}
	
	Connect(){
		let connection = $.hubConnection();
		connection.url = this.url;
		let hubClass = this;
		
		this.Proxy = connection.createHubProxy(this.hubname);
		
		connection.start().done(function() {
			game_log("Connected");
			hubClass.connected = true;
			connection.disconnected(function(){
				hubClass.connected = false;
				game_log("Disconnected, reconnecting...");
				setTimeout(function(){hubClass.Connect();}, 2500);
			});
			connection.reconnecting(function(){
				hubClass.connected = false;
				game_log("Lost connection to server... Waiting for response...");
			});
		}).fail(function(){
			hubClass.connected = false;
			game_log('Could not Connect!');
			setTimeout(function(){hubClass.Connect();}, 2500); 
		});
	}
}

let hub = new ALHub('http://localhost:8080/signalr', 'signalRServiceHub');

let lastPing;
hub.Proxy.on('Pong', function (message) {
    game_log("Server responded in " + (new Date() - lastPing) + "ms.");
    lastPing = null;
});

setInterval(function () {
    if (hub.connected) {
        if (lastPing == null) {
            hub.Proxy.invoke('Ping');
            lastPing = new Date();
        }
    }
}, 40);
