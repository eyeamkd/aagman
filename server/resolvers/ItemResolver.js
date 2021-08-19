import { Item } from "./../models/item"


export default {
    Query: {
        items:() => Item.find(),
        item:(parent, {id}) => Item.findById(id),
        getItemByCode: (_, {itemCode}) =>{
            const filter = { itemCode: itemCode }
            const items = Item.findOne(filter);
            return items;
        },
        
    },

    Mutation: {
      createItem: async(_,{itemCode,itemSubTopic})=>{
          const item = new Item({itemCode,itemSubTopic});
          await item.save();
          return item;
      },
      updateItem:async(_,{itemCode,itemSubTopic})=>{
        const filter ={itemCode:itemCode}
        const update = {itemSubTopic:itemSubTopic};
        const items= await Item.findOneAndUpdate(filter,update,{new:true});
        return items;
      },
      deleteItem:async(_,{itemCode})=>{
        const filter={itemCode:itemCode}
        const item=await Item.findOneAndDelete(filter);
        return "Item Deleted";
    }

       
       
    }
}