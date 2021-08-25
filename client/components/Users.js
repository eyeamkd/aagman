import React,{useEffect,useState} from 'react';
import {useQuery,gql} from '@apollo/client';
import {useMutation} from '@apollo/client';
import {LOAD_USERS,
        GET_USER_BY_CODE,
        GET_USERS_BY_LOCATION} from '../GraphQL/Queries/UsersQueries';
import {CREATE_USERS,
        UPDATE_USERS_PHONENUMBER,
        UPDATE_USERS_LOCATION,
        UPDATE_USERS_RESTAURANTNAME,
        DELETE_USER} from '../GraphQL/Mutations/UsersMutation';

function Users(){
   
    const {error, loading,data:dataEntire} = useQuery(LOAD_USERS)
    const {data:dataSingleUser}=useQuery(GET_USER_BY_CODE,
        {variables:{
            userExistsEmail:"manasa@gmail"
        }})
    const {data:dataUsersLocation}=useQuery(GET_USERS_BY_LOCATION,{
        variables:{
            getUsersByLocationLocation:"chennai"
        }
    });
    const [createUser]=useMutation(CREATE_USERS);
    const [updatePhoneNumber]=useMutation(UPDATE_USERS_PHONENUMBER);
    const [updateLocation]=useMutation(UPDATE_USERS_LOCATION);
    const [updateRestaurantName]=useMutation(UPDATE_USERS_RESTAURANTNAME);
    const [deleteUser]=useMutation(DELETE_USER);
    const [users,setUsers]=useState([]);
   
    
    const getUsers=(e)=>{
        
        console.log(dataEntire);
    }
   const getSingleUserFunction=(e)=>{
    
        console.log(dataSingleUser);
    
    }
    const getUsersLocationFunction=(e)=>{
        console.log(dataUsersLocation)
    }
    const createUserFunction=(e)=>{
        createUser({
              variables:{
                createUserEmail:"greeta1999kavitha@gmail.com",
                createUserFullName:"Greeta Kavitha Jayaraj",
                createUserStoreName:"kfc",
                createUserGstNumber:"HKS98787",
                createUserLocation:"chennai",
                createUserPhoneNumber:"987767576"
                
                
              }
          })
    }
    const updateUserRestaurantNameFunction=(e)=>{
        updateRestaurantName({
            variables:{
                updateRestaurantNameEmail:"manasa@gmail",
                updateRestaurantNameStoreName:"sweet"
            }
        })

    }
    const updateUserLocationNameFunction=(e)=>{
        updateLocation({
            variables:{
                updateLocationEmail:"manasa@gmail",
                updateLocationLocation:"bangalore"
            }
        })
    }
    const updateUserPhoneNumberFunction=(e)=>{
        updatePhoneNumber({
            variables:{
                updatePhoneNumberEmail:"manasa@gmail",
                updatePhoneNumberPhoneNumber:"892378798"
            }
        })
        
    }
    const deleteUserFunction=(e)=>{
        deleteUser({
            variables:{
                deleteUserId:"611b83615d16fe50fce48abc"
            }
        })
    }
   

    return(
        <div>
           
        <h1 onClick={getUsers}>Get Users</h1>
        <h1 onClick={getSingleUserFunction}>Get Single User</h1>
        <h1 onClick={getUsersLocationFunction}>Get Users Location</h1>
        <h1 onClick={createUserFunction}> Create Users</h1>
        <h1 onClick={updateUserRestaurantNameFunction}>Update Users Restaurant</h1>
        <h1 onClick={updateUserLocationNameFunction}>Update Users Location</h1>
        <h1 onClick={updateUserPhoneNumberFunction}>Update Users Phone Number</h1>
        <h1 onClick={deleteUserFunction}>Delete User</h1>
          
     
        </div>
    )
}

export default Users;