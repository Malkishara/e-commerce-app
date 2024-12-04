import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/CartPage.css'; 

function CartPage() {
    const { cart, removeItemFromCart, updateItemQuantity } = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = (id, increment) => {
        const product = cart.find(item => item.id === id);
        const newQuantity = product.quantity + (increment ? 1 : -1);
        if (newQuantity > 0) {
            updateItemQuantity(id, newQuantity);
        }
    };

    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <Box sx={{ p: 3 }} className="cart-page">
            <Typography variant="h3" className="cart-title">
                My Cart
            </Typography>
            {cart.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <Grid container spacing={4}>
                    
                    <Grid item xs={12} md={8}>
                        <Table sx={{ minWidth: 650 }} className="cart-table" aria-label="cart table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product (Image)</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Total Price</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="cart-item-image"
                                            />
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => handleQuantityChange(item.id, false)}>-</Button>
                                            {item.quantity}
                                            <Button onClick={() => handleQuantityChange(item.id, true)}>+</Button>
                                        </TableCell>
                                        <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => removeItemFromCart(item.id)}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>

                   
                    <Grid item xs={12} md={4}>
                        <Card className="summary-card">
                            <CardContent>
                                <Typography variant="h6">Summary</Typography>
                                <Typography>Total Items: {totalQuantity}</Typography>
                                <Typography>Total Price: ${totalPrice.toFixed(2)}</Typography>
                                <Button
                                
                                    variant="contained"
                                    className="pay-now-button"
                                    onClick={() => alert('Proceed to payment')}
                                    style={{  backgroundColor: '#1bbd7e', marginTop:'10px',marginBottom:'10px' }}
                                >
                                    Pay Now
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    className="add-products-button"
                                    onClick={() => navigate('/products')}
                                >
                                    Add New Products
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}

export default CartPage;
