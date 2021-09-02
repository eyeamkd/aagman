const Order=require("./../models/Order");
const Store=require("./../models/Store");

const Bill=require("./../models/Bill");

module.exports= {
    Query: {
        orders:() => Order.find(),
        order:(parent, {id}) => Order.findById(id),
        
    },

    Mutation: {
        createOrder: async(_, { orderCode ,orderStatus,storeId }) => {
            const orders = new Order({ orderCode ,orderStatus,Store:storeId});
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
        //items here is an array of {itemCode, name, quantity, customization}   const order  = new Order({items})

        addOrder:async(_,{orderCode,orderStatus,items,storeId,totalCost,paymentMode,paymentStatus})=>{
            //Add Orders to collection
            const orders=new Order({orderCode,orderStatus,store:storeId,itemsList:items})
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

            await orders.save()
            



            return "Order Added";
        }

    }
}