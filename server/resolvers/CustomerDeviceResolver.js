const CustomerDevice=require("./../models/CustomerDevice");
const Order=require("./../models/order");

module.exports= {
    Query: {
        //Get all customer devices
        customerdevices:() => CustomerDevice.find(),
        //Get single customer device by ID
        customerdevice:(parent, {id}) => CustomerDevice.findById(id),
        //Get customer token by orderId
        getCustomerToken: async (parent, {orderId}) => {
            const customerDevice = await CustomerDevice.findOne({order: orderId});
            return customerDevice.fcmToken;
        }
    },

    Mutation: {
        //Create Customer Device
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
        //Delete Customer Device
        deleteCustomerDevice: async(_, { fcmToken, orderId }) => {
            const customerDevice = await CustomerDevice.findOne({fcmToken: fcmToken, order: orderId});
            await CustomerDevice.findByIdAndDelete(customerDevice._id);
            return "Customer Device Deleted";
        }
    }
}