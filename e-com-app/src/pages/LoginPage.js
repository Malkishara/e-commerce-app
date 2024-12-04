import React, { useState } from "react";
import {
  Box,
  Paper,
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/LoginPage.css";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
 
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", 
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values, props) => {
    const success = login(values.email, values.password);
    if (success) {
      setSnackbar({
        open: true,
        message: "Successfully logged in!",
        severity: "success",
      });
      navigate("/products");
    } else {
      setSnackbar({
        open: true,
        message: "Invalid email or password!",
        severity: "error",
      });
    }
    props.setSubmitting(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Box className="login-container">
        <Paper variant="outlined" className="login-paper">
          <Grid align="center">
            <Avatar style={{ backgroundColor: "#1bbd7e" }}>
              <LockOutlined />
            </Avatar>
            <h2 className="login-title">Sign In</h2>
            <Typography variant="caption">Please login here!</Typography>
          </Grid>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => (
              <Form style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Field
                  style={{ marginBottom: "20px" }}
                  as={TextField}
                  label="Email Address"
                  name="email"
                  placeholder="Enter your email"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                />
                <Field
                  style={{ marginBottom: "20px" }}
                  as={TextField}
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  fullWidth
                  helperText={<ErrorMessage name="password" />}
                />
                <Button
                  className="login-button"
                  style={{ backgroundColor: "#1bbd7e" }}
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={props.isSubmitting}
                  fullWidth
                >
                  {props.isSubmitting ? "Loading" : "Sign in"}
                </Button>
              </Form>
            )}
          </Formik>
          <Typography>
            <Link href="#">Forgot password?</Link>
          </Typography>
          <Typography>
            Don't have an account? <Link href="signup">Sign Up</Link>
          </Typography>
        </Paper>
      </Box>

      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginPage;
