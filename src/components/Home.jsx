import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'; // Import useDispatch
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';

import {addToCart, removeFromCart} from '../actions/cartActions';
import {Box, InputAdornment, TextField} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

const Home = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems); // Get cart items from the state
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const filteredProducts = products.products?.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        setIsLoading(true); // Set loading to true before fetching
        axios.get('https://dummyjson.com/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setIsLoading(false); // Set loading to false after fetching
            });

        axios.get('https://dummyjson.com/products/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);


    const isItemInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: 4 }}>
                <TextField
                    id="outlined-basic"
                    label="Search..."
                    variant="outlined"
                    sx={{ width: 300 }}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />

            </Box>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <Grid container spacing={2} justifyContent="center">
                    {filteredProducts.length === 0 ? (
                        <div>No items found.</div>
                    ) : (
                        filteredProducts.map(product => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
                                        {isItemInCart(product.id) ? (
                                            <Button
                                                size="small"
                                                onClick={() => dispatch(removeFromCart(product))}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        ) : (
                                            <Button
                                                size="small"
                                                onClick={() => dispatch(addToCart(product))}
                                            >
                                                Add to Cart
                                            </Button>
                                        )}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            )}
        </div>
    );
}

export default Home;
