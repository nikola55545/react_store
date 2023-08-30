import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {addToCart, addToFavorites, removeFromCart, removeFromFavorites} from '../actions/cartActions';
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";

const FavoritesPage = () => {
    const favoriteItems = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    const handleRemoveFromFavorites = (productId) => {
        dispatch(removeFromFavorites(productId));
    };

    return (
        <div>
            <h2>Your Favorites</h2>
            <Grid container spacing={2} justifyContent="flex-start">
                {favoriteItems.length === 0 ? (
                    <div>No items found.</div>
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
