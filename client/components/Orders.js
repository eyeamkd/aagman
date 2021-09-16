import React, { useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_CODE } from '../GraphQL/Queries/UsersQueries';
import { GET_STORE_MENU_ITEMS } from '../GraphQL/Queries/StoreQueries';
import {UPDATE_ORDER_STATUS} from '../GraphQL/Mutations/OrdersMutation'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import MenuItem from '@material-ui/core/MenuItem';
import DoneIcon from '@material-ui/icons/Done';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { useMutation } from '@apollo/client';

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
  },
  tableCell: {
    width: 200,
    borderWidth: "thin", 
    borderColor: '#D3D3D3',
    borderStyle: 'solid'
},
bolderFont: {
  fontWeight: 600
},
}));


export default function Orders({ storeId }) {
  const menuId = 'status-menu';

  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const [orderId,setOrderId]=useState("")
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);


  const isMenuOpen = Boolean(moreAnchorEl);

  const handleMenuClose = () => {
      setMoreAnchorEl(null);
  };

  const setOrdersItems=(id)=>{
     setOrderId(id);
     console.log(orderId)
  }




  const handleMenuOpen = (event) => {
      setMoreAnchorEl(event.currentTarget);
  };

  const { data, loading, error,refetch } = useQuery(GET_STORE_MENU_ITEMS,
    {
      variables: {
        ordersDashboardStoreId: storeId
      },
      pollInterval:2000
    })
    const changeOrderStatus=(status)=>{
      updateOrderStatus({
        variables: {
          updateOrderStatusOrderId: orderId,
          updateOrderStatusOrderStatus:status
        }
    }).then(refetch)
      console.log(status,orderId)
    }

  const classes = useStyles();
  if (loading)
    return (<div>Loading...</div>);

  else if (error)
    return (<div>Error! ${error.message}</div>);

  else {
    const orders=Object.values(data)[0].orders.slice().reverse()
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
                <TableCell className={[classes.tableCell, classes.bolderFont]}>Order Code</TableCell>
                <TableCell className={[classes.tableCell, classes.bolderFont]}>Orders</TableCell>
                <TableCell className={[classes.tableCell, classes.bolderFont]}>Total Cost</TableCell>
                <TableCell className={[classes.tableCell, classes.bolderFont]}>Payment Mode</TableCell>
                <TableCell className={[classes.tableCell, classes.bolderFont]}>Payment Status</TableCell>
                <TableCell className={[classes.tableCell, classes.bolderFont]} align="right">Item Status</TableCell>
                <TableCell className={[classes.tableCell, classes.bolderFont]} align="right">Modify Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow key={row.orderCode}>
                  <TableCell className={classes.tableCell}>{row.orderCode}</TableCell>

                  <TableCell>

                    <tr>
                      <TableCell className={classes.tableCell}><b>Name</b></TableCell>
                      <TableCell className={classes.tableCell}><b>Quantity</b></TableCell>
                      <TableCell className={classes.tableCell}><b>Cost</b></TableCell>
                    </tr>


                    {
                      row.itemsList.map((subrow) => (
                        <tr align="center" key={subrow.name}>

                          <td className={classes.tableCell}>{subrow.name}</td>
                          <td className={classes.tableCell}>{subrow.quantity}</td>
                          <td className={classes.tableCell}>₹{subrow.price}</td>

                        </tr>


                      ))
                    }

                  </TableCell>
                  <TableCell className={classes.tableCell}>₹{row.bill.totalCost}</TableCell>
                  <TableCell className={classes.tableCell}>{row.bill.paymentMode}</TableCell>
                  <TableCell className={classes.tableCell}>{row.bill.paymentStatus}</TableCell>
                  <TableCell className={classes.tableCell} align="right">{row.orderStatus}</TableCell>
                  <TableCell className={classes.tableCell} align="right"><IconButton
                    aria-label="show more"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={function(event){handleMenuOpen(event);setOrdersItems(row.id)}}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Menu
            anchorEl={moreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem color="inherit" onClick={()=>changeOrderStatus("OrderReceived")}   className={classes.menuItem}>
                <IconButton aria-label="OrderReceived">
                    <CallReceivedIcon  />
                </IconButton>
                <p>OrderReceived</p>
            </MenuItem>
            <MenuItem color="inherit" onClick={()=>changeOrderStatus("Preparing")} className={classes.menuItem}>
                <IconButton aria-label="Preparing">
                    <DonutLargeIcon />
                </IconButton>
                <p>Preparing</p>
            </MenuItem>
            <MenuItem color="inherit" onClick={()=>changeOrderStatus("Completed")}  className={classes.menuItem}>
                <IconButton aria-label="Completed">
                    <DoneIcon />
                </IconButton>
                <p>Completed</p>
            </MenuItem>
        </Menu>
        </div>
      </React.Fragment>
    );
  }
}