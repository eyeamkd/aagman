

const {subscribe} = require("graphql")

const Order=require("./../models/order");
const Store=require("./../models/Store");
const Revenue =require("./../models/Revenue");
const Bill=require("./../models/Bill");
const GraphQLDateTime=require('graphql-iso-date');
const Subcribe=require("./Subscribe");

//Generate Order Code
const generateOrderCode = function () {
    var digits = "0123456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += digits[Math.floor(Math.random() * 10)];
    }
    return code;
  };

module.exports= {
    Query: {
        //Get all orders
        orders:() => Order.find(),
        //Get single order by ID
        order:(parent, {id}) => Order.findById(id),
        //Get order by Id and populate bill and store
        getOrder:(parent,{orderId})=>Order.findById(orderId).populate("bill store"),
        getOrderDemo:async(parent,{storeId})=>{
            return await Store.findById(storeId).toArray();
        }
        
    },

    Mutation: {
        //Create Order
        createOrder: async(_, { orderCode ,orderStatus,storeId ,dateAndTime}) => {
            const orders = new Order({ orderCode ,orderStatus,Store:storeId,dateAndTime});
            await orders
            .save().then(result=>{
                return Store.findById(storeId);
            })
            .then(store=>{
                store.orders.push(orders);
                return store.save()
            });
            return "Order Created";
        }, 

        //Add Order

        addOrder:async(_,{orderCode,orderStatus,items,storeId,totalCost,paymentMode,paymentStatus,dateAndTime})=>{
            const orderCodeCreation=generateOrderCode()
            //Add Orders to collection
            const orders=new Order({orderCode:orderCodeCreation,orderStatus,store:storeId,itemsList:items,dateAndTime})
            await orders.save().then(result=>{
                return Store.findById(storeId);
            }).then(store=>{
                store.orders.push(orders);
                return store.save()
            }) 
         
            //Create Bill and map it with orders and revenue
            const bills = new Bill({ totalCost,paymentMode , paymentStatus,order:orders.id});
            orders.bill=bills
            await orders.save()
            await bills.save()

            //Add Orders To revenue

            Store.findById(storeId).then(result=>{
                return result.revenue
            }).then(revenueId=>{
                return Revenue.findById(revenueId)
            }).then(revenue=>{
                revenue.totalIncome=revenue.totalIncome+totalCost
                revenue.orders.push(orders);
                revenue.save();
            })
            Subcribe.subscribers.forEach(fn=>fn())
            return orders;
        },
        //Update Order Status
        updateOrderStatus:async(_,{orderId,orderStatus})=>{
            const order=await Order.findByIdAndUpdate(orderId,{orderStatus:orderStatus},{new:true})
            order.save()
            return "Status Updated"
        },
        //Update Payment Status
        updatePaymentStatus:async(_,{orderId,paymentStatus})=>{
            Order.findById(orderId).then(result=>{
                return result.bill
            }).then(async billId=>{
                const bill=await Bill.findByIdAndUpdate(billId,{paymentStatus:paymentStatus},{new:true})
                bill.save()
            })
            return "Payment Status Updated"
        }

    }
}