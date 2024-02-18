
import Header from "../Components/Layout-Components/Header"
import Footer from "../Components/Layout-Components/Header"
import ListBlogPost from "../Components/Blog-Post-Components/ListBlogPost"


export default function Home(){ 



  return(
    <>
    <div style={{backgroundColor:"orange"}}> 
      <Header/>  
    </div>
    <div>
    <ListBlogPost/>
    </div>
    <div>

    </div>
    <Footer/>
    </>
  )
} 