const Bill=require("./../models/Bill");
const Order=require("./../models/order");
const Revenue=require("./../models/Revenue");

module.exports= {
    Query: {
        bills:() => Bill.find(),
        bill:(parent, {id}) => Bill.findById(id),
    },

    Mutation: {
        createBill: async(_, {  totalCost,paymentMode , paymentStatus,orderId,revenueId }) => {
            const bills = new Bill({ totalCost,paymentMode , paymentStatus,Order:orderId});
            await bills
            .save().then(result=>{
                return Order.findById(orderId);
            })
            .then(order=>{
                order.bill=bills;
                return order.save()
            })
            .then(result=>{
                return Revenue.findById(revenueId);
            })
            .then(revenue=>{
                revenue.bill.push(bills);
                return revenue.save()
            })
            ;
            return "Bill Created";
        }

    }
}