const Item=require("./../models/Item");
const Category = require("./../models/Category");

module.exports= {
    Query: {
        items:() => Item.find(),
        item:(parent, {id}) => Item.findById(id),
    },

    Mutation: {
        createItem: async(_, { Name,Description,Availability,Type,Price,Rating,BestSeller,Photo,CategoryId }) => {
            const item = new Item({ Name,Description,Availability,Type,Price,Rating,BestSeller,Photo });
            await item
            .save().then(result=>{
                return Category.findById(CategoryId);
            })
            .then(category=>{
                category.Items.push(item);
                return category.save()
            });
            return "Item Created";
        }

    }
}