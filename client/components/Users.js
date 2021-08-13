import React,{useEffect,useState} from 'react';
import {useQuery,gql} from '@apollo/client';
import {useMutation} from '@apollo/client';
import {LOAD_USERS,
        GET_USER_BY_CODE} from '../GraphQL/Queries';
import {CREATE_USERS,
    UPDATE_USERS_PHONENUMBER,
    UPDATE_USERS_LOCATION,
UPDATE_USERS_RESTAURANTNAME} from '../GraphQL/Mutations';

function Users(){
    //const {error, loading,data} = useQuery(LOAD_USERS)
    
    const [createUser]=useMutation(CREATE_USERS);
    const [updatePhoneNumber]=useMutation(UPDATE_USERS_PHONENUMBER);
    const [updateLocation]=useMutation(UPDATE_USERS_LOCATION);
    const [updateRestaurantName]=useMutation(UPDATE_USERS_RESTAURANTNAME);
    const [users,setUsers]=useState([]);
    let {error, loading,data}=useQuery(GET_USER_BY_CODE,
        {variables:{
            userExistsEmail:"k@gmail"
        }})
    
    const getUsers=(e)=>{
        
       // console.log(data);
    }
   const getSingleUserFunction=(e)=>{
   
    
    }
    const createUserFunction=(e)=>{
        createUser({
              variables:{
                createUserEmail:"manasa@gmail",
                createUserFullName:"manasa V",
                createUserRestaurantName:"burgers",
                createUserGstNumber:"WWWWWW7634782",
                createUserLocation:"Mumbai",
                createUserPhoneNumber:"56571287"
                
                
              }
          })
    }
    const updateUserRestaurantNameFunction=(e)=>{
        updateRestaurantName({
            variables:{
                updateRestaurantNameEmail:"manasa@gmail",
                updateRestaurantNameRestaurantName:"Pizzas"
            }
        })

    }
    const updateUserLocationNameFunction=(e)=>{
        updateLocation({
            variables:{
                updateLocationEmail:"manasa@gmail",
                updateLocationLocation:"chennai"
            }
        })
    }
    const updateUserPhoneNumberFunction=(e)=>{
        updatePhoneNumber({
            variables:{
                updatePhoneNumberEmail:"manasa@gmail",
                updatePhoneNumberPhoneNumber:"76768877665454"
            }
        })
        console.log(data_phone);
    }
   

    return(
        <div>
           
        <h1 onClick={getUsers}>Get Users</h1>
        <h1 onClick={getSingleUserFunction}>Get Single User</h1>
        <h1 onClick={createUserFunction}> Create Users</h1>
        <h1 onClick={updateUserRestaurantNameFunction}>Update Users Restaurant</h1>
        <h1 onClick={updateUserLocationNameFunction}>Update Users Location</h1>
        <h1 onClick={updateUserPhoneNumberFunction}>Update Users Phone Number</h1>
          
     
        </div>
    )
}

export default Users;