import React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { ShoppingCart } from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

function CartComponent() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '10px',
        marginBottom:'20px',
        justifyContent: { xs: 'center', sm: 'flex-start' },
      }}
      onClick={handleNavigateToCart}
    >
      <Badge badgeContent={totalQuantity} color="primary" sx={{ marginRight: 1 }}>
        <ShoppingCart color="action" />
      </Badge>
      <Typography variant="body1" color="text.primary">
        View My Cart
      </Typography>
    </Box>
  );
}

export default CartComponent;
