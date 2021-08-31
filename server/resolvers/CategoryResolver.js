const Category=require("./../models/Category");
const Menu=require("./../models/Menu");
const Item=require("./../models/Item");

module.exports= {
    Query: {
        categories:() => Category.find(),
        category:(parent, {id}) => Category.findById(id),
    },

    Mutation: {
        createCategory: async(_, { Name,MenuId }) => {
            const category = new Category({Name});
            await category
            .save().then(result=>{
                return Menu.findById(MenuId);
            })
            .then(menu=>{
                menu.Categories.push(category);
                return menu.save()
            });
            return "Category Created";
        },
        //ItemName,Description,Availability,Type,Price,Rating,BestSeller,Photo
       AddMenuItem:async(_,{MenuId,CategoryName,ItemName,Description,Availability,Type,Price,Rating,BestSeller,Photo})=>{
           await Category.findOne({Name:CategoryName}).then(result=>{
            const item=new Item({Name:ItemName,Description,Availability,Type,Price,Rating,BestSeller,Photo})
               if(result){
                   item.save().then(items=>{
                    return Category.findById(result.id);
                })
                .then(category=>{
                    category.Items.push(item);
                    return category.save()
                });
               }
               else{
                const category = new Category({Name:CategoryName});
                category.Items.push(item);
                item.save()
                category
                .save().then(result=>{
                    return Menu.findById(MenuId);
                })
                .then(menu=>{
                    menu.Categories.push(category);
                    return menu.save()
                });
                
               }
           })
           return "Menu Item Added"
            
       }

    }
}