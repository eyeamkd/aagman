
const Item=require("./../models/Item");
const Category = require("./../models/Category");
const path=require('path');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const {GraphQLUpload } = require('graphql-upload');


function generateRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}



module.exports= {
    Upload: GraphQLUpload,
    Query: {
        //Get all Items
        items:() => Item.find(),
        //Get single Item by ID
        item:(parent, {id}) => Item.findById(id),
        //Get Image by unique file name
        retrieveImage :async(parent,{imageName})=>{
            const bucket=new mongodb.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
            if(imageName=="0")
            return "0"

            return new Promise((resolve, reject) => {
                var data = [];
            
                const readstream = bucket.openDownloadStreamByName(imageName);
                readstream.on('data', function (chunk) {
                  data.push(chunk);
                });
                readstream.on('error', async (error) => {
                  reject(error);
                });
                readstream.on('end', async () => {
                  let bufferBase64 = Buffer.concat(data);
                  const img = bufferBase64.toString('base64');
                  resolve(img);
                });
              });

        }
    },

    Mutation: {
        //Create Item
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
        },
        //Update Item
        updateItem:async(_,{name,description,availability,type,price,rating,bestSeller,photo,itemId})=>{
            const item=await Item.findByIdAndUpdate(itemId,{name:name,
                                                            description:description,
                                                            availability:availability,
                                                            type:type,
                                                            price:price,
                                                            rating:rating,
                                                            bestSeller:bestSeller,
                                                            photo:photo},{new:true})
            item.save()
            return "Item Updated";
        },
        //Delete Item
        deleteItem:async(_,{itemId,categoryId})=>{
            Category.findById(categoryId).then(result=>{
                result.items.pop(itemId)
                result.save()
            })
            const photoName=await Item.findById(itemId)
            .then(result=>{
                return result.photo
            })

            const bucket=new mongodb.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
            
             const documents=await bucket.find({filename:photoName}).toArray();
             Promise.all(
                 documents.map((doc) => {
                  return bucket.delete(doc._id);
                 }));

            await Item.findByIdAndDelete(itemId);
            return "Item Deleted";
        },
        //Upload Image
        uploadImage:async(_,{file})=>{
          const {createReadStream,filename,mimetype,encoding}=await file
          const {ext}=path.parse(filename);
          const generatedFileName=generateRandomString(12)+ext
          const bucket=new mongodb.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
          const uploadStream=bucket.openUploadStream(generatedFileName);
          await new Promise((resolve,reject)=>{
            createReadStream().pipe(uploadStream)
                    .on("error",reject)
                    .on("finish",resolve);
          });

          return {
           id:uploadStream.id,generatedFileName,mimetype,encoding
          }
        },
        //Upload Updated Image
        uploadUpdatedImage:async(_,{file,oldfilename})=>{

            const {createReadStream,filename,mimetype,encoding}=await file

            const {ext}=path.parse(filename);
            const generatedFileName=generateRandomString(12)+ext
            const bucket=new mongodb.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
           if(oldfilename!="0"){
            const documents=await bucket.find({filename:oldfilename}).toArray();
            Promise.all(
                documents.map((doc) => {
                 return bucket.delete(doc._id);
                }));
            }
            const uploadStream=bucket.openUploadStream(generatedFileName);
            await new Promise((resolve,reject)=>{
              createReadStream().pipe(uploadStream)
                      .on("error",reject)
                      .on("finish",resolve);
            });
  
            return {
             id:uploadStream.id,generatedFileName,mimetype,encoding
            }
        },
        //Delete Image
        deleteImage:async(_,{filename})=>{

            const bucket=new mongodb.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
             const documents=await bucket.find({filename:filename}).toArray();
             Promise.all(
                 documents.map((doc) => {
                  return bucket.delete(doc._id);
                 }));
             return "Deleted Image"

        }

    }
   
}