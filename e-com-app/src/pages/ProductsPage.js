import React, { useState } from "react";
import ProductComponent from "../components/ProductComponent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import CartComponent from "../components/CartComponent";
import productsData from "../data/ProductsData";
import '../styles/ProductsPage.css';

function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split("-").map(Number);
    setPriceRange({ min, max });
  };

  const filteredProducts = productsData.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (category ? product.category === category : true) &&
      product.price >= priceRange.min &&
      product.price <= priceRange.max
    );
  });

  return (
    <Box className="products-container">
      <Typography variant="h4" className="title">
        Products
      </Typography>
      <CartComponent />
      <Grid container spacing={2} className="filter-section">
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search by name"
            variant="outlined"
            value={search}
            onChange={handleSearch}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Select
              labelId="category-select-label"
              defaultValue=""
              onChange={handleCategoryChange}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Kids">Kids</MenuItem>
              <MenuItem value="Womens">Womens</MenuItem>
              <MenuItem value="Mens">Mens</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Select
              labelId="price-range-select-label"
              onChange={handlePriceChange}
              defaultValue="0-Infinity"
            >
              <MenuItem value="0-Infinity">All Prices</MenuItem>
              <MenuItem value="0-10">Below $10</MenuItem>
              <MenuItem value="10-40">$10 - $40</MenuItem>
              <MenuItem value="40-Infinity">Above $40</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductComponent product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductsPage;
