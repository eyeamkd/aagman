const Item=require("./../models/Item");
const Category = require("./../models/Category");

module.exports= {
    Query: {
        items:() => Item.find(),
        item:(parent, {id}) => Item.findById(id),
    },

    Mutation: {
        createItem: async(_, { name,description,availability,type,price,rating,bestSeller,photo,categoryId }) => {
            const item = new Item({ name,description,availability,type,price,rating,bestSeller,photo });
            await item
            .save().then(result=>{
                return Category.findById(categoryId);
            })
            .then(category=>{
                category.items.push(item);
                return category.save()
            });
            return "Item Created";
        }

    }
}