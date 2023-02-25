import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';

export default class Server {
  static startServer() {
    dotenv.config();

    const server: Express = express();
    const port = process.env['PORT'];

    const filePath: string = './diet.txt';

    try {
      if (!fs.existsSync(filePath)) {
        //create the file
        const mockDieta = {
          carbs: 1512,
          proteins: 19204,
          test: 271,
        };
        fs.appendFile(filePath, JSON.stringify(mockDieta), function (err) {
          if (err) throw err;
          console.log('Created new file!');
        });
      } else {
        console.log(`file ${filePath} already exists`);
      }
    } catch (err) {
      console.error(err);
    }

    server.get('/getDietData', (req: Request, res: Response) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          res.send(JSON.stringify(err));
          return;
        }

        console.log(data);
        res.send(data);
      });
    });

    server.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  }
}
