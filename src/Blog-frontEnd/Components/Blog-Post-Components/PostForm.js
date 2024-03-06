// import { useState, useEffect ,useContext} from 'react';
// import { useFormik } from 'formik';
// import Select from 'react-select';
// import ReactQuill from 'react-quill';
// import toast from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';
// import * as Yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import Context from '../../Context/Context';
// import axios from '../../../config/axios';

// function PostForm({postId,hanldeBlogEditCancel}) {
//   const [selectedOption,setSelectedOption] = useState(null)
//   const [serverError,setServerErrors] = useState([])
//   const [categories, setCategories] = useState([]);
//   const {handleAddBlog,listPost,handleBlogEditStorage} = useContext(Context)
//   const [blogEditDetails,setBlogEditDetails] = useState(null)
  
//   useEffect(() => {

//     const fetchCategories = async () => {

//       try {
//         if(postId){
//           const blogEditDetails = await listPost.find(ele=>ele._id===postId)
//           setBlogEditDetails(blogEditDetails)
//           console.log(blogEditDetails)
//         }
        
//         const response = await axios.get('/api/category');
//         const modifiedCategories = response.data.map(category =>
//            {
//             const { name, ...rest } = category;
//             return {
//               label: name,
//               ...rest
//           };
          
//         });
  
//         setCategories(modifiedCategories);

//         console.log("Modified")
//         console.log("categories",categories)

//         if(blogEditDetails){
//           setBlogEditDetails(blogEditDetails.categories)
//         }
       
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
  
//     fetchCategories();
//   }, []);
  

//   const postValidation = Yup.object({
//     title: Yup.string().required().min(3),
//     content: Yup.string().required(),
//   });
//   // console.log(selectedOption,"Selected options")

//   const navigate = useNavigate()

//   const formik = useFormik({
//     initialValues: {
//       title:(blogEditDetails ?  blogEditDetails.title : " "),
      
//       content: (blogEditDetails ?  blogEditDetails.content : " "),
//       image:( blogEditDetails ?  blogEditDetails.image : " ")
      
//     },
//     validateOnChange: false,
//     validationSchema: postValidation,
    
//     onSubmit: 
   
//       async (values) => {
//       values.categories = JSON.stringify(selectedOption.map((ele) => ele._id));
//       console.log(values.image,"im am image")

//       const formdata = new FormData();
//       formdata.append('title', values.title);
//       formdata.append('content', values.content);
//       formdata.append('image', values.image);
//       formdata.append('categories', values.categories);

//       try {
//         const categoryIds = await selectedOption.map((category) => category._id);
//         values.categories = categoryIds;
//         const {data} = await axios.post('/api/posts', formdata, {
//             headers: {
//               Authorization: localStorage.getItem('token'),
//             },
//           });
//         toast.success('Post Created  successful', { duration: 3000 });

//         {postId ? hanldeBlogEditCancel(postId,data) : handleAddBlog(data)}

//         if(postId){
//           hanldeBlogEditCancel()
//         }
//         navigate("/ListBlogPost")


//       } catch (error) {
//         setServerErrors(error.data)
//         console.log(error,"This is the error")
        
        
//       }
//     },
//   });

//   return (

//     <div>
//       <div>
//         {serverError && <ul>
//           {serverError.map(error=><li>{error.msg}</li>)}
//           </ul>}
//       </div>
//       <form onSubmit={formik.handleSubmit} encType="multipart/form-data">

      
//         <label>Create Post</label><br></br>

//         <label>Title</label><br></br>

//           <input type='text'
            
//             id="title"
//             name="title"
//             value={blogEditDetails ? blogEditDetails.title : formik.values.title}
//             onChange={formik.handleChange}
//            /><br></br>

//           <label>Description</label><br></br>

//           <div >
            
//             <ReactQuill
//               id="content"
//               theme='snow'
//               name="content"
//               onChange={(value) => formik.setFieldValue('content', value)}
//               value={blogEditDetails ? blogEditDetails.title : formik.values.content}
              
//             />
//           </div><br></br>

//             <label>Select file</label><br></br>
//             <input 
//                 type='file'
//                 accept='image/*'
//                 name = "image"
//                 onChange={(e)=>formik.setFieldValue('image',e.target.files[0])}
//                 /><br></br>

          
//           <label>Select the tag/Categories</label><br></br>
//           <Select
             
