import React from "react";
import {
    AppBar,
    Toolbar,
    makeStyles,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
    navbarContent: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        "& div": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "& a": {
                color: "white",
                textDecoration: "none",
                padding: "0 1rem",
                "&:hover": {
                    color: "lightgray",
                },
            },
        },
    },
}));

function Navbar() {
    const classes = useStyles();

    return (
        <AppBar elevation={0}
                style={{borderBottomColor: 'lightgray', borderBottomStyle: 'solid', borderBottomWidth: 1}}>
            <Toolbar className={classes.navbarContent}>
                <div>
                    <Link to="/" style={{color: '#0E6BCE'}}>
                        Nikola
                    </Link>
                </div>
                <div>
                    <Link to="/favorites" style={{color: '#0E6BCE'}}>
                        <FavoriteBorderIcon/>
                    </Link>
                    <Link to="/cart" style={{color: '#0E6BCE'}}>
                        <ShoppingCartRoundedIcon/>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;