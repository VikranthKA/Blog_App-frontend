import {useState,useEffect} from 'react'
import axios from "../../config/axios"
import Context from './Context'
import {useNavigate} from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';

export default function Storage({children}){
    const [isLogin,setIsLogin] = useState(false)  
    const[listPost,setListPost] = useState([])
    const [comments,setComments] = useState([])
    const [listPostComments,setListPostComments] = useState([])
    


    const navigate = useNavigate

    const handleLogin=()=>{
        setIsLogin(true)
        navigate('/ListBlogPost') 
    }

    const handleLogout=()=>{
        
        setIsLogin(false)
        localStorage.removeItem('token')
        navigate('/Login')
    }
    const handleBlogEditStorage=async(id,BlogData)=>{
       
            if(BlogData){
               const UpdatedBlog =  [BlogData,...listPost]//check
                setListPost(UpdatedBlog)
                console.log(listPost)
                alert('Blog updated')
                
            }
  }
    const handleBlogDeleteStorage=async(id)=>{//coming as postId
        try{
           const {data} = await axios.delete(`/api/posts/${id}`,
           {
               headers:{
                   authorization:localStorage.getItem('token')
               }
           })
           if(data){
               setListPost(listPost.filter(ele=>ele._id!==id))
               
           }
        }catch(e){
           console.log(e)
        }
   }
   const handleCommentEditStorage=async(postId,commentId,commentData)=>{
    try{
        const response = await axios.put(`/api/posts/`,commentData,{
            headers:{
                authorization:localStorage.getItem('token')
            }
        })
        if(response.data){

            alert('Blog deleted')
            navigate('/MyBlogs')
        }
     }catch(e){
        console.log(e)
     }
   }

   
   const handleAddBlog = (post) => {
    console.log(post)



    if(post){
        const newPostList = [post,...listPost]; // Add the new post to the array
        console.log(newPostList);
        setListPost(newPostList);
    }

  };
  

  

   async function getAllposts(){
    try{
        const response = await axios.get("/api/posts")
        console.log(response.data)
        setListPost(response.data)

    }catch(e){
        console.log(e,'error in the Store.js')

    }
}
    useEffect(()=>{
        const a = localStorage.getItem('token')
        if(a){
            setIsLogin(true)
        }
        getAllposts()
       
    },[])

    return(
    <div>
        <Context.Provider value={{  
                                    isLogin,listPost,
                                    handleLogin,handleLogout,listPostComments,
                                    handleBlogDeleteStorage,handleBlogEditStorage,handleAddBlog,
                                    handleCommentEditStorage
                                }}>
            {children}
        </Context.Provider>

    </div>
    )
    
}