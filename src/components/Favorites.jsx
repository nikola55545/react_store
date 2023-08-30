import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {removeFromFavorites} from '../actions/cartActions';
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../actions/cartActions';
import Button from '@mui/material/Button';

const FavoritesPage = () => {
    const favoriteItems = useSelector(state => state.favorites);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems);

    const isItemInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    return (
        <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 8, color: '#0E6BCE' }}>
                <ArrowBackIcon /> Back to Store
            </Link>
            <h1>Your Favorites</h1>
            <Grid container spacing={2} justifyContent="flex-start">
                {favoriteItems.length === 0 ? (
                    <p>No items found.</p>
                ) : (
                    favoriteItems.map(product => (
                        <Grid item xs={12} sm={4} md={4} lg={2} key={product.id}>
                            <Card sx={{maxWidth: 350}}>
                                <CardMedia
                                    sx={{height: 140}}
                                    image={product.images[0]}
                                    title={product.title}
                                />
                                <CardContent sx={{height: 150}}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography>{product.price}$</Typography>
                                    <IconButton
                                        size="small"
                                        onClick={() => dispatch(removeFromFavorites(product))}
                                    >
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                    {isItemInCart(product.id) ? (
                                        <Button
                                            size="small"
                                            onClick={() => dispatch(removeFromCart(product))}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                size="small"
                                                onClick={() => dispatch(addToCart(product))}
                                            >
                                                Add to Cart
                                            </Button>

                                        </>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    );
};

export default FavoritesPage;
