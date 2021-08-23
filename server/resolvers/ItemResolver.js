import { Item } from "./../models/item"
import {Category} from "./../models/categories"


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
        const up=await Item.categoryName.findOneAndUpdate(filterCategory,updateitem,{new:true})
        return "Updated!";
    },
    
      deleteItem:async(_,{itemCode})=>{
        const filter={itemCode:itemCode}
        const item=await Item.findOneAndDelete(filter);
        return "Item Deleted";
    }

       
       
    }
}