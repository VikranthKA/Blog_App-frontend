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

function PostForm({ postId, hanldeBlogEditCancel }) {
  const [blogEditDetails, setBlogEditDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); 
  // add the logic for the inital and blogEditDetails values
  const [serverError, setServerErrors] = useState([]);
  const [categories, setCategories] = useState([]);
  const { handleAddBlog, listPost, handleBlogEditStorage } = useContext(Context);
  const [title, setTitle] = useState(blogEditDetails ? blogEditDetails.title: " ");
  const [content, setContent] = useState(blogEditDetails ? blogEditDetails.content: " ");
  const [image, setImage] = useState(blogEditDetails ? blogEditDetails.image: " ");
 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (postId) {
          const blogEditDetails = listPost.find((ele) => ele._id === postId);
          setBlogEditDetails(blogEditDetails);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
      console.log(image)
      const formdata = new FormData();
      formdata.append('title', title);
      formdata.append('content', content);
      formdata.append('file', image);

      
      

      try {
        console.log(selectedOption,"options")
        const categoryIds = await selectedOption.map((category) => category.value);
        console.log(categoryIds,"i am ids of cat")
        formdata.append('categories', categoryIds);



      const config = {
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      };

      if (postId) {
        const response = await axios.put(`/api/posts/${postId}`, formdata, config);
        console.log(formdata,"formdata")
        handleBlogEditStorage(postId, response.data);
        if (response.data) {
          hanldeBlogEditCancel();
        }
      } else {
        const response = await axios.post('/api/posts', formdata, config);
        handleAddBlog(response.data);
        console.log(response.data,"Here u have images")
      }

      toast.success(`Post ${postId ? "Updated" : "Created"} successfully`, { duration: 3000 });
      navigate('/ListBlogPost');
    } catch (error) {
      if (postId) {
        console.log(error);
      } else {
        console.log(error);
        setServerErrors(error.response);
      }
    }
  };

  return (
    <div className="container mt-4">

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>{postId ? 'Edit Post' : 'Create Post'}</h2>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={ title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Description
          </label>
          <ReactQuill
            id="content"
            theme="snow"
            name="content"
            value={content}
            onChange={(value) => setContent(value)}
          />
        </div>

        {postId && (
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Select file
            </label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Select the tag/Categories
          </label>
          <Select
            id="category"
            name="category"
            options={categories}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            isMulti
            isSearchable
            placeholder="Select Categories"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostForm;


