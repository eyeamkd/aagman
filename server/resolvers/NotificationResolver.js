const Notification=require("./../models/Notification");
const User=require("./../models/user");

module.exports= {
    Query: {
        //Get all notification
        notifications:() => Notification.find(),
        //Get single notification by ID
        notification:(parent, {id}) => Notification.findById(id),
       
    },

    Mutation: {
        //Create Notification
        createNotification: async(_, { title, message, readAt, sentAt, createdAt, userId }) => {
            const notification = new Notification({ title, message, readAt, sentAt, createdAt });
            await notification
            .save().then(result=>{
                return User.findById(userId);
            })
            .then(user=>{
                user.notifications.push(notification);
                return user.save()
            });
            return "Notification Created";
        }

    }
}