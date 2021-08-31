const Bill=require("./../models/Bill");
const Order=require("./../models/Order");
const Revenue=require("./../models/Revenue");

module.exports= {
    Query: {
        bills:() => Bill.find(),
        bill:(parent, {id}) => Bill.findById(id),
    },

    Mutation: {
        createBill: async(_, {  TotalCost,PaymentMode , PaymentStatus,OrderId,RevenueId }) => {
            const bills = new Bill({ TotalCost,PaymentMode , PaymentStatus,Order:OrderId});
            await bills
            .save().then(result=>{
                return Order.findById(OrderId);
            })
            .then(order=>{
                order.Bill=bills;
                return order.save()
            })
            .then(result=>{
                return Revenue.findById(RevenueId);
            })
            .then(revenue=>{
                revenue.Bill.push(bills);
                return revenue.save()
            })
            ;
            return "Bill Created";
        }

    }
}