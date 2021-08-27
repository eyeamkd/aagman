import React,{useEffect,useState,useRef} from 'react';
import {useQuery,gql} from '@apollo/client';
import {useMutation} from '@apollo/client';
import {v1 as uuidv1} from 'uuid';
import QRCode from 'qrcode';
import {LOAD_ITEMS,
    GET_ITEMS} from '../GraphQL/Queries/ItemsQueries';
import {CREATE_ITEM,
        ADD_CATEGORY,
        ADD_ITEMLIST,
        DELETE_ITEMS,
        UPDATE_ITEMS
        } from '../GraphQL/Mutations/ItemsMutation';
import dynamic from 'next/dynamic';
const QrReader = dynamic(() => import('react-qr-scanner'), {
    ssr: false
})

function order(){
    //const {error, loading,data} = useQuery(LOAD_ITEMS);
    const [scanResultFile,setScanResultFile]=useState("");
    const {data:dataSingleOrder,refetch}=useQuery(GET_ITEMS,
        {variables:{
            getItemByCodeItemCode:scanResultFile
        }})
    const [createItems]= useMutation(CREATE_ITEM);
    const [addCategory]= useMutation(ADD_CATEGORY);
    const [addItemsList]= useMutation(ADD_ITEMLIST);
    const [deleteItems]= useMutation(DELETE_ITEMS);
    const [updateItems]=useMutation(UPDATE_ITEMS);
    const [qrCode,setQrCode]=useState("");
    const [qrCodeData,setQrCodeData]=useState("");
    const [imageUrl,setImageUrl]=useState("");
   
    const qrRef = useRef(null);

    const createItemsFunction=async()=>{
        
        try{
            setQrCodeData(uuidv1());
            if(qrCodeData=="") return;
            setQrCode(await QRCode.toDataURL("https://aagman.herokuapp.com/menu?menuId="+qrCodeData));
            setImageUrl(qrCode);
            createItems({
                variables:{
                    createItemItemCode:qrCodeData,
                    createItemEmail:"gj7097@srmist.edu.in"
                }
            })
        }
        catch(error){
            console.log(error);
        }

       
    }

    const addCategoryFunction=(e)=>{
        console.log(scanResultFile);
        addCategory({
            variables:{
            addCategoryItemCode:scanResultFile,
            addCategoryCategoryName:"Main Course"
            }
        })
    }
    const addItemsListFunction=(e)=>{
        addItemsList({
            variables:{
            addItemsCategoryId:"6128ac81f424c94f6c2e302b",
            addItemsName:"Noodles",
            addItemsDescription:"Its Fried",
            addItemsCost:100,
            addItemsStatus:"Not Available"
            }
        })
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
                updateItemCategories:[{"categoryName": "Vegies","items":[{"name": "Tomato","description": "Red Color","status":"Available","cost": 23},{"name": "Onion","description": "purple","status":"Not Available","cost":34}]}]
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
 
       <h1 onClick={addCategoryFunction}>Add Category</h1>
       <h1 onClick={addItemsListFunction}>Add Item List</h1>
       <h1 onClick={updateItemsFunction}>Update Items</h1>
        <h1 onClick={deleteItemsFunction}>Delete Item</h1>
    

          
     
        </div>
    )
}

export default order;