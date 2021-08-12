import express from "express";
import mongoose from "mongoose";
import { ApolloServer} from "apollo-server-express";
import OrderResolvers from "./resolvers/OrderResolver";
import OrderTypeDef from "./typedefs/OrderTypeDef";
import UserResolvers from "./resolvers/UserResolver";
import GMR from 'graphql-merge-resolvers';
import UserTypeDef from "./typedefs/UserTypeDef";
import nodemailer from "nodemailer";
import sendGridTransport from "nodemailer-sendgrid-transport";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import cors from "cors";
import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:5000/graphql';
const client = new GraphQLClient(endpoint, {
  credentials: 'include',
  mode: 'cors'
});

const PORT = process.env.PORT || 5000;

const server = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  const server = new ApolloServer({
    typeDefs: [ UserTypeDef, OrderTypeDef],
    
    resolvers:GMR.merge([
      UserResolvers, OrderResolvers
    ])
  })

  await server.start()
  server.applyMiddleware({app});

  try{
      
      await mongoose.connect("mongodb+srv://greeta123:greeta123@aagman-cluster.coau9.mongodb.net/Aagman?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true })
      console.log(mongoose.connection.readyState);
    }catch(err){
      console.log(err)
  }

  const transporter = nodemailer.createTransport(
    sendGridTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  
  const generateOTP = function () {
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  
  const saveOTP = async (email, otp) => {
    const response = await client.request(
      `
      mutation UpdateOtpMutation($email: String!, $otp: String!) {
          updateOtp(email: $email, otp: $otp) {
            id
            email
          }
        }
    `,
    {
      email: email,
      otp: otp
    }
  );
  console.log(response);
  };
  
  app.post("/send", (req, res) => {
    const { email } = req.body;

    var OTP = generateOTP();
    saveOTP(email, OTP);
    transporter
      .sendMail({
        to: email,
        from: "9kunalsharma9@gmail.com",
        subject: "Verification OTP for Aagman",
        html: `<h3>Verification OTP</h3>
          <p>${OTP}</p>`,
      })
      .then((resp) => {
        console.log(resp);
        res.json({ resp });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.get('/', (req, res) => res.send('Welcome to Aagman Server'))

  app.listen(PORT, () => {
    console.log("server is running on", PORT);
  })
}

server();


