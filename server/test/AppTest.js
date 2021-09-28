const should = require('should');
const mockery = require('mockery');
const nodemailerMock = require('nodemailer-mock');
const nodemailer = require("nodemailer");
const express = require("express");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

describe('Tests that send email',  async ()=> {

  /* This could be an app, Express, etc. It should be 
  instantiated *after* nodemailer is mocked. */
  let app =  express();

  before(async ()=> {
    // Enable mockery to mock objects
    mockery.enable({
      warnOnUnregistered: true,
    });
    
    /* Once mocked, any code that calls require('nodemailer') 
    will get our nodemailerMock */
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
    // Reset the mock back to the defaults after each test
    nodemailerMock.mock.reset();
  });
  
  after(async ()=> {
    // Remove our mocked nodemailer and disable mockery
    mockery.deregisterAll();
    mockery.disable();
  });
  
  it('should send an email using nodemailer-mock', async ()=> {
    // call a service that uses nodemailer
    const response =transporter
    .sendMail({
      to: "greeta1999kavitha@gmail.com",
      from: "9kunalsharma9@gmail.com",
      subject: "Verification OTP for Aagman",
      html: `<h3>Verification OTP</h3>
        <p>7887</p>`,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    });
    // // <-- your email code here
    
    // // a fake test for something on our response
    // console.log(response)
    // response.value.should.be.exactly('value');
    
    // // get the array of emails we sent
    // const sentMail = nodemailerMock.mock.getSentMail();
    
    // // we should have sent one email
    // sentMail.length.should.be.exactly(1);
    
    // // check the email for something
    // // sentMail[0].property.should.be.exactly('foobar');
  });
  
  it('should fail to send an email using nodemailer-mock', async ()=> {
    // tell the mock class to return an error
    const err = new Error('My custom error');
    nodemailerMock.mock.setShouldFailOnce();
    nodemailerMock.mock.setFailResponse(err);
  
    // call a service that uses nodemailer
    var response =nodemailer.createTransport(
        sendGridTransport({
          auth: {
            api_key: process.env.SENDGRID_API,
          },
        })
      ); 
  });
  
  it('should verify using the real nodemailer transport', async ()=> {
    // tell the mock class to pass verify requests to nodemailer
    nodemailerMock.mock.setMockedVerify(false);
  
    // call a service that uses nodemailer
    var response = nodemailer.createTransport(
        sendGridTransport({
          auth: {
            api_key: process.env.SENDGRID_API,
          },
        })
      ); 
  });
});