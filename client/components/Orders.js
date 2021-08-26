import React, { useState, useEffect } from 'react'
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import {useQuery,gql} from '@apollo/client';
import {LOAD_USERS,
  GET_USER_BY_CODE,
  GET_USERS_BY_LOCATION} from '../GraphQL/Queries/UsersQueries';

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
}));


export default function Orders(props) {
  const {data,loading, error}=useQuery(GET_USER_BY_CODE,
    {variables:{
        userExistsEmail:props.email
    }})
 
  const classes = useStyles();
  if (loading) 
      return (<div>Loading...</div>);

  else if (error) 
      return (<div>Error! ${error.message}</div>);

  else
  {
    const orders=Object.values(data)[0].orders
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order Code</TableCell>
           <TableCell>Orders</TableCell>
            <TableCell>Total Cost</TableCell>
            <TableCell>Payment Mode</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell align="right">Item Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row.orderId}>
              <TableCell>{row.orderId}</TableCell>
             
              <TableCell>
                
                  <tr>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Quantity</b></TableCell>
                  <TableCell><b>Cost</b></TableCell>
                  </tr>
                
          
                  {
                    row.itemList.map((subrow)=>(
                      <tr align="center"  key={subrow.itemName}>
                      
                      <td>{subrow.itemName}</td>
                      <td>{subrow.itemQuantity}</td>
                      <td>₹{subrow.itemCost}</td>
                      
                      </tr>
                     
                      
                    ))
                  }
            
              </TableCell>
                
          
              <TableCell>₹{row.totalCost}</TableCell>
              <TableCell>{row.paymentMode}</TableCell>
              <TableCell>{row.paymentStatus}</TableCell>
              <TableCell align="right">{row.itemStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );}
}