import { Item } from "./../models/item"


export default {
    Query: {
        items:() => Item.find(),
        item:(parent, {id}) => Item.findById(id),
        getItemByCode: (_, {itemCode}) =>{
            const filter = { itemCode: itemCode }
            const orders = Order.findOne(filter);
            return orders;
        },
        
    },

    Mutation: {
      createItem: async(_,{itemCode,itemSubTopic})=>{
          const item = new Item({itemCode,itemSubTopic});
          await item.save();
          return item;
      },

       
       
    }
}