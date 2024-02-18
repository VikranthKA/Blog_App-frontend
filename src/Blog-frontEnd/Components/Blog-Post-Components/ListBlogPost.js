
import {useContext} from 'react'
import BlogCard from './BlogCard'
import Context from '../../Context/Context'

export default function ListBlogPost(){
    const {listPost} = useContext(Context)
    

    return(
        <div key={listPost.postId}>
          <hr/>
          <h2 key={listPost.postId}>Listing the public blogs</h2> 
    
         
          
          {listPost && listPost.map(blog=><BlogCard 

          image={blog.image}
          author={blog.author}
          categories={blog.categories}
          //comment no need because of more link
          content={blog.content}
          title={blog.title} 
          createdAt={blog.createdAt}
          
          updatedAt={blog.updatedAt}
          postId={blog._id}
          
          
        />)}
        
    </div>
)
}
