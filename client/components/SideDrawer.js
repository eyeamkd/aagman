import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { DISPLAY_MENU } from '../GraphQL/Queries/MenuQueries';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
    list: {
        backgroundColor: "#83c3f7",
        width: 250,
        fontSize: 25,
        fontWeight: 500
    },
    fullList: {
        width: "auto",
    },
});

export default function TemporaryDrawer({ children }) {
    const classes = useStyles();
    const [state, setState] = React.useState({ left: false });
    const [menuId, setmenuId] = useState("");
    const { query } = useRouter();
    useEffect(() => {
        console.log("This is the menu's document id received.", query.menuId);
        setmenuId(query.menuId);
    }, []);

    const { data, loading, error } = useQuery(DISPLAY_MENU,
        {
            variables: {
                displayMenuMenuId: menuId
            }
        });

    if (loading) return 'Loading...';

    if (error) return `Error! ${error.message}`;

    const menu = Object.values(data);
    console.log(menu);

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
                        <ListItem button key={category.name}>
                            <ListItemText primary={category.name} />
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