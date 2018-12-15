import * as http from 'http';
import * as debug from 'debug';
import * as winston from 'winston';
import * as socketIo from "socket.io";

import App  from './App';


class Server {

    private static serverInstance: Server;
    private server: any;
    private port: number;
    private io: SocketIO.Server;

    public getServerInstance(): any {
        return this.server;
    }

    public static bootstrap(): Server {
        if (!this.serverInstance) {
            this.serverInstance = new Server();
            return this.serverInstance;
        } else {
            return  this.serverInstance;
        }

    }


    private debugMod(): void {
        debug('ts-express:server');
        const files = new winston
            .transports
            .File({ filename: 'application.log' });
            
        winston.add(files);
    }

    public constructor() {
        this.debugMod();
        this.runServer();
    }

    private runServer(): void {
        this.port = this.normalizePort(process.env.PORT || 8080);
        App.set('port', this.port);
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createServer() {
        this.server = http.createServer(App);
        // this.server.listen(this.port);
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log("Running server on port %s", this.port);
        });

        this.server.on('listening', () => {
            let address = this.server.address();
            let bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;
            debug(`Listening on ${bind}`);
        });

        this.server.on('error', (error: NodeJS.ErrnoException) => {
            if (error.syscall !== 'listen') throw error;
            console.error(error);
            process.exit(1);
        });

        this.io.on("connect", (socket: any) => {
            console.log("Connected client on port %s.", this.port);
            socket.on("message", (m: any) => {
                console.log("[server](message): %s", JSON.stringify(m));
                this.io.emit("message", m);
            });

            socket.on("disconnect", () => {
                console.log("Client disconnected");
            });
        });
    }

    private normalizePort(val: number|string): number {
        let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
        return port;
    }

}

export const server = Server.bootstrap();