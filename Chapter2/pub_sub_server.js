const events = require('events');
const net = require('net');
const channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};
channel.on('join', function(id, client){
    this.clients[id] = client;
    this.subscriptions[id] = (senderId, message) => {
        if (id != senderId){
            this.clients[id].write(message);
        }
    };
    this.on('broadcast', this.subscriptions[id])
});

channel.on('leave', function(id){
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, `${id} has left the chatroom.\n`)
});

channel.on('shutdown', () => {
    channel.emit('broadcast', '', 'The server has shutdown\n');
    channel.removeAllListeners('broadcast')
});

channel.on('error', err => {
    console.log(`Error: ${err.message}`)
});

const server = net.createServer(client => {
    const id = `${client.remoteAddress}:${client.remotePort}`;
    channel.emit('join', id, client);
    client.on('data', data => {
        data = data.toString();
        if (data === 'shutdown\r\n'){
            channel.emit('shutdown');
        }else if(data === 'error\r\n'){
            channel.emit('error', new Error('Something went wrong!'));
        }
        channel.emit('broadcast', id, data);
    });
    client.on('close', ()=>{
        channel.emit('leave', id);
    })
});

server.listen(8888)