const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const { userRouter } = require('./routes/index');

const Port = process.env.Port || 8080;

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

server.use(userRouter);

server.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});
