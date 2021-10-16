const Bill=require("./../models/Bill");
const Order=require("./../models/order");
const Revenue=require("./../models/Revenue");

module.exports= {
    Query: {
        //Find all bill
        bills:() => Bill.find(),
        //Find single Bill by ID
        bill:(parent, {id}) => Bill.findById(id),
    },

    Mutation: {
        //Create Bill
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