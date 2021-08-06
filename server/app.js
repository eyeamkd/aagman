var express = require('express');
const mongoose = require('mongoose')
const {ApolloServer} = require('apollo-server-express')
const {resolvers} = require('./resolver')
const {typeDefs} = require('./typeDefs')
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;

const server = async () => {
  const app = express();
  const server = new ApolloServer({
      typeDefs,
      resolvers
  })

  await server.start()
  server.applyMiddleware({app});

  try{

      await mongoose.connect(process.env.Connection_String, {useNewUrlParser: true, useUnifiedTopology: true })
  }catch(err){
      console.log(err)
  }


  app.get('/', (req, res) => res.send('hello world'))

  app.listen(PORT, () => {
    console.log("server is running on", PORT);
  })

module.exports = app;
}

server();


