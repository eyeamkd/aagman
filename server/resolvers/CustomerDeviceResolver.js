const CustomerDevice=require("./../models/CustomerDevice");
const Order=require("./../models/order");

module.exports= {
    Query: {
        customerdevices:() => CustomerDevice.find(),
        customerdevice:(parent, {id}) => CustomerDevice.findById(id),
        getCustomerToken: async (parent, {orderId}) => {
            const customerDevice = await CustomerDevice.findOne({order: orderId});
            return customerDevice.fcmToken;
        }
    },

    Mutation: {
        createCustomerDevice: async(_, { fcmToken, active, createdAt, orderId}) => {
            const customerdevice = new CustomerDevice({fcmToken, active, createdAt, order: orderId });
            await customerdevice
            .save().then(result=>{
                return Order.findById(orderId);
            })
            .then(order=>{
                order.customerDevices.push(customerdevice);
                return order.save()
            });;
            return "CustomerDevice Created";
        },
        deleteCustomerDevice: async(_, { fcmToken, orderId }) => {
            const customerDevice = await CustomerDevice.findOne({fcmToken: fcmToken, order: orderId});
            await CustomerDevice.findByIdAndDelete(customerDevice._id);
            return "Customer Device Deleted";
        }
    }
}