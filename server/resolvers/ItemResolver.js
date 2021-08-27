const Item =require("./../models/item");
const Categories=require("./../models/categories");
const User =require('./../models/user')
const ItemsList =require("../models/items");


module.exports= {
    Query: {
        items:() => Item.find(),
        item:(parent, {id}) => Item.findById(id),
        getItemByCode: (_, {itemCode}) =>{
            const filter = { itemCode: itemCode }
            const items = Item.findOne(filter).populate({
                path:'categories',
                populate:{
                    path:'items'
                }
            })
            return items;
        }, 
       
    },

    Mutation: {
      createItem: async(_,{itemCode,email})=>{
          const item = new Item({itemCode,categories:[],ownerUser:[]});
          await item.save()
          .then(result=>{
              return User.findOne({email:email})
          })
          .then(user=>{
              item.ownerUser.push(user);
              item.save();
          })
          return item;
      },
      addCategory:async(_,{categoryName,itemCode})=>{
          const category= new Categories({categoryName,ItemsList:[]});
          await category.save().then(result=>{
              return Item.findOne({itemCode:itemCode})
          })
          .then(item=>{
              console.log(item)
              item.categories.push(category);
              return item.save()
          });
          return category;
      },
      addItems:async(_,{categoryId,name,description,cost,status})=>{
          const item=new ItemsList({name,description,status,cost});
          await item.save()
          .then(result=>{
              return Categories.findById(categoryId)
          })
          .then(category=>{
              category.items.push(item);
              return category.save();
          })
          return item;
      }     
    }
}