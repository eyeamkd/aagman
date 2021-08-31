const ItemsList=require("./../models/ItemsList");
const Order=require("./../models/Order");

module.exports= {
    Query: {
        itemslists:() => ItemsList.find(),
        itemslist:(parent, {id}) => ItemsList.findById(id),
    },

    Mutation: {
        createItemsList: async(_, { Name, Quantity ,Price , OrderId }) => {
            const itemslist = new ItemsList({ Name, Quantity ,Price,Order:OrderId});
            await itemsslist
            .save().then(result=>{
                return Order.findById(OrderId);
            })
            .then(order=>{
                order.ItemsList.push(itemslist);
                return order.save()
            });
            return "Items List Created";
        }
    }
}