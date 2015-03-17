'use strict';
module.exports = function (server) {
    var io = require('socket.io')(server);
    io.on('connection', function(socket){

        console.log('Client *** ', socket.id, ' *** is connected');

        socket.on('my_hit', function (data) {
            console.log('Hit the', data.code, 'cell');
            io.emit('hit', {code: data.code})
        });
    });
    return io;
};