//             id="category"
//             name="category"
//             options={blogEditDetails ? blogEditDetails.title : categories}

            
//             defaultValue={selectedOption}
//             onChange={setSelectedOption}
//             isMulti
//             isSearchable
//             placeholder="Select Categories"
//           /><br></br>
                      

//           <button type="submit" color="primary" variant="contained">
//             Submit
//           </button><br></br>
       
//       </form>
//     </div>
//   );
// }

// export default PostForm;

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import toast from 'react-hot-toast';
import axios from '../../../config/axios';
import Context from '../../Context/Context';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Button, TextField, Typography, Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as Yup from 'yup';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function PostForm({ postId, handleBlogEditCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [serverError, setServerErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const { handleAddBlog, listPost, handleBlogEditStorage } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (postId) {
          const blogEditDetails = listPost.find((ele) => ele._id === postId)
          setTitle(blogEditDetails.title);
          setContent(blogEditDetails.content);
          setSelectedOption(blogEditDetails.categories)
          console.log(blogEditDetails.categories,"categories")
        }

        const response = await axios.get('/api/category');
        const modifiedCategories = response.data.map((category) => ({
          label: category.name,
          value: category._id,
        }));
        setCategories(modifiedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [postId, listPost]);

  const postValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Description is required'),
    categories: Yup.array().min(1, 'Select at least one category'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', image);

    try {
      await postValidationSchema.validate({ title, content, categories: selectedOption }, { abortEarly: false })


      const categoryIds = selectedOption.map((category) => category.value);
      formData.append('categories', categoryIds);

      const config = {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      };

      let response;
      if (postId) {
        response = await axios.put(`/api/posts/${postId}`, formData, config);
        handleBlogEditStorage(postId, response.data);
      } else {
        response = await axios.post('/api/posts', formData, config);
        handleAddBlog(response.data);
      }

      toast.success(`Post ${postId ? 'Updated' : 'Created'} successfully`, { duration: 3000 });
      setTimeout(() => {
        navigate('/ListBlogPost');
      }, 3000);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setServerErrors(errors);
      } else {
        console.error('Form submission error:', error);
        setServerErrors({ server: 'An error occurred while submitting the form.' });
      }
    }
  };

  return (
    <div>
      <Typography variant="h3" style={{ textAlign: 'center', marginTop: '20px' }}>
        {postId ? 'Edit Post' : 'Create Post'}
      </Typography>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '85%' },
          display: 'flex',
          justifyContent: 'center',
        }}
        noValidate
        autoComplete="off"
      >
        <Paper elevation={3} width={'100%'}>
          <form onSubmit={handleSubmit}>
            <div style={{ width: '95%', margin: '20px 10px 20px 10px' }}>
              <Typography htmlFor="title" variant="h5">
                Title
              </Typography>
              <TextField
                id="title"
                name="title"
                variant="standard"
                style={{ width: '100%' }}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={!!serverError.title}
                helperText={serverError.title}
              />
            </div>

            <div style={{ width: '95%', margin: '20px 10px 20px 10px' }}>
              <Typography htmlFor="content" variant="h5" mb={3}>
                Description
              </Typography>
              <ReactQuill
                theme="snow"
                name="content"
                value={content}
                onChange={setContent}
                error={!!serverError.content}
              />
              {serverError.content && <Typography color="error">{serverError.content}</Typography>}
            </div>

            <Grid container spacing={2} sx={{ width: '95%', margin: '20px -5px 20px -5px', display: 'flex', justifyContent: 'space-between' }}>
              <Grid item xs={6}>
                <div className="mb-3">
                  <Typography htmlFor="categories" variant="h5" sx={{ marginBottom: '15px' }}>
                    Select the Category
                  </Typography>
                  <Select
                    id="categories"
                    name="categories"
                    options={categories}
                    value={selectedOption}
                    onChange={setSelectedOption}
                    isMulti
                    isSearchable
                    placeholder="Select Categories"
                    error={!!serverError.categories}
                  />
                  {serverError.categories && <Typography color="error">{serverError.categories}</Typography>}
                </div>
              </Grid>

              <Grid item xs={3} sx={{ margin: '45px 0 0 0' }}>
                <div>
                  <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}  >
                    Upload Image
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Button>
                </div>
              </Grid>

              <Grid item xs={1} sx={{ margin: '45px 0 0 0' }}>
                <Button type="submit" onClick={handleSubmit} variant="contained" endIcon={<SendIcon />}>
                  POST
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </div>
  );
}

export default PostForm;


