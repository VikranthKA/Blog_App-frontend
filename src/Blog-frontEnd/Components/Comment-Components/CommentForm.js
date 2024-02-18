import React, { useState ,useContext} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import Context from '../../Context/Context';

const CommentForm = ({commentId,postId}) => {
  // handleCreateCommentCancel wt is the reason for writting this

  const [commentToggle,setCommentToggle] = useState(false) 
  const {handleCommentEditStorage,listPost} = useContext(Context);
  const EditComment = listPost.find(ele=>ele._id===commentId)
  const handleCommentEdit = (postId,commentId) => {
    // Add your logic for handling comment edit
    
    setCommentToggle(true)
    console.log(`Edit comment clicked for comment ID: ${commentId}`);
  }
  const [inputs, setInputs] = useState({
    id: commentId ? EditComment._id :'',//how to add multiple elements
    comment:commentId ? EditComment.comment :'',
  });
  // const commentId = useParams().id;
  const navigate = useNavigate();



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
        comment: inputs.comment,
        id: inputs.id,
      };

      const response = await axios.put(`http://localhost:1000/api/posts/${commentId}/comments`, formData, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      

      console.log('Comment Updated:', response.data);
      
      navigate('/');
      handleCommentEditStorage(formData)
    } catch (error) {
      console.error('Error in the updating comment:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div >
          <h2 ></h2>

          <label >Comment</label>

          <input
            type="text"
            id="comment"
            name="comment"
            onChange={handleChange}
            value={inputs.comment}
            required
          />

          <button
            type="submit"
            onClick={() => handleCommentEdit(commentId)}
          >
            {commentId ? (<button>Confirm Edit</button>) :(
              <button >Create Comment</button>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
