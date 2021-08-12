import { Order } from "./../models/order"


export default {
    Query: {
        orders:() => Order.find(),
        order:(parent, {id}) => Order.findById(id),
        getOrderByCode: (_, {orderCode}) =>{
            const filter = { orderCode: orderCode }
            const orders = Order.findOne(filter);
            return orders;
        },
        getOrderByPaymentStatus:(_,{paymentStatus})=>{
            const filter ={ paymentStatus:paymentStatus}
            const orders=Order.find(filter);
            return orders;
        },
        getOrderByOrderStatus:(_,{itemStatus})=>{
            const filter={itemStatus:itemStatus}
            const orders=Order.find(filter);
            return orders;
        }
        
    },

    Mutation: {
        createOrder: async(_, { orderCode, cost, itemStatus ,paymentMode,paymentStatus,itemList }) => {
            const order = new Order({ orderCode, cost, itemStatus ,paymentMode,paymentStatus,itemList });
            await order.save();
            return order;
        },
        updateOrderStatus:async(_,{orderCode,itemStatus})=>{
            const filter={orderCode:orderCode}
            const update ={itemStatus:itemStatus};
            const order=await Order.findOneAndUpdate(filter,update,{new:true});
            return order;
        },
     
        updatePaymentStatus:async(_,{orderCode,paymentStatus})=>{
            const filter={orderCode:orderCode}
            const update={paymentStatus:paymentStatus};
            const order= await Order.findOneAndUpdate(filter,update,{new:true});
            return order;
        },
        deleteOrder:async(_,{orderCode})=>{
            const filter={orderCode:orderCode}
            const order=await Order.findOneAndDelete(filter);
            return "Order Deleted";
        }
      
       
    }
}