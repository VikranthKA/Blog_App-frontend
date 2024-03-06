import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context/Context';
import { jwtDecode } from 'jwt-decode';
import BlogCard from './BlogCard';
export default function MyBlogs() {
  const [toggle, setToggle] = useState(false);
  const { listPost } = useContext(Context);
  const [MyBlogs, setMyBlogs] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.id);
          console.log(decodedToken, 'decodedToken');
          console.log(userId, 'userId');
        }

        if (listPost && userId) {
          
          console.log(listPost, 'author');

          const userBlogs = listPost.filter((blog) => blog.author._id===userId)
          console.log(userBlogs,"User Blog")
          setMyBlogs(userBlogs);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData(); // Call the inner function immediately
  }, [listPost, userId]);

  return (
    <>
      {userId ? (
        <div>
          <ul>
            {MyBlogs.map((blog) => (
              <li key={blog._id}>
                {/* <BlogMani
                  postId={ele._id}
                  title={ele.title}
                  createdAt={ele.createdAt}
                  author={ele.author}
                  updatedAt={ele.updatedAt}
                  Name={ele.author.username}
                  email={ele.author.email}
                  Description={ele.content}
                  categories={ele.categories}
                  comments={ele.comments}
                /> */}
                <BlogCard 

image={blog.image}
author={blog.author}
categories={blog.categories}
//comment no need because of more link
content={blog.content}
title={blog.title} 
createdAt={blog.createdAt}

updatedAt={blog.updatedAt}
postId={blog._id}


/>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>
            U haven't Created a post yet. Give it a try<Link to="/CreateNewBlog">Create a Post</Link>
          </h2>
        </div>
      )}
    </>
  );
}

// import {useState,useEffect} from 'react'
// import {useContext} from 'react'
// import {Link} from 'react-router-dom'
// import Context from '../../Context/Context'
// import { jwtDecode } from "jwt-decode"

// import BlogMani from './BlogMani';

// export default function MyBlogs(){

//     const [toggle,setToggle] = useState(false)
//     const {listPost} = useContext(Context)
   
//     const [MyBlogs,setMyBlogs] = useState([])
//     const [userId,setUserId] = useState('')


//     useEffect(()=>{
//         (async function(){
//             try{
//                 const token = localStorage.getItem('token')
//                 //console.log(token,"token")
                
//             if(token){
//                 setUserId(jwtDecode(token.id))
//                 console.log(token,"token")
//                 console.log(userId,"userId")
//             }
//             if(listPost && userId){
//                 console.log("asdf")
//                 console.log(listPost,"author")
//                 const MyBlogs =await listPost.find(blog=>listPost.author._id ===  userId)
//                 setMyBlogs(MyBlogs)
//             }
//             }catch(e){
//                 console.log(e)
//             }

//         })()

//     },[listPost])
//     return(
//         <>
//         {console.log(listPost)}
//         {
//             ( listPost?.author?._id === userId) ? (
//                 <div>
//                                     {console.log("in the condition")}

//                     <ul>
//         {listPost.map((ele)=>{
//             return(
//                 <li key={ele._id}><BlogMani postId={ele._id} title={ele.title} createdAt={ele.createdAt} author={ele.author}
//                                              updatedAt={ele.updatedAt } Name={ele.author.username}
//                                              email={ele.author.email} Description={ele.content} 
//                                              categories={ele.categories} comments={ele.comments}/></li>)
//         })}
//         </ul>

//                 </div>
//             ):(
//                 <div>
//                     <h2>U haven't Created a post yet Give it a try<Link to="CreateNewBlog">Create a Post</Link></h2>
//                 </div>
//             )
//         }

        
//         </>
//     )
  

// }