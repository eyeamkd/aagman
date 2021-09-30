
const chai = require('chai');
const expect = chai.expect;
const should=chai.should;
const url = `http://localhost:5000/`;
const request = require('supertest')(url);
const User = require('../resolvers/UserResolver')


describe('Users', () => {
    it('Returns users data', (done) => {
        request.post('graphql')
        .send({ query: '{  users {  email fullName gstNumber phoneNumber } }'})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.users[1].email).to.be.eq("greekavi@gmail.com")
            expect(res.body.data.users[1].fullName).to.be.eq("Kavitha jayaraj")
            expect(res.body.data.users[1].gstNumber).to.be.eq("KKLKK8989")
            expect(res.body.data.users[1].phoneNumber).to.be.eq("12121211212121")
            done();
          })
     })

     it('Returns all users data', (done) => {
        request.post('graphql')
        .send({ query: '{  users {  email fullName gstNumber phoneNumber } }'})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
           expect(res.body.data.users.length).to.be.eq(2)
            done();
          })
     })
})

describe('checkIfUserExists', () => {
    it('To check if User Exists', (done) => {
        request.post('graphql')
        .send({ query: '{ checkIfUserExists(email: "greekavi@gmail.com") }'})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })


     })
     it('To check if User Does not Exists', (done) => {
        request.post('graphql')
        .send({ query: '{ checkIfUserExists(email: "smile@gmail.com") }'})
        .expect(200)
        .end((err,res) => {

            if (err) return done(err);
            done();
          })
     })

})

describe('checkIfOtpMatches', () => {
    it('To check if OTP Does Not Match with User', (done) => {
        request.post('graphql')
        .send({ query: '{checkIfOtpMatches(email: "greekavi@gmail.com", otp: "2234") }'})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })

     it('To check if OTP Match with User', (done) => {
        request.post('graphql')
        .send({ query: '{checkIfOtpMatches(email: "greekavi@gmail.com", otp: "3076") }'})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
 
     })
})

describe('getUserStoreId', () => {
    it('return data of User Store id and name', (done) => {
        request.post('graphql')
        .send({ query: ' {getUserStoreId(email: "greekavi@gmail.com") { stores { id  name } } }'})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.getUserStoreId.stores[0].name).to.be.eq("Hello World")
            done();
          })
     })

     it('return all data of User Store id and name', (done) => {
        request.post('graphql')
        .send({ query: ' {getUserStoreId(email: "greekavi@gmail.com") { stores { id  name } } }'})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.getUserStoreId.stores.length).to.be.eq(2)
            done();
          })
     })

})

describe('getUserByMail', () => {
    it('Return user data by email', (done) => {
        request.post('graphql')
        .send({ query: '{ getUserByMail(email: "greekavi@gmail.com") { email fullName gstNumber  phoneNumber  id  } }'})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.getUserByMail.email).to.be.eq("greekavi@gmail.com")
            expect(res.body.data.getUserByMail.fullName).to.be.eq("Kavitha jayaraj")
            expect(res.body.data.getUserByMail.gstNumber).to.be.eq("KKLKK8989")
            expect(res.body.data.getUserByMail.phoneNumber).to.be.eq("12121211212121")
            done();
          })
     })
})

describe('createUser', () => {
    it('Return create data by email', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation($createUserEmail: String!, $createUserFullName: String!, $createUserGstNumber: String!, $createUserPhoneNumber: String!) {
            createUser(email: $createUserEmail, fullName: $createUserFullName, gstNumber: $createUserGstNumber, phoneNumber: $createUserPhoneNumber)
          }
          `,variables:{
              'createUserEmail':"Gree@gmail.com",
              'createUserFullName':"Kavitha Jayaraj",
              'createUserGstNumber':"HJKH687686",
              'createUserPhoneNumber':"12387197"
          }})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })
})

describe('addUser', () => {
    it('add new User', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation($addUserEmail: String!, $addUserFullName: String!, $addUserGstNumber: String!, $addUserPhoneNumber: String!, $addUserStoreName: String!, $addUserCountry: String!, $addUserState: String!, $addUserCity: String!, $addUserArea: String!, $addUserLandMark: String!, $addUserOpenTime: String!, $addUserCloseTime: String!, $addUserStatusTime: statusTiming!) {
            addUser(email: $addUserEmail, fullName: $addUserFullName, gstNumber: $addUserGstNumber, phoneNumber: $addUserPhoneNumber, storeName: $addUserStoreName, country: $addUserCountry, state: $addUserState, city: $addUserCity, area: $addUserArea, landMark: $addUserLandMark, openTime: $addUserOpenTime, closeTime: $addUserCloseTime, statusTime: $addUserStatusTime)
          }
          
          `,variables:{
            addUserEmail: "gree@gmail.com", 
            addUserFullName: "Greeta Kavitha Jayaraj", 
            addUserGstNumber: "HJKH7887687", 
            addUserPhoneNumber: "9878656756", 
            addUserStoreName: "Chemistry", 
            addUserCountry: "India", 
            addUserState: "TamilNadu", 
            addUserCity: "Chennai", 
            addUserArea: "Bessy", 
            addUserLandMark: "Beach", 
            addUserOpenTime: "8:30am", 
            addUserCloseTime: "11:00pm", 
            addUserStatusTime:"Open"
          }})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })
})

describe('updateOtp', () => {
    it('Update User Otp', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation($updateOtpEmail: String!, $updateOtpOtp: String!) {
            updateOtp(email: $updateOtpEmail, otp: $updateOtpOtp) {
              email
            }
          } 
          `,variables:{
            updateOtpEmail:"greekavi@gmail.com",
            updateOtpOtp:"6767"
          }})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.updateOtp.email).to.be.eq("greekavi@gmail.com")
            done();
          })
     })
})





