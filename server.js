'use strict';

var socks = [];
let number = 0;

const server = require('net').createServer(connection => {

    socks.push(connection);
    number = number + 1;

    console.log('Subscriber connected.');

    connection.write("Welcome to the telnet chat!\n")


    connection.on('end', () => {

        console.log('Subscriber disconnected.');
        let ind = socks.indexOf(connection);

        socks.splice(ind, 0);

    });


    for (let index = 0; index < socks.length; index++) {
        const element = socks[index];
        element.write("Guest" + number + " is connected\n");

    }

    connection.on('data', message => {

        let nuu = socks.indexOf(connection) + 1;

        for (let index = 0; index < socks.length; index++) {
            const element = socks[index];
            if (element != connection)
                element.write("Guest" + nuu + "sent: " + message);

        }

    });

});

server.listen(60300, function () {
    console.log('Test server listening for subscribers...');
});