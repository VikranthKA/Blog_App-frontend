import { parseISO, differenceInDays } from 'date-fns';
import {useContext,useState} from 'react'
import { jwtDecode } from 'jwt-decode';


import Context from '../../Context/Context'
import BlogEdit from './BlogEdit'
import CommentCard from '../Comment-Components/CommentCard';
import CommentForm from '../Comment-Components/CommentForm';
function data_fns(date){
    const currentData = new Date()
    const parseDate = parseISO(date)
    const dateDifference = differenceInDays(currentData,parseDate)
    return dateDifference
}
export default function BlogMani({postId,title,createdAt,updatedAt,Name,email,Description,categories,comments,author}){
    //My blogs content is displaying here
    const {listPost,handleBlogDeleteStorage,handleCommentDeleteStorage,handleCreateCommentStorage} = useContext(Context)

    const [postToggle,setPostToggle] = useState(false)
    const handleBlogDelete=(postId)=>{
        handleBlogDeleteStorage(postId)
    }
    const tokendata = localStorage.getItem("token")
    const userId = jwtDecode(tokendata)
    const [createCommentToggle,setCreateCommentToggle] = useState(false)
    const handleBlogEdit=()=>{
      
      setPostToggle(!postToggle)
      console.log("handleBlogEdit Clicked")
      

    }
    //get the id from commnet Card and then call the function using the handleCommentDeleteStorage
    const handlePostIDCommentDelete = (postId,commentId)=>{
        handleCommentDeleteStorage(postId,commentId)
        console.log('Comment delete is clicked')

    }
    //check above handles
    const handleCreateComment=(postId)=>{
        handleCreateCommentStorage(postId)

    }//display the comment form
    const handleCreateCommentCancel=()=>{
        setCreateCommentToggle(false)
    }
    function htmldanger(data){
        return {__html:data}
      }

   

    return(
        <>
        <div>
            {postToggle ? (
                <div>
                    
                    <p>Edit</p>
                    <BlogEdit editId={postId}/>
                    <button onClick={()=>setPostToggle(false)}>Cancel</button>
                    
                </div>

            ):(
                
                <div>
                    {
                        (userId===author._id) && <div>
                            <button onClick={()=>handleBlogEdit(postId)}>Edit</button><button onClick={()=>handleBlogDelete(postId)}>Delete</button><br/>

                            </div>
                    }
                    
            
                Title:{title} <br/>
                Created At :{(data_fns(createdAt))}days ago <br/>
                Updated At :{(data_fns(updatedAt))}days ago<br/> 
                {/* {ele.author._id} */}
                Name :- {Name}  <br/>
                email:{email}<br/>
                Description:-{}<br/>
                Title:<div dangerouslySetInnerHTML={htmldanger(Description)} />
                <ul>
                {categories.map((ele)=>{return <li key={ele._id}><p>Categories{ele.categoryId}</p></li>})}
                </ul>
            
            {/* //map the comment
            //how to send the postId in map
            how to handle    the createCommentToggle to false */}


            {createCommentToggle &&
            <div>

            <CommentForm postId={postId} handleCreateCommentCancel={handleCreateCommentCancel}/>
            <button onClick={handleCreateCommentCancel}>Cancel</button>
            </div>
            }


                
           
            {comments.map(ele=><CommentCard handlePostIDCommentDelete={handlePostIDCommentDelete} comment={ele.comment} commentId={ele.commentId} 
                username={ele.username}/>)}
                
                </div>

            )}
            

                   
                    
        </div>
        </>
    )
}