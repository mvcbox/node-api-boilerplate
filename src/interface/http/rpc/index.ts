import '../../../bootstrap';
import http from 'http';
import { app } from './app';
import { config } from '../../../config';

const port = normalizePort(config.interface.http.rpc.listen.port);
app.set('port', port);

const server = http.createServer(app);
server.listen({
    port,
    host: config.interface.http.rpc.listen.host
});
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

function onError(error: any): void {
    if ('listen' !== error.syscall) {
        throw error;
    }

    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    let addr = <any>server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

function gracefulShutdown() {
    server.close(function() {
        // Closed out remaining connections
        process.exit();
    });

    setTimeout(function() {
        // Could not close connections in time, forcefully shutting down
        process.exit();
    }, 5000);
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
