const Feedback=require("./../models/Feedback");
const Store=require("./../models/Store");
const Item=require("./../models/Item")
module.exports= {
    Query: {

    },
    Mutation:{
        addFeedback: async(_, { orderServiceRating,deliveryServiceRating,comment,storeId,overallStoreRating,foodRating,itemsList }) => {
            Store.findById(storeId).then(result=>{
                if(result.rating==0){
                    result.rating+=overallStoreRating;
                }
                else{
                    result.rating=Math.round((result.rating+overallStoreRating)/2,1)
                }
                result.save()
                return result.feedback;
            }
            ).then(result=>{
                return Feedback.findById(result)
            }).then(result=>{
                if(result.orderServiceRating==0){
                    result.orderServiceRating+=orderServiceRating
                }
                else{
                    result.orderServiceRating=Math.round((result.orderServiceRating+orderServiceRating)/2,1)
                }

                if(result.deliveryServiceRating==0){
                    result.deliveryServiceRating+=deliveryServiceRating
                }
                else{
                    result.deliveryServiceRating=Math.round((result.deliveryServiceRating+deliveryServiceRating)/2,1)
                }
                console.log(comment)
                if(comment!=""){
                    result.comments.push(comment);
                }
                result.save()
            })
            for(let i=0;i<itemsList.length;i++){
                Item.findById(itemsList[i]).then(result=>{
                    if(result.rating==0){
                        result.rating+=foodRating
                    }
                    else{
                        result.rating=Math.round((result.rating+foodRating)/2,1)
                    }
                    result.save()
                })
            }


            return "Feedback Added";
        },
    },
}