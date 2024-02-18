import { useState } from 'react';
import swal from 'sweetalert';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../../config/axios';


export default function Login() {
  const navigate = useNavigate();
  const [serverErr, setServererr] = useState('');

  const loginValidationSchema = Yup.object({
 
    email: Yup.string().required().email(),
    
    password: Yup.string(),
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
        swal('Successful!', 'Your Registration successful', 'success');
        console.log(response);
        navigate('/ListBlogPost');
        toast.success('Your Login successful', { duration: 3000 });
      } catch (e) {
        setServererr(e.response.data.errors);
        console.error(e);
      }
    },
  });

  return (
    <>
      {serverErr && <span>{serverErr}</span>}
      <form onSubmit={formik.handleSubmit}>
        <div
 
        >
          <h4 >Login</h4>

          <p >{formik.errors.username}</p>
          <input
            placeholder="email"
            name="email"
            type="text"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <p>{formik.errors.email}</p>
          <input
            placeholder="password"
            name="password"
            type="password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <p>{formik.errors.password}</p>
          <button
            type="submit"
          >
            Submit
          </button>
          <button
            onClick={() => navigate('/Register')}
          >
            Not Registered
            <Link to="/Register"></Link>
          </button>
        </div>
      </form>
    </>
  );
}
