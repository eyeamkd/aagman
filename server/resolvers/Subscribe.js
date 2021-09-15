const subscribers=[];
const onMessageUpdates=(fn)=>{console.log("Yes");subscribers.push(fn)};
module.exports={
   subscribers,
   onMessageUpdates
}