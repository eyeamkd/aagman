const ItemsList=require("./../models/ItemsList");
const Order=require("./../models/Order");

module.exports= {
    Query: {
        itemslists:() => ItemsList.find(),
        itemslist:(parent, {id}) => ItemsList.findById(id),
    },

    Mutation: {
        createItemsList: async(_, { name, quantity ,price , orderId }) => {
            const itemslist = new ItemsList({ name, quantity ,price,Order:orderId});
            await itemsslist
            .save().then(result=>{
                return Order.findById(orderId);
            })
            .then(order=>{
                order.itemsList.push(itemslist);
                return order.save()
            });
            return "Items List Created";
        }
    }
}