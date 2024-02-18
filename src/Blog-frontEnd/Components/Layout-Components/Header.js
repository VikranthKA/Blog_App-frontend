import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../../Context/Context';
import "./Header.css"

export default function Header() {
  const { isLogin, handleLogout } = useContext(Context);
  const navigate = useNavigate();

  const [value, setValue] = useState();

  const handleChangeLogout = () => {
    handleLogout();
    
    alert('Logout Successfully');
  };

  return (
    <>
      <header>
        <div>
          <h4>My Blog APP</h4>

        </div>
        {isLogin && (
          <div className='nav'>
            <ul className='ul'>
              <li className='navli'>
                <Link className="Link" to="/ListBlogPost">Blogs</Link>
              </li>
              <li className='navli'>
                <Link className="Link" to="/MyBlogs">My-Blogs</Link>
              </li>
              <li className='navli'>
                <Link className="Link" to="/CreateNewBlog">Create-New Blog</Link>
              </li>
            </ul>
          </div>
        )}

        <div>
          {isLogin ? (
            <div className='button'>
              <button onClick={handleChangeLogout}>Logout</button>
              <button onClick={()=>navigate("/UserProfile")} >
                User-Profile
              </button>
            </div>
          ) : (
            <div className='button'>
              <button onClick={()=>navigate("/Register")}>Register</button>
              <button onClick={()=>navigate("/Login")}>Login</button>


            </div>
          )}
        </div>
      </header>
    </>
  );
}
