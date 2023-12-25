import cors from 'cors';
import express from 'express';
import { Server, createServer } from 'node:http';
import { Server as IO } from 'socket.io';

class App {
  public app: express.Application;
  public server: Server;
  private socketIO: IO;

  constructor() {
    this.app = express();
    this.app.use(cors({ origin: '*' }));
    this.server = createServer(this.app);
    this.socketIO = new IO(this.server, {
      cors: { origin: '*' },
    });

    this.socketIO.on('connection', (socket) => {
      console.log('Socket connected: ', socket.id);

      socket.on('disconnect', () => {
        console.log('Socket disconnected: ', socket.id);
      });

      socket.on('message', (message) => {
        socket.broadcast.emit('message', message);
      });
    });
  }
}

export default App;
