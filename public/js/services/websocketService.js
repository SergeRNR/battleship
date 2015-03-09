'use strict';
var angular = require('angular'),
    _ = require('underscore');

angular.module('bsApp')
.service('WebsocketService', function () {
    var wsConfig = {
        url: location.href.replace('http:', 'ws:').replace(location.port, '8002')
    };

    var _connection = null,
        _is_ready = false,
        _pull_events = [],
        _socket_interval,
        _old_send;

    var init = function () {
        if (_connection)
            return false;
        // if user is running mozilla then use it's built-in WebSocket
        window.WebSocket = window.WebSocket || window.MozWebSocket;

        // if browser doesn't support WebSocket, just show some notification and exit
        if (!window.WebSocket) {
            alert('Sorry, but your browser doesn\'t '
            + 'support WebSockets.');
            this._socket = false;
            return;
        }
        var url = wsConfig.url;
        _connection = new WebSocket(url);

        _old_send = _connection.send;
        _connection.send = _mySend;

        _connection.addEventListener('open', _onopen, false);
        _connection.addEventListener('error', _onerror, false);
        _connection.addEventListener('close', _onclose, false);
        //_connection.addEventListener('message', _onmessage, false);
    };

    var _mySend = function (data) {
        if (typeof data == 'object')
            data = JSON.stringify(data);

        _old_send.apply(_connection, [data]);
    };

    var _onopen = function () {
        console.log('Socket is open');
    };
    var _isOpened = function () {
        if (_connection.readyState == 1) {
            console.log('socket:onopen');
            return true;
        } else {
            return false;
        }
    };
    var _onmessage = function (message) {

    };
    var _onerror = function (error) {
        console.log('Sorry, but there\'s some problem with your connection or the server is down.');
    };
    var _onclose = function () {
        console.log('WS connection closed');
        _socket_interval = setTimeout(function () {
            _connection = null;
            init();
        }, 3000);
    };

    var getSocket = function () {
        return _connection;
    };

    this.init = init;
    this.getSocket = getSocket;
});