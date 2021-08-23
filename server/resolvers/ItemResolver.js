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
      createItem: async(_,{itemCode,categories})=>{
          const item = new Item({itemCode,categories});
          await item.save();
          return item;
      },
      updateItem:async(_,{itemCode,categories})=>{
        const filter ={itemCode:itemCode}
        const update = {categories:categories};
        const items= await Item.findOneAndUpdate(filter,update,{new:true});
        return items;
      },
      getItemByCategory:async(_,{itemCode,categoryName,item})=>{
        const filterCode={itemCode:itemCode}
        const filterCategory={categoryName:categoryName}
        const updateitem={item:item}
        const items=Item.find(filter);
        const it =items.find(filter1);
        const up=await it.findOneAndUpdate(it,updateitem,{new:true})
        return up;
    },
    
      deleteItem:async(_,{itemCode})=>{
        const filter={itemCode:itemCode}
        const item=await Item.findOneAndDelete(filter);
        return "Item Deleted";
    }

       
       
    }
}