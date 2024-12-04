import React,{useState} from 'react';
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
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/SignUpPage.css';

function SignUpPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success", 
      });

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Name must be at least 3 characters long").required("Required"),
        email: Yup.string().email('Please enter a valid email').required("Required"),
        password: Yup.string().min(8, "Password should be at least 8 characters long").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Passwords don't match").required("Required")
    });

    const onSubmit = async (values, props) => {
        register(values.name, values.email, values.password);
        
            setSnackbar({
              open: true,
              message: "Successfully Registred!",
              severity: "success",
            });
            navigate("/login");
          
        
        props.setSubmitting(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
      };

    return (
        <>
        <Box className="signup-container">
      <Paper variant="outlined" className="signup-paper">
        <Grid align="center">
          <Avatar style={{ backgroundColor: "#1bbd7e" }}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 className="signup-title">SignUp</h2>
          <Typography variant="caption">Please Signup Here!</Typography>
        </Grid>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {(props) => (
                         <Form style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <Field  style={{ marginBottom:'15px' }} as={TextField} label='Name' name="name" placeholder='Enter your name' fullWidth
                                helperText={<ErrorMessage name="name"  />} />
                            <Field   style={{ marginBottom:'15px' }} as={TextField} label='Email Address' name="email" placeholder='Enter your email' fullWidth
                                helperText={<ErrorMessage name="email"  />} />
                            <Field  style={{ marginBottom:'15px' }} as={TextField} label='Password' name="password" placeholder='Enter password' type='password'
                                fullWidth helperText={<ErrorMessage name="password" />} />
                            <Field  style={{ marginBottom:'15px' }} as={TextField} label='Confirm Password' name="confirmPassword"
                                placeholder='Confirm your password' type='password' fullWidth
                                helperText={<ErrorMessage name="confirmPassword" />} />
                            <Button 
                            className="signup-button"
                            style={{backgroundColor:'#1bbd7e'}}
                            type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                fullWidth>{props.isSubmitting ? "Loading" : "Sign up"}</Button>
                        </Form>
                    )}
                </Formik>
                <Typography> Already have an account?
                    <Link href="login">Sign In</Link>
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

export default SignUpPage;
