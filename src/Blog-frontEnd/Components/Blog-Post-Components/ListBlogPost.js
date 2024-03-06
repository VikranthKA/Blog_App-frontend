
import {useContext} from 'react'
import BlogCard from './BlogCard'
import Context from '../../Context/Context'
import { Button, Pagination, Stack } from '@mui/material'
import { Search } from '@mui/icons-material'

export default function ListBlogPost(){
    const {
      listPost,
      page,setPage,
      totalPage,setTotalPage,
      searchQuery,setSearchQuery,
      getAllposts
    } = useContext(Context)

    const handlePageChange=(event, value) => {
      setPage(value);
      getAllposts();
    }
    return(
        <div key={listPost.postId}>
          <hr/>
          <h2 key={listPost.postId}>Listing the public blogs</h2> 
          <input type='text' value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/>
          <Button onClick={()=>getAllposts()}><Search/></Button>
    
         
          
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
  <div style={{margin:"30px 0 100px 50%"}}>
    <Stack spacing={5}>

    <Pagination count={totalPage} page={page}  onChange={handlePageChange}/>

    </Stack>

  </div>

        
    </div>
)
}
