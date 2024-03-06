import {useContext,useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Context from '../../Context/Context'
import { parseISO, differenceInDays } from 'date-fns';
import { Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, TextField, Avatar, Grid, IconButton, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material'
import BlogEdit from './BlogEdit'
import CommentForm from '../Comment-Components/CommentForm'
import CommentCard from '../Comment-Components/CommentCard';
import { jwtDecode } from 'jwt-decode';
import axios from '../../../config/axios';
import toast from 'react-hot-toast';



function data_fns(date){
  const currentData = new Date()
  const parseDate = parseISO(date)
  const dateDifference = differenceInDays(currentData,parseDate)
  return dateDifference
}

export default function BlogDetails(){

  const [postToggle,setPostToggle] = useState(false)
  const [commentToggle,setCommentToggle] = useState(false)
  const [submitComment,setSubmitComment] = useState("")
  const [listPostComments,setListPostComments] = useState(null)
  
  

  const tokendata = localStorage.getItem("token")
  const userId = jwtDecode(tokendata)

  const {postId} = useParams()

  const {listPost,isLogin,handleCommentDeleteStorage} = useContext(Context)
  const post = listPost.find(ele=>ele._id === postId)//filter

  const handleBlogDelete=()=>{
  }
  const handleCommentSubmitPreventDefault = async(e)=>{
    e.preventDefault()
    const formComment = {
      comment:submitComment
    }
    
      try{
          const response =await axios.post(`/api/posts/${postId}/comments`,formComment,{
              headers:{
                  authorization:localStorage.getItem('token')
              }
          })
          setListPostComments([{...response.data},...listPostComments])
          setSubmitComment("")
          
          
      }catch(err){
          console.log(err)
      }
}


  


const handleDeleteComment = async (commentId) => {
  console.log("Delete is clicked start");

  try {
    const response = await axios.delete(`/api/posts/${postId}/comments/${commentId}`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    });

    if (response.data) {
      toast.success('Comment deleted successfully');
      setListPostComments(listPostComments.filter((ele) => ele._id !== commentId))
    }
  } catch (e) {
    console.error(e);
    toast.error('Error deleting comment');
  }

  console.log("Delete is clicked end");
};



  const handleBlogEdit=()=>{
    setCommentToggle(false)
    setPostToggle(true)
  }

  const handleCommentEdit = (commentId) => {
      // Add your logic for handling comment edit
    setPostToggle(false)
    setCommentToggle(true)
    console.log(`Edit comment clicked for comment ID: ${commentId}`);
  };
  
  const handlePostCommentDelete = (postId,commentId) => {
      // Add your logic for handling comment delete
      handleCommentDeleteStorage(postId,commentId)
    console.log(`Delete comment clicked for comment ID: ${commentId}`);

  };


  function findName(id){
    const name = listPost.find(ele=>ele.id===id)//check
    console.log(name)
    return name
  }
  useEffect(()=>{
    if(postId){
      (async function abc(){
      try{
        const response =await axios.get(`/api/posts/${postId}/comments`)

        
        setListPostComments(response.data)
        if(response){
          setListPostComments(response.data)
        }else{
          console.log("Data not found")
        }

      }catch(err){
        console.log(err)
      }
    }
      )()
      

    }

  },[])

  function htmldanger(data){
    return {__html:data}
  }

  return (
    <Box mt={2}>
      {postId && isLogin && (
        <List>
          <ListItem>
            {userId === post?.author?._id && post && (
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleBlogEdit(postId)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleBlogDelete(postId)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            )}
            <ListItemText
              primary={
                <Typography variant="h5" dangerouslySetInnerHTML={htmldanger(post?.title)} />
              }
              secondary={
                <Typography variant="body2">
                  Created At: {data_fns(post?.createdAt)} days ago |
                  Updated At: {data_fns(post?.updatedAt)} days ago <br />
                  Name: {post.author.username} | E-mail: {post.author.email}
                </Typography>
              }
            />
            {post.image && <Avatar src={`http://localhost:3131/Uploads/images/${post.image}`} />}
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body1" dangerouslySetInnerHTML={htmldanger(post.content)} />
              }
            />
          </ListItem>
          <ListItem>
            <form onSubmit={handleCommentSubmitPreventDefault}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <TextField
                    label="Add a comment"
                    value={submitComment}
                    onChange={e => setSubmitComment(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Button type="submit">Submit</Button>
                </Grid>
              </Grid>
            </form>
          </ListItem>
          {listPostComments && listPostComments.map(ele => (
            <ListItem key={ele?._id}>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    Created: {data_fns(ele?.createdAt)} days ago |
                    Updated: {data_fns(ele?.updatedAt)} days ago
                  </Typography>
                }
                secondary={
                  <Typography variant="body1" dangerouslySetInnerHTML={htmldanger(ele?.comment)} />
                }
              />
              {userId === ele?.author?._id && (
                <ListItemSecondaryAction>
                  <IconButton>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteComment(ele?._id)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
} 