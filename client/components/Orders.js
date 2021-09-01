import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_CODE } from '../GraphQL/Queries/UsersQueries';
import {GET_STORE_MENU_ITEMS} from '../GraphQL/Queries/StoreQueries';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.3),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.5),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
    color: "black"
  },
  menuTable: {
    margin: "20px 0",
  },
  appBar: {
    borderRadius: "20px",
    backgroundColor: "#0d47a1",
    color: "white"
  }
}));


export default function Orders(props) {
  const { data, loading, error } = useQuery(GET_STORE_MENU_ITEMS,
    {
      variables: {
        ordersDashboardStoreId: "612ce82e79045644d4ea287f"
      }
    })

  const classes = useStyles();
  if (loading)
    return (<div>Loading...</div>);

  else if (error)
    return (<div>Error! ${error.message}</div>);

  else {
    console.log(data)
    const orders = Object.values(data)[0].orders
    console.log(orders);
    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap>
                Recent Orders
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.menuTable}>
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
                <TableRow key={row.orderCode}>
                  <TableCell>{row.orderCode}</TableCell>

                  <TableCell>

                    <tr>
                      <TableCell><b>Name</b></TableCell>
                      <TableCell><b>Quantity</b></TableCell>
                      <TableCell><b>Cost</b></TableCell>
                    </tr>


                    {
                      row.itemsList.map((subrow) => (
                        <tr align="center" key={subrow.name}>

                          <td>{subrow.name}</td>
                          <td>{subrow.quantity}</td>
                          <td>₹{subrow.price}</td>

                        </tr>


                      ))
                    }

                  </TableCell>
                  <TableCell>₹{row.bill.totalCost}</TableCell>
                  <TableCell>{row.bill.paymentMode}</TableCell>
                  <TableCell>{row.bill.paymentStatus}</TableCell>
                  <TableCell align="right">{row.orderStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}