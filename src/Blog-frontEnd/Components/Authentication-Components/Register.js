import { useState } from 'react';
import swal from 'sweetalert';
import axios from "../../../config/axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [serverErr, setServererr] = useState('');

  const registrationValidationSchema = Yup.object({
    username: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string(),
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
        const response = await axios.post('/api/users/register', values);

        localStorage.setItem('token', response.data.token);
        swal('Successful!', 'Your Registration successful', 'success');
        console.log(response);
        navigate('/Login');
        toast.success('Your Registration successful', { duration: 3000 });
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
          <h4 >User-Registration</h4>
          <input
            placeholder="username"
            name="username"
         
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            required
          />
          <p >{formik.errors.username}</p>
          <input
            placeholder="email"
            name="email"
            type="text"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <p >{formik.errors.email}</p>
          <input
            placeholder="password"
            name="password"
            type="password"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <p >{formik.errors.password}</p>
          <button
            type="submit"
          >
            Submit
          </button>
          <button
            onClick={() => navigate('/Login')}
          >
            Already Registered! Login
            <Link to="/Login"></Link>
          </button>
        </div>
      </form>
    </>
  );
}
