import {useContext,useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Context from '../../Context/Context'
import { parseISO, differenceInDays } from 'date-fns';
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

  return(
    <>
    <div>
      {postId && isLogin &&(
        
       <ul>
               <li key={post._id}><div>
                  {(userId===post.author._id) &&
                      <div>
                        
                         <button onClick={()=>handleBlogEdit(postId)}>Edit</button><button onClick={()=>handleBlogDelete(postId)}>Dpostte</button><br/>
                      </div>
                  }                               
                  </div>
                  Title:<div dangerouslySetInnerHTML={htmldanger(post.title)} />
                   <br/>
                  Created At :{(data_fns(post.createdAt))} days ago <br/>
                  Updated At :{(data_fns(post.updatedAt))}days ago<br/>
                  {/* {add image to display} */}
                   {/* {post.author._id} */}
                  Name :- {post.author.username}  <br/>
                  e-mail:{post.author.email}<br/>
                  {post.image && <img src={`http://localhost:3333/Uploads/images/${post.image}`} alt="ImageLoading"/>}

                  Description:-

                <div dangerouslySetInnerHTML={htmldanger(post.content)} /> 
                  <ul>
                  {/* {post.categories.map((post)=>{return <li key={post._id}><p>Categories{post.categoryId}</p></li>})} */}
                  </ul>
                  <p>Comments</p>
                  <form onSubmit={handleCommentSubmitPreventDefault}>
                  <textarea type="text" 
                        value={submitComment} 
                        onChange={e=>setSubmitComment(e.target.value)}
                        placeholder='This is a nice Post'
                  
                  /><input type="submit"/><br/>
                    </form>
                  <ul>
                    <div className='EditComment'>

                  {listPostComments && listPostComments.map(ele =>{
                    return(
                      
                      <div key={ele._id}>
                        <hr/>
                        {console.log(userId.id)}
                        {userId.id === ele.author._id && (<div>
                          <button >Edit</button><button onClick={()=>handleDeleteComment(ele._id)}>Delete</button>
                        </div>)}
                        {/* <li> Author:{findName(ele.commentId.author)}</li> */} 
                        <li>Created:{data_fns(ele.createdAt)}days ago</li>
                        <li> Updated:{data_fns(ele.updatedAt)}days ago</li>
                        <li>Comment:-<br/>{ele.comment}</li>
                      </div>) })}
                    </div>
                  </ul>
                  
                  
                  
                </li>
                
                
       
       </ul>
       
      )}
      
    </div>
    
    </>
    )
} 