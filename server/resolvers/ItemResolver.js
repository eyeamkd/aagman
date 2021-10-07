//import { Stream } from "stream";

// const {stream} = require("stream")

const Item=require("./../models/Item");
const Category = require("./../models/Category");
const path=require('path');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
const mongodb = require('mongodb');
const {GraphQLUpload,graphqlUploadExpress } = require('graphql-upload');


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
        items:() => Item.find(),
        item:(parent, {id}) => Item.findById(id),
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
        //    const stream=bucket.openDownloadStreamByName(id)
        //    let buffer
        //    stream.on('data',(chunk)=>{
        //        console.log(chunk)
        //        return chunk.toString('base64');
        //    })

        }
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
        },
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
        deleteItem:async(_,{itemId,categoryId})=>{
            Category.findById(categoryId).then(result=>{
                result.items.pop(itemId)
                result.save()
            })
            const photoName=await Item.findById(itemId)
            .then(result=>{
                console.log(result.photo)
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

        uploadImage:async(_,{file})=>{
          const {createReadStream,filename,mimetype,encoding}=await file
          const {ext}=path.parse(filename);
          const generatedFileName=generateRandomString(12)+ext
          console.log(generatedFileName)
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
        uploadUpdatedImage:async(_,{file,oldfilename})=>{

            const {createReadStream,filename,mimetype,encoding}=await file

            const {ext}=path.parse(filename);
            const generatedFileName=generateRandomString(12)+ext
            const bucket=new mongodb.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
           if(oldfilename!="0"){
           
            const documents=await bucket.find({filename:oldfilename}).toArray();
            console.log(documents)
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
        deleteImage:async(_,{filename})=>{

            const bucket=new mongodb.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
            
             const documents=await bucket.find({filename:filename}).toArray();
             console.log(documents)
             Promise.all(
                 documents.map((doc) => {
                  return bucket.delete(doc._id);
                 }));
             return "Deleted Image"

        }

    }
   
}