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
function createData(orderCode, orders, totalCost, paymentMode, paymentStatus, itemStatus) {
  return { orderCode, orders, totalCost, paymentMode, paymentStatus, itemStatus };
}

function createSubRow(name,cost,quantity){
  return {name,cost,quantity}
}

const rows = [
  createData(1234, ['Name ','Cost ','Quantity'], '300.00', 'Cash', 'Completed', 'InProgress'),
];
const subRow=[
  createSubRow('Pizza',123,2)
]
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
}));

export default function Orders() {

  const {data:dataSingleUser,loading, error}=useQuery(GET_USER_BY_CODE,
    {variables:{
        userExistsEmail:"gj7097@srmist.edu.in"
    }})
    
   // if (loading) return 'Loading...';

   // if (error) return `Error! ${error.message}`;
    
    
   // const orders=Object.values(dataSingleUser)[0].orders







   
  
    

  const classes = useStyles();
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
          {rows.map((row) => (
            <TableRow key={row.orderId}>
              <TableCell>{row.orderId}</TableCell>
             
              <TableCell>orders</TableCell>
                
          
              <TableCell>{row.totalCost}</TableCell>
              <TableCell>{row.paymentMode}</TableCell>
              <TableCell>{row.paymentStatus}</TableCell>
              <TableCell align="right">{row.itemStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}