import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(orderCode, itemName, itemCost, itemQuantity, totalCost, paymentMode, paymentStatus, itemStatus) {
  return { orderCode, itemName, itemCost, itemQuantity, totalCost, paymentMode, paymentStatus, itemStatus };
}

const rows = [
  createData(1234, 'Pizza', '150.00', '2', '300.00', 'Cash', 'Completed', 'InProgress'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order Code</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell>Item Cost</TableCell>
            <TableCell>Item Quantity</TableCell>
            <TableCell>Total Cost</TableCell>
            <TableCell>Payment Mode</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell align="right">Item Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.orderCode}>
              <TableCell>{row.orderCode}</TableCell>
              <TableCell>{row.itemName}</TableCell>
              <TableCell>{row.itemCost}</TableCell>
              <TableCell>{row.itemQuantity}</TableCell>
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