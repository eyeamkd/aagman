import { Order } from "./../models/order"
import {User} from './../models/user'


export default {
    Query: {
        orders:() => Order.find(),
        order:(parent, {id}) => Order.findById(id),
        getOrderByCode: (_, {orderId}) =>{
            const filter = { orderId: orderId }
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
        createOrder: async(_, {email, orderId, totalCost, itemStatus ,paymentMode,paymentStatus,itemList }) => {
            const order = new Order({ orderId, totalCost, itemStatus ,paymentMode,paymentStatus,itemList });
            await order.save().then(result=>{
                return User.findOne({email:email})
            })
            .then(user=>{
                console.log(user)
            user.orders.push(order);
            return user.save()
            });
            return order;
        },
        updateOrderStatus:async(_,{orderId,itemStatus})=>{
            const filter={orderId:orderId}
            const update ={itemStatus:itemStatus};
            const order=await Order.findOneAndUpdate(filter,update,{new:true});
            return order;
        },
     
        updatePaymentStatus:async(_,{orderId,paymentStatus})=>{
            const filter={orderId:orderId}
            const update={paymentStatus:paymentStatus};
            const order= await Order.findOneAndUpdate(filter,update,{new:true});
            return order;
        },
        deleteOrder:async(_,{orderId})=>{
            const filter={orderId:orderId}
            const order=await Order.findOneAndDelete(filter);
            return "Order Deleted";
        }
      
       
    }
}