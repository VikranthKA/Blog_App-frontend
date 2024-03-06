import React, { useState, useContext } from 'react';
import { Button, Typography, Box, Grid, Card, CardContent, CardActions, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { parseISO, differenceInDays } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import Context from '../../Context/Context';
import PostForm from './PostForm';

const daysSincePosted = (date) => {
  const diff = Math.abs(new Date() - new Date(date));
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function BlogCard({ author, categories, image, postId, content, title, createdAt, updatedAt }) {


  // console.log(categories,"101")
  const { isLogin, listPost,
    handleLogin, handleLogout,
    handleBlogDeleteStorage, handleBlogEditStorage, handleAddBlog,
    handleCommentDeleteStorage, handleCommentEditStorage, handleCreateComment } = useContext(Context);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [blogEdit, setBlogEdit] = useState(false)

  const tokendata = localStorage.getItem("token");
  let userId;


  if (tokendata) {
    try {
      userId = jwtDecode(tokendata);
      // console.log(userId)
      // console.log(author._id)
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  } else {
    console.log('Invalid token or token not present');

  }


  const handleBlogEdit = () => {
    // Add your logic for handling blog edit
    setBlogEdit(true)
  };

  const handleBlogDelete = (postId) => {
    handleBlogDeleteStorage(postId)
    console.log('Delete blog clicked', postId);
  };

  const handleCommentEdit = (commentId) => {
    // Add your logic for handling comment edit
    setToggle(!toggle)
    console.log(`Edit comment clicked for comment ID: ${commentId}`);
  };

  const handleCommentDelete = (commentId) => {
    // Add your logic for handling comment delete
    console.log(`Delete comment clicked for comment ID: ${commentId}`);
  };
  function htmldanger(data) {
    return { __html: data }
  }
  const hanldeBlogEditCancel = () => {
    setBlogEdit(!blogEdit)
  }



  return (
    <Box mb={2} ml={"20%"}>
    {blogEdit ? (
      <>
        <PostForm postId={postId} hanldeBlogEditCancel={hanldeBlogEditCancel} />
        <Button variant="outlined" onClick={hanldeBlogEditCancel}>Cancel</Button>
      </>
    ) : (
      <Card>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">Title: {title}</Typography>
            <div>
              <CardActions disableSpacing>
                {isLogin && userId && author._id === userId.id && (
                  <div>
                    <IconButton onClick={handleBlogEdit}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleBlogDelete(postId)}>
                      <Delete />
                    </IconButton>
                   </div>
                )}
              </CardActions>
            </div>
          </div>
          <Typography variant="h5" >Author: {author.username}</Typography>
          <Typography variant="h6" >Category: {
categories[0]?.categoryId.name}</Typography>

          <Typography variant="body2">Posted: {daysSincePosted(createdAt)} days ago</Typography>
          <Typography variant="body2">Last Edited: {daysSincePosted(updatedAt)} days ago</Typography>
          {image && <img src={`http://localhost:3131/Uploads/images/${image}`} alt="Blog Image" style={{ width: '50%', maxHeight: 200, objectFit: 'cover' }} />}
          <Typography variant="body1">Description: <div dangerouslySetInnerHTML={htmldanger(content)} style={{display:"inline-block"}} /></Typography>
        </CardContent>
        <CardActions>
          <Button variant="text" onClick={() => navigate(`/BlogDetails/${postId}`)} style={{ marginTop: '3px' }}>More...</Button>
        </CardActions>
      </Card>
    )}
  </Box>
  
  );
}
