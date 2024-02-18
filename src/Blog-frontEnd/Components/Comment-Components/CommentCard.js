import React, { useContext, useState } from 'react';
import Context from '../../Context/Context';
import CommentForm from './CommentForm';

const CommentCard = ({ postId, comments,handlePostCommentDelete }) => {
  const [commentToggle, setCommentToggle] = useState(true);
  const [commentEditToggle, setCommentEditToggle] = useState(false);

  const { listPost } = useContext(Context);

  const handleCommentToggle = () => {
    setCommentEditToggle(true);
  };

  const handleCommentDelete = (commentId) => {
      //how to get the postId
    handlePostCommentDelete(commentId)//dis comment goes to blog details and delete the value on the storage
  };
  const handleEditCancel = ()=>{
    setCommentEditToggle(false)
  }
  const handleCommnetSave = (commentData)=>{
    
  }
  

  return (
    <>
      <div key={comments._id}>
 
        {commentToggle && listPost ? (

          <div>
            <CommentForm />
            <div>
              {commentEditToggle ? (
                <>
              <CommentForm/>
              <button onClick={handleEditCancel}>cancel</button>
                </>
              ):(
              <>
                <div key={comments._id}>
              <p>Comments are</p>
              {/* <p>User: {username}</p> */}
              {/* //check for comments.commentId */}
              <button onClick={() => handleCommentToggle()}>Edit</button>
              <button onClick={() => handleCommentDelete(postId,comments.commentId)}>Delete</button>
              {console.log(comments.commentId,"comment 74")}
              {/* <p>Comment: {comments.commentId.comment}</p> */}
            </div>

              </>)}


                </div>

          </div>

        ) : (
          <div>

            {commentEditToggle && (<CommentForm commentId={comments._id} postId={postId}/>)}
             


            

          </div>
        )}
      </div>
    </>
  );
};

export default CommentCard;
