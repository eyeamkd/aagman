const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer} = require("apollo-server-express");
const GMR = require('graphql-merge-resolvers');
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const { GraphQLClient } = require('graphql-request');
const ResolverTypeDefModule = require('./ResolverTypeDef');
const Resolver = ResolverTypeDefModule.resolver;
const TypeDef =ResolverTypeDefModule.typedef
const LocationResolvers = require("./resolvers/LocationResolver");
const LocationTypeDef = require("./typedefs/LocationTypeDef");
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
    typeDefs: [ TypeDef],
    
    resolvers:Resolver
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
      mutation UpdateOtpMutation($updateOtpEmail: String!, $updateOtpOtp: String!) {
        updateOtp(email: $updateOtpEmail, otp: $updateOtpOtp) {
          email
          fullName
          storeName
          GSTNumber
          location
          phoneNumber
          otp
        }
      }
      
    `,
    {
      updateOtpEmail: email,
      updateOtpOtp: otp
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


