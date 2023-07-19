const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🤯 Shuting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DB.replace('<USERNAME>', process.env.DB_USER).replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log('Database is connected.');
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 🤯 Shuting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
