const chai = require('chai');
const expect = chai.expect;
const should=chai.should;
const url = `http://localhost:5000/`;
const request = require('supertest')(url);

describe('getOrder', () => {
    it('get Order', (done) => {
        request.post('graphql')
        .send({ query: ` {
          getOrder(orderId: "78") {
            orderCode
            orderStatus
          }
        }`
          })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.getOrder.orderCode).to.be.eq(8987)
            expect(res.body.data.getOrder.orderStatus).to.be.eq("Preparing")
            done();
          })
     }),
     it('Order populates orders properly', (done) => {
        request.post('graphql')
        .send({ query: `  {
            getOrder(orderId: "45") {
              orderCode
              orderStatus
              store {
                name
                id
              }
            }
          }`
          })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.getOrder.store.id).to.be.eq("1")
            expect(res.body.data.getOrder.store.name).to.be.eq("Juice stall")
            done();
          })
     }),
     it('Order populates bills properly', (done) => {
        request.post('graphql')
        .send({ query: `  {
            getOrder(orderId: "67") {
              orderCode
              orderStatus
              bill {
                totalCost
                paymentMode
                paymentStatus
              }
            }
          }`
          })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.getOrder.bill.totalCost).to.be.eq(45)
            expect(res.body.data.getOrder.bill.paymentMode).to.be.eq("UPI")
            expect(res.body.data.getOrder.bill.paymentStatus).to.be.eq("Paid")
            done();
          })
     }),
     it('Order populates items List properly', (done) => {
        request.post('graphql')
        .send({ query: ` {
            getOrder(orderId: "67") {
              orderCode
              orderStatus
              itemsList {
                name
                quantity
                price
              }
            }
          }`
          })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.getOrder.itemsList[0].name).to.be.eq("Lemon Juice")
            expect(res.body.data.getOrder.itemsList[0].quantity).to.be.eq(4)
            expect(res.body.data.getOrder.itemsList[0].price).to.be.eq(90)
            done();
          })
     })
})


describe('addOrder', () => {
    it('Add an order', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation($addOrderOrderCode: Int!, $addOrderOrderStatus: StatusOfOrder!, $addOrderItems: [ItemsListInput]!, $addOrderStoreId: ID!, $addOrderTotalCost: Float!, $addOrderPaymentMode: PaymentTypes!, $addOrderPaymentStatus: PaymentStatusTypes!, $addOrderDateAndTime: GraphQLDateTime!) {
            addOrder(orderCode: $addOrderOrderCode, orderStatus: $addOrderOrderStatus, items: $addOrderItems, storeId: $addOrderStoreId, totalCost: $addOrderTotalCost, paymentMode: $addOrderPaymentMode, paymentStatus: $addOrderPaymentStatus, dateAndTime: $addOrderDateAndTime) {
              id
            }
          }
          `,variables:{
            "addOrderOrderCode": 128736,
            "addOrderOrderStatus":"OrderReceived" ,
            "addOrderItems": [{"name": "Lemon","quantity": 3,"price":34,"itemId": "2"}],
            "addOrderStoreId": "1",
            "addOrderTotalCost": 67,
            "addOrderPaymentMode": "UPI",
            "addOrderPaymentStatus": "NotPaid",
            "addOrderDateAndTime": "12:30"
          }
          })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })
})

describe('updateOrderStatus', () => {
    it('Update Order Status', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation($updateOrderStatusOrderId: ID!, $updateOrderStatusOrderStatus: StatusOfOrder!) {
            updateOrderStatus(orderId: $updateOrderStatusOrderId, orderStatus: $updateOrderStatusOrderStatus)
          }
          `,
          variables:{
            updateOrderStatusOrderId: 5678, 
            updateOrderStatusOrderStatus:"Preparing"
          }
          })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })
})

describe('updatePaymentStatus', () => {
    it('Update Payment Status', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation($updatePaymentStatusOrderId: ID!, $updatePaymentStatusPaymentStatus: PaymentStatusTypes!) {
            updatePaymentStatus(orderId: $updatePaymentStatusOrderId, paymentStatus: $updatePaymentStatusPaymentStatus)
          }
          
          `,
          variables:{
            updatePaymentStatusOrderId: 7898, 
            updatePaymentStatusPaymentStatus:"Paid"
          }
          })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })
})