const should = require('should');
const mockery = require('mockery');
const nodemailerMock = require('nodemailer-mock');
const nodemailer = require("nodemailer");
const express = require("express");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
//import axios from "axios";

const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
chai.use(chaiHttp)
const app= require("../app");

describe('Test the  request for register customer',  async ()=> {
  it("should make a request to /registercustomer", async () => {
    const response=chai.request(app)
            .post('/registercustomer')
            .send({currentToken:"81291829jsbhhjbjsbx" , orderId:"abababab8989898"})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
            expect(response._data.orderId).to.be.eq("abababab8989898")  
     })
})

describe('Test home page of aagman server',  async ()=> {
  it("should make a request to /get", async () => {
    const response=chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.equal("Welcome to Aagman Server");
                done();
            });
     })
})

describe('Test the request for register',  async ()=> {
  it("should make a request to /register and check iif userId is received properly", async () => {
    const response=chai.request(app)
    .post('/register')
    .send({currentToken:"81291829jsbhhjbjsbx" , userId:"abababab8989898"})
    .end((err, res) => {
        res.should.have.status(200);
        done();
    }); 
    expect(response._data.userId).to.be.eq("abababab8989898")   
  })
})

describe('Test the request for successfully ordered',  async ()=> {
  it("should make a request to /ordersuccessfully and check if tokens is received properly", async () => {
    const response=chai.request(app)
    .post('/orderedsuccessfully')
    .send({ tokens:"ssdsdsdsdsdsds" })
    .end((err, res) => {
        res.should.have.status(200);
        done();
    });    
    expect(response._data.tokens).to.be.eq("ssdsdsdsdsdsds")    
  })
})



describe('Test the request for update order status',  async ()=> {
  it("make request to /orderstatus and check if status is received", async () => {
    const response=chai.request(app)
    .post('/orderedsuccessfully')
    .send({ token:"73648326jahsdjha" , status:"Preparing" })
    .end((err, res) => {
        res.should.have.status(200);
        done();
    }); 
    expect(response._data.status).to.be.eq("Preparing")
    expect(response._data.token).to.be.eq("73648326jahsdjha")      
  })
})

describe('Test the request for send',  async ()=> {
  it("make request to /send and check if email is received", async () => {
    const response=chai.request(app)
    .post('/send')
    .send({email:"greeta1999kavitha@gmail.com"})
    .end((err, res) => {
        res.should.have.status(200);
        done();
    }); 
    expect(response._data.email).to.be.eq("greeta1999kavitha@gmail.com")
  })
})

describe('Tests that send email',  async ()=> {

  let app =  express();
  before(async ()=> {
    mockery.enable({
      warnOnUnregistered: true,
    });
    
    mockery.registerMock('nodemailer', nodemailerMock)

  });

  const transporter = nodemailer.createTransport(
    sendGridTransport({
      auth: {
        api_key: process.env.SENDGRID_API,
      },
    })
  );
  
  afterEach(async ()=> {
    nodemailerMock.mock.reset();
  });
  
  after(async ()=> {
    mockery.deregisterAll();
    mockery.disable();
  });
  
  it('should send an email using nodemailer-mock', async ()=> {
    // const response =transporter
    // .sendMail({
    //   to: "greeta1999kavitha@gmail.com",
    //   from: "9kunalsharma9@gmail.com",
    //   subject: "Verification OTP for Aagman",
    //   html: `<h3>Verification OTP</h3>
    //     <p>7087</p>`,
    // })
   //console.log(response)
  });

  
  it('should fail to send an email using nodemailer-mock', async ()=> {

    const err = new Error('My custom error');
    nodemailerMock.mock.setShouldFailOnce();
    nodemailerMock.mock.setFailResponse(err);
  
  //   var response =transporter
  //   .sendMail({
  //     to: "greeta1999kavitha@gmail.com",
  //     from: "9kunalsharma9@gmail.com",
  //     subject: "Verification OTP for Aagman",
  //     html: `<h3>Verification OTP</h3>
  //       <p>7887</p>`,
  //   })
  });
  
  it('should verify using the real nodemailer transport', async ()=> {

    nodemailerMock.mock.setMockedVerify(false);
  
  //   var response = transporter
  //   .sendMail({
  //     to: "greeta1999kavitha@gmail.com",
  //     from: "9kunalsharma9@gmail.com",
  //     subject: "Verification OTP for Aagman",
  //     html: `<h3>Verification OTP</h3>
  //       <p>7887</p>`,
  //   })
   });
});