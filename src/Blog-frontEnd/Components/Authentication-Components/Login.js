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


export default function Login() {
  const navigate = useNavigate();
  const [serverErr, setServererr] = useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const {decodeData} = useContext(Context)

  const loginValidationSchema = Yup.object({
 
    email: Yup.string().required().email(),
    
    password: Yup.string().required().min(8),
  });

  const formik = useFormik({
    initialValues: {

      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await axios.post('/api/users/login', values);

        localStorage.setItem('token',(response.data.token));
        decodeData()
        // swal('Successful!', 'Your Registration successful', 'success');
        console.log(response);
        navigate('/ListBlogPost');
        toast.success('Your Login successful', { duration: 3000 })
      } catch (e) {
        setServererr(e.response.data.error)
        console.error(e);
      }
    },
  });

  return (
    <div style={{display:"flex",justifyContent:"center",width:"100%",marginTop:"60px"}}>
      <form onSubmit={formik.handleSubmit}>
         

          <p >{formik.errors.username}</p>
          <TextField id="outlined-basic-email" label="Email" variant="outlined" 
                        sx={{width: '100%',mt: '20px'
                      }}

            name="email"
            type="text"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />
                    {formik?.errors?.email && <Alert severity="error" sx={{marginBottom:"10px"}}>         <span>{formik.errors.email}</span></Alert>}

          <FormControl variant="outlined" sx={{ width: '100%', mt: '20px',mb:"20px" }}>
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


{ formik?.errors?.password &&         <Alert severity="error" sx={{marginBottom:"10px"}}>         <span>{formik.errors.password}</span></Alert>
}
          {serverErr &&  <Alert severity="error" sx={{marginBottom:"20px"}}>         <span>{serverErr}</span></Alert>}

          <div style={{display:"flex",justifyContent:"space-between"}}>
          <Typography
            onClick={() => navigate('/Register')}
            variant="outlined"
            color="info"
            sx={{marginTop:"15px",marginLeft:"5px"}}
          >
            <Link to="/Register">            Not Yet Registered?
</Link>
          </Typography>
          <Button
            type="submit"
            variant="outlined"
            color="success"
          >
            Submit
          </Button>



          </div>
          <ToastContainer/>
      </form>
    </div>
  );
}
