const express = require('express');

const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const pro = require('process');
const { userRouter } = require('./routes/index');

const Port = process.env.Port || 8080;

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use(compression());
server.use(userRouter);

if (cluster.isPrimary) {
  console.log(`Primary ${pro.pid} is running`);

  // Fork workers.
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // eslint-disable-next-line no-unused-vars
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  server.listen(Port, () => {
    console.log(`Listening on port ${Port}`);
  });

  console.log(`Worker ${process.pid} started`);
}
