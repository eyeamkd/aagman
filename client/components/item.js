import React,{useEffect,useState,useRef} from 'react';
import {useQuery,gql} from '@apollo/client';
import {useMutation} from '@apollo/client';
import {v1 as uuidv1} from 'uuid';
import QRCode from 'qrcode';
import {LOAD_ITEMS,
    GET_ITEMS} from '../GraphQL/Queries/ItemsQueries';
import {CREATE_ITEMS,
        DELETE_ITEMS,
        UPDATE_ITEMS
        } from '../GraphQL/Mutations/ItemsMutation';
import dynamic from 'next/dynamic';
const QrReader = dynamic(() => import('react-qr-scanner'), {
    ssr: false
})

function order(){
    const {error, loading,data} = useQuery(LOAD_ITEMS);
    const [scanResultFile,setScanResultFile]=useState("");
    const {data:dataSingleOrder,refetch}=useQuery(GET_ITEMS,
        {variables:{
            getItemByCodeItemCode:scanResultFile
        }})
    const [createItems]= useMutation(CREATE_ITEMS);
    const [deleteItems]= useMutation(DELETE_ITEMS);
    const [updateItems]=useMutation(UPDATE_ITEMS);
    const [qrCode,setQrCode]=useState("");
    const [qrCodeData,setQrCodeData]=useState("");
    const [imageUrl,setImageUrl]=useState("");
   
    const qrRef = useRef(null);

    const createItemsFunction=async()=>{
        
        try{
            setQrCodeData(uuidv1());
            setQrCode(await QRCode.toDataURL(qrCodeData));
            setImageUrl(qrCode);
            createItems({
                variables:{
                    createItemItemCode:qrCodeData,
                    createItemItemSubTopic:[{"itemsName": "Vegetables","items":[{"Name": "Tomato","Description": "Red Color","Quantity": 3,"Status":"Available","Cost": 23},{"Name": "Onion","Description": "purple","Quantity": 4,"Status":"Not Available","Cost":34}]}]
                }
            })
        }
        catch(error){
            console.log(error);
        }

       
    }

    const handleErrorFile=(error)=>{
        console.log(error);
    }

    const handleScanFile=(result)=>{
        
      if(result){
        setScanResultFile(result.text);
        console.log(scanResultFile)
        refetch();
     
     
      }
    }

     const getItems=()=>{
         console.log(dataSingleOrder);
     }

     const updateItemsFunction=(e)=>{
         updateItems({
             variables:{
                updateItemItemCode:scanResultFile,
                updateItemItemSubTopic:[{"itemsName": "Vegies","items":[{"Name": "Tomato","Description": "Red Color","Quantity": 3,"Status":"Available","Cost": 23},{"Name": "Onion","Description": "purple","Quantity": 4,"Status":"Not Available","Cost":34}]}]
             }
         })
     }

    const deleteItemsFunction=(e)=>{
        deleteItems({
            variables:{
                deleteItemItemCode:scanResultFile
            }
        })

    }


   

    return(
        <div>
           <br/>
        
        <h1 onClick={()=>createItemsFunction()}> Create Items</h1>
        {qrCode?(<a href={qrCode} download><img src={qrCode} alt="image"/></a>):null}
      <h1 onClick={getItems}>Get Item</h1>
        <QrReader
       
        delay={300}
        style={{width:'100%'}}
        onError={handleErrorFile}
        onScan={handleScanFile}
        />
       <h3>Scanned Code:</h3>
       <h1 onClick={updateItemsFunction}>Update Items</h1>
        <h1 onClick={deleteItemsFunction}>Delete Item</h1>
    

          
     
        </div>
    )
}

export default order;