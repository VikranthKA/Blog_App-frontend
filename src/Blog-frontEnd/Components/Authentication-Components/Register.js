import React,{ useContext, useState } from 'react';
import swal from 'sweetalert';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../../config/axios';
import {Button, TextField,Box, Typography, Alert} from "@mui/material"
import { ToastContainer } from 'react-toastify';
import Context from '../../Context/Context';

export default function Register() {
  const navigate = useNavigate();
  const [serverErr, setServererr] = useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const registrationValidationSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(4),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: registrationValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post('http://localhost:3131/api/users/register', values)

        localStorage.setItem('token', response.data.token);
        swal('Successful!', 'Your Registration successful', 'success');
        console.log(response);
        navigate('/Login');
        toast.success('Your Registration successful', { duration: 3000 });
      } catch (err) {
        setServererr(err.response.data.errors);
        console.error(err);
      }
    },
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "60px" }}>
        <form onSubmit={formik.handleSubmit}>


          <p >{formik.errors.username}</p>
          <TextField id="outlined-basic-username" label="Username" variant="outlined"
            sx={{
              width: '100%', mt: '20px'
            }}

            name="username"
            type="text"
            required
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik?.errors?.username && <Alert severity="error" sx={{ marginBottom: "10px" }}>         <span>{formik.errors.username}</span></Alert>}

          <TextField id="outlined-basic-email" label="Email" variant="outlined"
            sx={{
              width: '100%', mt: '20px'
            }}

            name="email"
            type="text"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />

          <FormControl variant="outlined" sx={{ width: '100%', mt: '20px', mb: "20px" }}>
            <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              //  sx={formik.errors.password ? {border:"5px solid red"} : {}}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>


          {formik?.errors?.password && <Alert severity="error" sx={{ marginBottom: "10px" }}>         <span>{formik.errors.password}</span></Alert>
          }
          {serverErr && <Alert severity="error" sx={{ marginBottom: "20px" }}>         <span>{JSON.stringify(serverErr)}</span></Alert>}


          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              onClick={() => navigate('/Login')}
              variant="outlined"
              color="info"
              sx={{ marginTop: "15px", marginLeft: "5px" }}
            >

              Already Registered! Login
              <Link to="/Login"></Link>
            </Typography>
            <Button
              type="submit"
              variant="outlined"
              color="success"
            >
              Submit
            </Button>



          </div>
          <ToastContainer />
        </form>
      </div>

    </>
  );
}

