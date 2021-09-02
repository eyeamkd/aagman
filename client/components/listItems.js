import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import router from 'next/router';

export const mainListItems = (
  <div>
    <ListItem button onClick={() => router.push('/orders?email=kunal.viper99%40gmail.com')}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button onClick={() => router.push('/revenue?email=kunal.viper99%40gmail.com')}>
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primary="Total Revenue" />
    </ListItem>
    <ListItem button onClick={() => router.push('/menuitems?email=kunal.viper99%40gmail.com')}>
      <ListItemIcon>
        <MenuBookIcon />
      </ListItemIcon>
      <ListItemText primary="Menu Items" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
  </div>
);
