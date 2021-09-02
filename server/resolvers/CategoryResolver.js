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
        }

    }
}