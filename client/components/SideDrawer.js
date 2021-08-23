import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from '@material-ui/core/Icon'
import { GET_ITEMS } from '../GraphQL/Queries/ItemsQueries';
import { useQuery, gql } from '@apollo/client';

const useStyles = makeStyles({
    list: {
        width: 250,
        fontSize: 20,
    },
    fullList: {
        width: "auto",
    },
});

export default function TemporaryDrawer({ children }) {
    const classes = useStyles();
    const [state, setState] = React.useState({ left: false });
    const [menuId, setmenuId] = useState("671288");
    const { data, loading, error } = useQuery(GET_ITEMS,
        {
            variables: {
                getItemByCodeItemCode: menuId
            }
        });

    if (loading) return 'Loading...';

    if (error) return `Error! ${error.message}`;

    const menu = Object.values(data);

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom",
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem>Categories</ListItem>
            </List>
            <Divider />
            <List>
                {menu.map(value =>
                    value.categories.map(category =>
                        <ListItem button key={category.categoryName}>
                            <ListItemText primary={category.categoryName} />
                        </ListItem>
                    )
                )}
            </List>
        </div>
    );

    return (
        <div>
            {/* {["left", "right", "top", "bottom"].map((anchor) => ( */}
            <React.Fragment key={"left"}>
                <Button onClick={toggleDrawer("left", true)}>{children}</Button>
                <Drawer
                    anchor={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                >
                    {list("left")}
                </Drawer>
            </React.Fragment>
            {/* ))} */}
        </div>
    );
}