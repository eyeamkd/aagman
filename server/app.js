const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const GMR = require('graphql-merge-resolvers');
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const webpush = require('web-push')
const { GraphQLClient } = require('graphql-request');
const ResolverTypeDefModule = require('./ResolverTypeDef');
const mocks= require('./mocks');
const Resolver = ResolverTypeDefModule.resolver;
const TypeDef = ResolverTypeDefModule.typedef
const LocationResolvers = require("./resolvers/LocationResolver");
const LocationTypeDef = require("./typedefs/LocationTypeDef");
const endpoint = 'http://localhost:5000/graphql';
const { PubSub } = require("graphql-subscriptions");
const Razorpay = require("razorpay");
const key_id = process.env.KEY_ID;
const key_secret = process.env.KEY_SECRET;
const instance = new Razorpay({
  key_id: key_id,
  key_secret: key_secret,
});

const client = new GraphQLClient(endpoint, {
  credentials: 'include',
  mode: 'cors'
});
var admin = require('firebase-admin');

var serviceAccount = require("./aagman-44046-firebase-adminsdk-n4bof-9c1ecb6ecd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const PORT = process.env.PORT || 5000;
const pubsub = new PubSub()
const server = async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

  const server = new ApolloServer({
    typeDefs: [TypeDef],
    resolvers: Resolver,
    //Uncomment mocks while running test files
    // mocks,
    context:{pubsub}
  })



  await server.start()
  server.applyMiddleware({ app });

  try {

    await mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log(mongoose.connection.readyState);
  } catch (err) {
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

  const addDevice = async (currentToken, userId) => {
    const response = await client.request(
      `
    mutation CreateDeviceMutation($createDeviceFcmToken: String, $createDeviceActive: Boolean, $createDeviceCreatedAt: String, $createDeviceUserId: ID) {
      createDevice(fcmToken: $createDeviceFcmToken, active: $createDeviceActive, createdAt: $createDeviceCreatedAt, userId: $createDeviceUserId)
    }
  `,
      {
        createDeviceFcmToken: currentToken,
        createDeviceActive: true,
        createDeviceCreatedAt: "datetime",
        createDeviceUserId: userId
      }
    );
  }

  app.post("/register", (req, res) => {
    const { currentToken, userId } = req.body;
    addDevice(currentToken, userId)
    res.status(200).json({ message: "Successfully registered FCM Token!" });
  });

  app.post("/orderedsuccessfully", (req, res) => {
    const { tokens } = req.body;
    var payload = {
      notification: {
        title: "Orders Update",
        body: "Order has been received."
      }
    };

    var options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
    };

    admin.messaging().sendToDevice(tokens, payload, options)
      .then(function (response) {
        console.log("Successfully sent message:", response);
      })
      .catch(function (error) {
        console.log("Error sending message:", error);
      });
    res.status(200).json({ message: "Successfully sent notification to the store owner for successful order" });
  });

  const addCustomerDevice = async (currentToken, orderId) => {
    const response = await client.request(
      `
      mutation CreateCustomerDeviceMutation($createCustomerDeviceFcmToken: String, $createCustomerDeviceActive: Boolean, $createCustomerDeviceCreatedAt: String, $createCustomerDeviceOrderId: ID) {
        createCustomerDevice(fcmToken: $createCustomerDeviceFcmToken, active: $createCustomerDeviceActive, createdAt: $createCustomerDeviceCreatedAt, orderId: $createCustomerDeviceOrderId)
      }
    `,
      {
        createCustomerDeviceFcmToken: currentToken,
        createCustomerDeviceActive: true,
        createCustomerDeviceCreatedAt: "datetime",
        createCustomerDeviceOrderId: orderId
      }
    );
  }

  app.post("/registercustomer", (req, res) => {
    const { currentToken, orderId } = req.body;
    addCustomerDevice(currentToken, orderId)
    res.status(200).json({ message: "Successfully registered FCM Token!" });
  });

  app.post("/updateorderstatus", async (req, res) => {
    const { token, status, orderId } = req.body;
    var payload = {
      notification: {
        title: "Order Status",
        body: `${status}`
      }
    };

    var options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
    };

    admin.messaging().sendToDevice(token, payload, options)
      .then(function (response) {
        console.log("Successfully sent message:", response);
      })
      .catch(function (error) {
        console.log("Error sending message:", error);
      });
    res.status(200).json({ message: "Successfully sent notification to the store owner for successful order" });

    if (status === "Completed") {
      console.log(token);
      console.log(orderId);
      const response = await client.request(
        `
    mutation DeleteCustomerDeviceMutation($deleteCustomerDeviceFcmToken: String!, $deleteCustomerDeviceOrderId: ID!) {
      deleteCustomerDevice(fcmToken: $deleteCustomerDeviceFcmToken, orderId: $deleteCustomerDeviceOrderId)
    }
    `,
        {
          deleteCustomerDeviceFcmToken: token,
          deleteCustomerDeviceOrderId: orderId
        }
      );
    }
  });

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

  app.get("/order/:totalCost", (req, res) =>{
        const {totalCost} = req.params;
        const amount = totalCost*100;
        const currency = "INR";
        instance.orders.create({amount, currency}, (error, order) =>{
          if(error)
          {
            return res.status(500).json(error);
          }
          return res.status(200).json(order);

        })
  })

  if(!module.parent){
  app.listen(PORT, () => {
    console.log("server is running on", PORT);
  })}
}



server();
module.exports = server


