import {Routes,Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import Register from './Blog-frontEnd/Components/Authentication-Components/Register'
import Login from './Blog-frontEnd/Components/Authentication-Components/Login'
import UserProfile from './Blog-frontEnd/Components/Authentication-Components/UserProfile'
import Header from './Blog-frontEnd/Components/Layout-Components/Header'
import ListBlogPost from './Blog-frontEnd/Components/Blog-Post-Components/ListBlogPost'
import MyBlogs from './Blog-frontEnd/Components/Blog-Post-Components/MyBlogs'
import PostForm from './Blog-frontEnd/Components/Blog-Post-Components/PostForm'
import BlogEdit from './Blog-frontEnd/Components/Blog-Post-Components/BlogEdit'
import CommentForm from './Blog-frontEnd/Components/Comment-Components/CommentForm'
import Storage from './Blog-frontEnd/Context/Storage'
import BlogDetails from './Blog-frontEnd/Components/Blog-Post-Components/BlogDetails'




function App(){
  return(
    <div>
      <Storage>

      <Header/>
      <Toaster/>
      <Routes>

        <Route path='/' element={<ListBlogPost/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/UserProfile" element={<UserProfile/>}/>
        <Route path="/ListBlogPost" element={<ListBlogPost/>}/>
        <Route path="/MyBlogs" element={<MyBlogs/>}/>
        <Route path="/CreateNewBlog" element={<PostForm/>}/>
        <Route path="/BlogEdit/:id" element={<BlogEdit/>}/>
        <Route path="/CommentForm/:id" element={<CommentForm/>}/>
        <Route path="/BlogDetails/:postId" element={<BlogDetails/>}/>
        

      </Routes>
      
      </Storage>
    </div>
  )
}
export default App 

