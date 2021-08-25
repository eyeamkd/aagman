import React,{useEffect,useState} from 'react';
import {useQuery,gql} from '@apollo/client';
import {useMutation} from '@apollo/client';
import {LOAD_ORDERS,
        ORDERS_GET_PAYMENT_STATUS,
        ORDERS_GET_ORDERS_STATUS,
        GET_ORDERS_BY_CODE} from '../GraphQL/Queries/OrdersQueries';
import {CREATE_ORDERS,

         UPDATE_ORDER_STATUS,
         UPDATE_PAYMENT_STATUS,
         DELETE_ORDER} from '../GraphQL/Mutations/OrdersMutation';

function order(){
    const {error, loading,data:data_entire} = useQuery(LOAD_ORDERS)
    const {data:data_payment}=useQuery(ORDERS_GET_PAYMENT_STATUS,{
        variables:{
            getOrderByPaymentStatusPaymentStatus:"Not Done"
        }
    });
    const{data:data_orderstatus}=useQuery(ORDERS_GET_ORDERS_STATUS,{
        variables:{
            getOrderByOrderStatusItemStatus:"Available"
        }
    })
    const{data:data_ordercode}=useQuery(GET_ORDERS_BY_CODE,{
        variables:{
            getOrderByCodeOrderId:89987
        }
    })
    const [createOrders]= useMutation(CREATE_ORDERS);
    const [updateOrderStatus]=useMutation(UPDATE_ORDER_STATUS);
    const [updatePaymentStatus]=useMutation(UPDATE_PAYMENT_STATUS);
    const [deleteOrder]=useMutation(DELETE_ORDER);
    const [users,setUsers]=useState([]);

    const getOrders=(e)=>{
        console.log(data_entire);
    }

    const getOrderByCodeFunction=(e)=>{
        console.log(data_ordercode);
    }

    const getPaymentStatusFunction=(e)=>{
     console.log(data_payment);
    }

    const getOrdersStatusFunction=(e)=>{
     console.log(data_orderstatus);
    }

    const createOrdersFunction=(e)=>{
        createOrders({
            variables:{
                createOrderEmail:"gj7097@srmist.edu.in",
                createOrderOrderId:10938,
                createOrderTotalCost:15,
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
                updateOrderStatusOrderId:10938,
                updateOrderStatusItemStatus:"Finished"
            }
        })
    }

    const updatePaymentStatusFunction=(e)=>{
         updatePaymentStatus({
             variables:{
                updatePaymentStatusOrderId:10938,
                updatePaymentStatusPaymentStatus:"Done"
             }
         })
    }

    const deleteOrderFunction=(e)=>{
         deleteOrder({
             variables:{
                deleteOrderOrderId:10938
             }
         })
    }

   

    return(
        <div>
           <br/>
        <h1 onClick={getOrders}>Get Orders</h1>
        <h1 onClick={getOrderByCodeFunction}>Get Orders by Code</h1>
        <h1 onClick={createOrdersFunction}> Create Orders</h1>
        <h1 onClick={updateOrderStatusFunction}>Update Order Status</h1>
        <h1 onClick={updatePaymentStatusFunction}>Update Payment Status</h1>
        <h1 onClick={getPaymentStatusFunction}>Get Orders Payment Status</h1>
        <h1 onClick={getOrdersStatusFunction}>Get Orders Status</h1>
        <h1 onClick={deleteOrderFunction}>Delete Order</h1>
          
     
        </div>
    )
}

export default order;