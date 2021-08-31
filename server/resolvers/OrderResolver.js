const Order=require("./../models/Order");
const Store=require("./../models/Store");

const Bill=require("./../models/Bill");

module.exports= {
    Query: {
        orders:() => Order.find(),
        order:(parent, {id}) => Order.findById(id),
        
    },

    Mutation: {
        createOrder: async(_, { OrderCode ,OrderStatus,StoreId }) => {
            const orders = new Order({ OrderCode ,OrderStatus,Store:StoreId});
            await orders
            .save().then(result=>{
                return Store.findById(StoreId);
            })
            .then(store=>{
                store.Orders.push(orders);
                return store.save()
            });
            return "Order Created";
        }, 
        //items here is an array of {itemCode, name, quantity, customization}   const order  = new Order({items})

        addOrder:async(_,{OrderCode,OrderStatus,items,StoreId,TotalCost,PaymentMode,PaymentStatus})=>{
            //Add Orders to collection
            const orders=new Order({OrderCode,OrderStatus,Store:StoreId,ItemsList:items})
            await orders.save().then(result=>{
                return Store.findById(StoreId);
            }).then(store=>{
                store.Orders.push(orders);
                return store.save()
            }) 
            //Create Bill and map it with orders and revenue
            const bills = new Bill({ TotalCost,PaymentMode , PaymentStatus});
            await bills
            .save().then(result=>{
                return Order.findById(orders.id);
            })
            .then(order=>{
                order.Bill=bills;
                return order.save()
            })



            return "Order Added";
        }

    }
}