import React,{useEffect,useState} from 'react';
import {useQuery,gql} from '@apollo/client';
import {useMutation} from '@apollo/client';
import {LOAD_ORDERS} from '../GraphQL/Queries';
import {CREATE_ORDERS,
         UPDATE_ORDER_STATUS,
        UPDATE_PAYMENT_STATUS} from '../GraphQL/Mutations';

function order(){
    const {error, loading,data} = useQuery(LOAD_ORDERS)
    const [createOrders]= useMutation(CREATE_ORDERS);
    const [updateOrderStatus]=useMutation(UPDATE_ORDER_STATUS);
    const [updatePaymentStatus]=useMutation(UPDATE_PAYMENT_STATUS);
    const [users,setUsers]=useState([]);
    const getOrders=(e)=>{
        
        console.log(data);
    }
    const createOrdersFunction=(e)=>{
        createOrders({
            variables:{
                createOrderOrderCode:10938,
                createOrderCost:15,
                createOrderItemStatus:"Packing",
                createOrderPaymentMode:"Cash",
                createOrderItemList:[{"itemName":"Cheese","itemCost":15,"itemQuantity":1}],
                createOrderPaymentStatus:"Not Done"
            }
        })
    }
    const updateOrderStatusFunction=(e)=>{
        updateOrderStatus({
            variables:{
                updateOrderStatusOrderCode:10938,
                updateOrderStatusItemStatus:"Packing"
            }
        })
    }

    const updatePaymentStatusFunction=(e)=>{
         updatePaymentStatus({
             variables:{
                updatePaymentStatusOrderCode:10938,
                updatePaymentStatusPaymentStatus:"Done"
             }
         })
    }
   

    return(
        <div>
           <br/>
        <h1 onClick={getOrders}>Get Orders</h1>
        <h1 onClick={createOrdersFunction}> Create Orders</h1>
        <h1 onClick={updateOrderStatusFunction}>Update Order Status</h1>
        <h1 onClick={updatePaymentStatusFunction}>Update Payment Status</h1>
          
     
        </div>
    )
}

export default order;