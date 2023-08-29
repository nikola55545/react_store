import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromFavorites } from '../actions/cartActions';

const FavoritesPage = () => {
    const favoriteItems = useSelector(state => state.favorites);
    const dispatch = useDispatch();

    const handleRemoveFromFavorites = (productId) => {
        dispatch(removeFromFavorites(productId));
    };

    return (
        <div>
            <h2>Your Favorites</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                {favoriteItems.map((product) => (
                    <Card key={product.id}>
                        <CardMedia
                            component="img"
                            alt={product.title}
                            height="140"
                            // image={product.images[0]} // Assuming that your product data structure has an 'images' property
                            title={product.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                        </CardContent>
                        <IconButton
                            size="small"
                            onClick={() => handleRemoveFromFavorites(product.id)}
                        >
                            <DeleteIcon color="error" />
                        </IconButton>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FavoritesPage;
