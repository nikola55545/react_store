import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import {addToCart, addToFavorites, removeFromCart, removeFromFavorites} from '../actions/cartActions';
import {Box, IconButton, InputAdornment, MenuItem, Pagination, TextField} from '@mui/material';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Home = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const favoriteItems = useSelector(state => state.favorites);
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');

    const isItemInFavorites = (productId) => {
        return favoriteItems.includes(productId);
    };

    const handleFavoriteToggle = (productId) => {
        if (isItemInFavorites(productId)) {
            dispatch(removeFromFavorites(productId));
        } else {
            dispatch(addToFavorites(productId));
        }
    };


    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setSelectedCategory(selectedCategory);
    };


    useEffect(() => {
        setIsLoading(true);

        axios.get('https://dummyjson.com/products')
            .then(response => {
                const productsList = response.data.products;

                const filteredList = searchText
                    ? productsList.filter(product =>
                        product.title.toLowerCase().includes(searchText.toLowerCase())
                    )
                    : productsList;

                const categoryFilteredList = selectedCategory
                    ? filteredList.filter(product => product.category === selectedCategory)
                    : filteredList;

                setProducts(categoryFilteredList);

                const startIndex = (currentPage - 1) * productsPerPage;
                const endIndex = startIndex + productsPerPage;
                const slicedProducts = categoryFilteredList.slice(startIndex, endIndex);

                setFilteredProducts(slicedProducts);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [currentPage, searchText, selectedCategory]);



    const isItemInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 20,
                flexDirection: 'row',
            }}>
                <TextField
                    label="Search products"
                    variant="outlined"
                    value={searchText}
                    onChange={event => setSearchText(event.target.value)}
                    fullWidth={true}
                    style={{marginBottom: 48}}
                />

                <TextField
                    select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    label="Categories"
                    sx={{
                        minWidth: 240,
                    }}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {isLoadingCategories ? (
                        <MenuItem value="">Loading...</MenuItem>
                    ) : (
                        categories.map(category => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))
                    )}
                </TextField>


            </div>

            {isLoading ? (
                <div>Loading...</div>
            ) : (

                <Grid container spacing={2} justifyContent="flex-start">
                    {filteredProducts.length === 0 ? (
                        <div>No items found.</div>
                    ) : (
                        filteredProducts.map(product => (
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
                                            onClick={() => handleFavoriteToggle(product.id)}
                                        >
                                            {isItemInFavorites(product.id) ? (
                                                <FavoriteIcon color="error"/>
                                            ) : (
                                                <FavoriteBorderIcon/>
                                            )}
                                        </IconButton>
                                        {isItemInCart(product.id) ? (
                                            <Button
                                                size="small"
                                                onClick={() => dispatch(removeFromCart(product))}
                                                color="error"
                                            >
                                                <DeleteIcon/>
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
            )}
            {filteredProducts.length > 0 && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 80,
                }}>
                    <Pagination
                        count={Math.ceil(products.length / productsPerPage)}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                        color="primary"
                        size="large"
                    />

                </div>
            )}
        </div>
    );
}

export default Home;
