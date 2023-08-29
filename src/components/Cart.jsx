import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../actions/cartActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Box, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Card from "@mui/material/Card";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Cart = () => {
    const cartItems = useSelector(state => state.cartItems);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleRemove = (item) => {
        dispatch(removeFromCart(item));
    };

    return (
        <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', gap: 8, color: '#0E6BCE' }}>
                <ArrowBackIcon /> Back to Store
            </Link>
            <h1>Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <div style={{ width: '100%' }}>
                        <TableContainer component={Paper} >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" style={{width: '20%'}}>Image</TableCell>
                                        <TableCell align="center" style={{width: '20%'}}>Name</TableCell>
                                        <TableCell align="center" style={{width: '20%'}}>Price</TableCell>
                                        <TableCell align="center" style={{width: '20%'}}>Quantity</TableCell>
                                        <TableCell align="center" style={{width: '20%'}}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">
                                                <img src={item.images[0]} alt={item.title} height="50"/>
                                            </TableCell>
                                            <TableCell align="center">{item.title}</TableCell>
                                            <TableCell align="center">${item.price}</TableCell>
                                            <TableCell align="center">
                                                <Box
                                                    display="flex"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <Button
                                                        size="small"
                                                        onClick={handleDecreaseQuantity}
                                                    >
                                                        -
                                                    </Button>
                                                    <input value={quantity} style={{
                                                        width: 20,
                                                        textAlign: "center",
                                                        paddingInline: 16,
                                                        paddingTop: 16,
                                                        paddingBottom: 16,
                                                        marginInline: 10,
                                                        border: "1px solid lightgray",
                                                        borderRadius: 4,
                                                    }}/>
                                                    <Button
                                                        size="small"
                                                        onClick={handleIncreaseQuantity}
                                                    >
                                                        +
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() => handleRemove(item)}
                                                    color="error"
                                                >
                                                    <DeleteIcon/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div style={{ width: '100%', marginTop: 20 }}>
                        <Card variant="outlined" component={Paper} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingInline: 10,
                        }}>
                            <h3>Total: ${cartItems.reduce((a, c) => a + c.price * quantity, 0)}</h3>
                            <Button variant="contained" color="primary">
                                Checkout
                            </Button>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
