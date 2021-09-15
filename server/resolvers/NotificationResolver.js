const Notification=require("./../models/Notification");
const User=require("./../models/user");

module.exports= {
    Query: {
        notifications:() => Notification.find(),
        notification:(parent, {id}) => Notification.findById(id),
       
    },

    Mutation: {
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