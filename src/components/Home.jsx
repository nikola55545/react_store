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
import {addToCart, removeFromCart} from '../actions/cartActions';
import {Box, Pagination, TextField} from '@mui/material';

const Home = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        setIsLoading(true);

        axios.get('https://dummyjson.com/products')
            .then(response => {
                const productsList = response.data.products;

                // Filter products based on search text
                const filteredList = searchText
                    ? productsList.filter(product =>
                        product.title.toLowerCase().includes(searchText.toLowerCase())
                    )
                    : productsList;

                setProducts(filteredList);

                const startIndex = (currentPage - 1) * productsPerPage;
                const endIndex = startIndex + productsPerPage;
                const slicedProducts = filteredList.slice(startIndex, endIndex);

                setFilteredProducts(slicedProducts);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [currentPage, searchText]);


    const isItemInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    return (
        <div>
            <TextField
                label="Search products"
                variant="outlined"
                value={searchText}
                onChange={event => setSearchText(event.target.value)}
                fullWidth
                style={{ marginBottom: 20 }}
            />

            {isLoading ? (
                <div>Loading...</div>
            ) : (

                <Grid container spacing={2} justifyContent="center">
                    {filteredProducts.length === 0 ? (
                        <div>No items found.</div>
                    ) : (
                        filteredProducts.map(product => (

                            <Grid item xs={12} sm={6} md={4} lg={2} key={product.id}>
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
                                                <DeleteIcon/>
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
