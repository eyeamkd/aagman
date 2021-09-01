const Category=require("./../models/Category");
const Menu=require("./../models/Menu");
const Item=require("./../models/Item");

module.exports= {
    Query: {
        categories:() => Category.find(),
        category:(parent, {id}) => Category.findById(id),
    },

    Mutation: {
        createCategory: async(_, { name,menuId }) => {
            const category = new Category({name});
            await category
            .save().then(result=>{
                return Menu.findById(menuId);
            })
            .then(menu=>{
                menu.categories.push(category);
                return menu.save()
            });
            return "Category Created";
        },
        //ItemName,Description,Availability,Type,Price,Rating,BestSeller,Photo
       AddMenuItem:async(_,{menuId,categoryName,itemName,description,availability,type,price,rating,bestSeller,photo})=>{
           await Category.findOne({name:categoryName}).then(result=>{
            const item=new Item({name:itemName,description,availability,type,price,rating,bestSeller,photo})
               if(result){
                   item.save().then(items=>{
                    return Category.findById(result.id);
                })
                .then(category=>{
                    category.items.push(item);
                    return category.save()
                });
               }
               else{
                const category = new Category({name:categoryName});
                category.items.push(item);
                item.save()
                category
                .save().then(result=>{
                    return Menu.findById(menuId);
                })
                .then(menu=>{
                    menu.categories.push(category);
                    return menu.save()
                });
                
               }
           })
           return "Menu Item Added"
            
       }

    }
}