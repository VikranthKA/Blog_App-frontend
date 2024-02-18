import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseISO, differenceInDays } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import Context from '../../Context/Context';
import PostForm from './PostForm';

function data_fns(date) {
  const currentData = new Date();
  const parseDate = parseISO(date);
  const dateDifference = differenceInDays(currentData, parseDate);
  return dateDifference;
}

export default function BlogCard({ author, categories, image, postId, content, title, createdAt,updatedAt }) {
  
 
  // console.log(categories,"101")
  const { isLogin,listPost,
    handleLogin,handleLogout,
    handleBlogDeleteStorage,handleBlogEditStorage,handleAddBlog,
    handleCommentDeleteStorage,handleCommentEditStorage,handleCreateComment } = useContext(Context);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [blogEdit,setBlogEdit] = useState(false)

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
    console.log('Delete blog clicked',postId);
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
  function htmldanger(data){
    return {__html:data}
  }
  const hanldeBlogEditCancel=()=>{
    setBlogEdit(!blogEdit)
  }

 

  return (
    <div>
      <div>
      {blogEdit ? <><PostForm postId={postId} hanldeBlogEditCancel={hanldeBlogEditCancel}/><br/><button onClick={hanldeBlogEditCancel}>Cancel</button></> :
      <>
      {postId &&
       tokendata &&
        userId &&
        (author._id === userId.id) && 
        isLogin && 
        (
        <div>
          <button onClick={handleBlogEdit}>Edit</button>
          <button onClick={()=>handleBlogDelete(postId)}>Delete</button>
        </div>
      )}
      <div>
        <div>
          Author is {author.username}
        </div>
        <div>
          <div dangerouslySetInnerHTML={htmldanger(title)} /> 
          Title:
          <div>posted: {data_fns(createdAt)} days ago__
                Last Edited:{data_fns(updatedAt)} days ago
          </div>
        </div>
      </div>

      {image && <img src={`http://localhost:3333/Uploads/images/${image}`} alt="ImageLoading"/>}
      <div>
        {/* <ul>{categories.categoryId.map((ele) => <li key={ele._id}>{ele.name}</li>)}</ul> */}
        
      </div>
      <div>Description: {}</div>
      <div dangerouslySetInnerHTML={htmldanger(content)} /> 

      {isLogin && (
        <div>
          <p onClick={() => navigate(`/BlogDetails/${postId}`)}>more...</p>
        </div>
      )}
      
      </>}
      

      </div>
      <hr/>
      
    </div>
  );
}
