const chai = require('chai');
const expect = chai.expect;
const should=chai.should;
const url = `http://localhost:5000/`;
const request = require('supertest')(url);

describe('ordersDashboard', () => {
    it('returns orders details of Dashboard', (done) => {
        request.post('graphql')
        .send({ query: `{
            ordersDashboard(storeId: "1") {
              orders {
                orderCode
                orderStatus
                
              }
            }
          }
          `})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.ordersDashboard.orders[0].orderCode).to.be.eq(9884)
            expect(res.body.data.ordersDashboard.orders[0].orderStatus).to.be.eq("Completed")
            done();
          })
     }),
     it('orders populate items list correctly', (done) => {
        request.post('graphql')
        .send({ query: `{
            ordersDashboard(storeId: "1") {
              orders {
                orderCode
                orderStatus
                itemsList {
                  name
                  quantity
                  price
                }
              }
            }
          }
          `})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.ordersDashboard.orders[0].itemsList[0].name).to.be.eq("Cheese Burger")
            expect(res.body.data.ordersDashboard.orders[0].itemsList[0].quantity).to.be.eq(1)
            expect(res.body.data.ordersDashboard.orders[0].itemsList[0].price).to.be.eq(95.5)
            done();
          })
     }),
     it('orders populate bill correctly', (done) => {
        request.post('graphql')
        .send({ query: `{
            ordersDashboard(storeId: "1") {
              orders {
                orderCode
                orderStatus
                bill {
                  totalCost
                  paymentMode
                  paymentStatus
                }
              }
            }
          }
          `})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.ordersDashboard.orders[0].bill.totalCost).to.be.eq(102)
            expect(res.body.data.ordersDashboard.orders[0].bill.paymentMode).to.be.eq("DebitCard")
            expect(res.body.data.ordersDashboard.orders[0].bill.paymentStatus).to.be.eq("NotPaid")
            done();
          })
     })
    })

describe('getMenu', () => {
        it('menu populates category data', (done) => {
            request.post('graphql')
            .send({ query: `{
                getMenu(storeId: "1") {
                  menu {
                    categories {
                      name
                    }
                  }
                }
              }              
              `})
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);
                expect(res.body.data.getMenu.menu.categories[0].name).to.be.eq("Burger")
                done();
              })
    }),
    it('menu populates item data', (done) => {
        request.post('graphql')
        .send({ query: `{
            getMenu(storeId: "1") {
              menu {
                categories {
                  name
                  items {
                    name
                    description
                    availability
                    type
                    price
                    rating
                    bestSeller
                    photo
                  }
                }
              }
            }
          }
                        
          `})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.getMenu.menu.categories[0].items[1].name).to.be.eq("Cheese Burger")
            expect(res.body.data.getMenu.menu.categories[0].items[1].description).to.be.eq("Veg")
            expect(res.body.data.getMenu.menu.categories[0].items[1].availability).to.be.eq("OutOfStock")
            expect(res.body.data.getMenu.menu.categories[0].items[1].type).to.be.eq("Veg")
            expect(res.body.data.getMenu.menu.categories[0].items[1].price).to.be.eq(56)
            expect(res.body.data.getMenu.menu.categories[0].items[1].rating).to.be.eq(5)
            expect(res.body.data.getMenu.menu.categories[0].items[1].bestSeller).to.be.eq("No")
            expect(res.body.data.getMenu.menu.categories[0].items[1].photo).to.be.eq("0")
            done();
          })
})
})   

describe('getRevenue', () => {
    it('Returns revenue data', (done) => {
        request.post('graphql')
        .send({ query: ` {
            getRevenue(storeId: "1") {
              revenue {
                totalIncome
              }
            }
          }
          `})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.getRevenue.revenue.totalIncome).to.be.eq(1000)
            done();
          })
     }),
     it('revenue data populates orders', (done) => {
        request.post('graphql')
        .send({ query: ` {
            getRevenue(storeId: "1") {
              revenue {
                totalIncome
                orders {
                  orderCode
                  orderStatus
                }
              }
            }
          }
          `})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.getRevenue.revenue.orders[1].orderCode).to.be.eq(3434)
            expect(res.body.data.getRevenue.revenue.orders[1].orderStatus).to.be.eq("OrderReceived")
            done();
          })
     }),
     it('revenue data populates bill', (done) => {
        request.post('graphql')
        .send({ query: ` {
            getRevenue(storeId: "1") {
              revenue {
                totalIncome
                orders {
                  bill {
                    totalCost
                    paymentMode
                    paymentStatus
                  }
                }
              }
            }
          }
          `})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.getRevenue.revenue.orders[1].bill.totalCost).to.be.eq(89)
            expect(res.body.data.getRevenue.revenue.orders[1].bill.paymentMode).to.be.eq("Cash")
            expect(res.body.data.getRevenue.revenue.orders[1].bill.paymentStatus).to.be.eq("Paid")
            done();
          })
     })
    })

    describe('getUserId', () => {
      it('get User Id from store', (done) => {
        request.post('graphql')
        .send({ query: `{
          getUserId(storeId: "1") {
            owner {
              id
              email
            }
          }
        }
          `})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.getUserId.owner.id).to.be.eq("4")
            expect(res.body.data.getUserId.owner.email).to.be.eq("greekavi@gmail.com")
            done();
          })
      })
    })

describe('addStore', () => {
      it('Add new Store', (done) => {
          request.post('graphql')
          .send({ query: `mutation Mutation($addStoreStoreName: String!, $addStoreCountry: String!, $addStoreState: String!, $addStoreCity: String!, $addStoreArea: String!, $addStoreLandMark: String!, $addStoreOpenTime: String!, $addStoreCloseTime: String!, $addStoreStatusTime: statusTiming!, $addStoreUserId: ID!) {
            addStore(storeName: $addStoreStoreName, country: $addStoreCountry, state: $addStoreState, city: $addStoreCity, area: $addStoreArea, landMark: $addStoreLandMark, openTime: $addStoreOpenTime, closeTime: $addStoreCloseTime, statusTime: $addStoreStatusTime, userId: $addStoreUserId)
          }
            `,variables:{
              addStoreStoreName: "Zinc", 
              addStoreCountry: "India", 
              addStoreState: "Karnataka", 
              addStoreCity: "Bangalore", 
              addStoreArea: "Electronic city", 
              addStoreLandMark: "shop", 
              addStoreOpenTime: "12:00pm", 
              addStoreCloseTime: "12:00am", 
              addStoreStatusTime: "Close", 
              addStoreUserId: "4"
            }})
          .expect(200)
          .end((err,res) => {
              if (err) return done(err);
              done();
            })
       })
  })