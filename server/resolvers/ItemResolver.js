const Item=require("./../models/Item");
const Category = require("./../models/Category");

const storeFile = async (upload) => {
    const { filename, createReadStream, mimetype } = await upload.then(result => result);

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'files' });
    
    const uploadStream = bucket.openUploadStream(filename, {
      contentType: mimetype
    });
    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(uploadStream)
        .on('error', reject)
        .on('finish', () => {
            resolve(uploadStream.id)
        })
    })
  }

module.exports= {
    Query: {
        items:() => Item.find(),
        item:(parent, {id}) => Item.findById(id),
    },

    Mutation: {
        createItem: async(_, { name,description,availability,type,price,rating,bestSeller,photo,categoryId }) => {
           // const fileId = await storeFile(photo).then(result => result);
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