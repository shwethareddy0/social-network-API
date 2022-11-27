const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

//const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
//dayjs().format()
