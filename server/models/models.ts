class User{
    Id: String
    Email : String 
    FullName : String 
    GSTNumber : String 
    PhoneNumber: String 
    Stores: [Store]  //Object Array
}

class Store{
    Id: String 
    Name : String 
    Rating: Float32Array
    Address : Locations  //Object
    Orders : [Order]    //Object Array
    Owner : User        //Object
    Timings: Timing     //Object
    Menu : Menu         //Object
    Revenue: Revenue    //Object
}

class Timing{ 

    Id : String 
    OpenTime: String 
    CloseTime: String 
    Availability:  TimingAvailability //enum
    Store: Store  //Object
}

enum TimingAvailability{
    open, close 
}

class Locations{ 

    Id : String 
    Country : String 
    State: String 
    City : String 
    Area: String 
    LandMark: String 
}

class Revenue{

    Id: String 
    TotalIncome: Float32Array 
    Bill: [Bill]   //Object Array
    Store: Store 
}

class Menu{ 

    Id: String 
    Store: Store 
    Categories: [Category] //Object Array
}

class Category{

    Id: String 
    Name : String 
    Items : [Item]  //Object Array
}
  

class Item{ 

    Id: String 
    Name : String 
    Description : String 
    Availability : ItemAvailability  //enum                
    VegOrNonVeg: VegOrNonVegItem   //enum                       
    Price : Float32Array 
    Rating : Float32Array 
    BestSeller : BestSellerItem    //enum         
    Photo: String 
}

enum VegOrNonVegItem {
    Veg, NonVeg
}

enum BestSellerItem{
    Yes, No
}

enum ItemAvailability{
    InStock, OutOfStock 
}

  

class Order{ 

    Id: String 
    OrderCode : String 
    OrderStatus : StatusOfOrder   //enum          
    OrderList : [OrderList]     //Object Array
    Store: Store               //Object 
    Bill : Bill                //Object

}

enum StatusOfOrder{
    Order ,Received, Preparing, Completed
}

class Bill{ 

    Id: String 
    TotalCost: Float32Array
    PaymentMode: PaymentTypes       
    PaymentStatus: PaymentStatusTypes  //enum
    Order : Order  //Object
}

enum PaymentStatusTypes{
    Paid , NotPaid 
}

enum PaymentTypes{
    Cash, CreditCard, UPI, DebitCard, Check, NetBanking 
}

class OrderList{

    Id: String 
    Name: String 
    Quantity: Number
    Price: Float32Array 
    Order: Order   //Object
}