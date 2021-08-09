import express from "express";
import mongoose from "mongoose";
import { ApolloServer} from "apollo-server-express";
import {resolvers} from "./resolvers";
import { typeDefs } from "./typeDefs";
import dotenv from "dotenv";
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
}

server();


