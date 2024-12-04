import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useCart } from "../contexts/CartContext";

function ProductComponent({ product }) {
  const { addItemToCart } = useCart();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = () => {
    addItemToCart(product);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Card sx={{ width:250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="160"
            image={product.image}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h6">
              {product.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography gutterBottom variant="h6">
              ${product.price.toFixed(2)}
            </Typography>
            <Button variant="outlined" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {product.name} added to the cart!
        </Alert>
      </Snackbar>
    </>
  );
}

export default ProductComponent;
