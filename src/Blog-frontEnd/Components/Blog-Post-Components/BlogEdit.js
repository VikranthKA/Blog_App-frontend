import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import Context from '../../Context/Context';

const BlogEdit = ({ editId }) => {
  const { listPost } = useContext(Context);
  const [inputs, setInputs] = useState({
    id: '',
    title: '',
    content: '', // Changed from 'description' to 'content'
    categories: '',
  });

  const [selectedCategory, setSelectedCategory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getuserBlogs = async () => {
      try {
        const selected = await listPost.find((post) => post._id === editId);
        console.log(selected)
        if (selected) {
          setInputs((prevState) => ({
            ...prevState,
            id: selected._id,
            title: selected.title,
            content: selected.content, // Changed from 'content' to 'description'
            categories: selected.categories,
            
          }));
          console.log(selected.categories)
        }
      } catch (e) {
        console.log(e);
      }
    };
    getuserBlogs();
  }, [editId, listPost]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        title: inputs.title,
        content: inputs.content,
        selectedCategory,
        image: inputs.image,
        user: localStorage.getItem('token'),
      };
      const categoryIds = selectedCategory.map((category) => category.value);
      formData.categories = categoryIds;
      const response = await axios.put(`http://localhost:1000/api/posts/${editId}`, formData, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log('Blog edited:', response.data);

      navigate('/MyBlogs');
    } catch (error) {
      console.error('Error editing blog:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            value={inputs.title}
            required
          />
          <label>Description</label>
          <ReactQuill
            value={inputs.content}
            onChange={(value) => setInputs((prevState) => ({ ...prevState, content: value }))}
          />
          <label>Categories</label>
          <select
            id="category"
            name="category"
            onChange={(e) => setSelectedCategory([{ value: e.target.value, label: e.target.value }])}
            value={selectedCategory[0]?.value || ''}
            multiple
          >
            {inputs.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit" color="warning" variant="contained">
            Confirm Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEdit;
