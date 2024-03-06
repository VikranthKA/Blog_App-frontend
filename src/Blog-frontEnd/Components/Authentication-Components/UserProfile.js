import React, { useEffect, useState } from "react";
import axios from "../../../config/axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserProfile() {
  const [user, setUser] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async function getData() {
      try {
        const response = await axios.get("/api/users/profile", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        setUser(response.data);
        console.log(response);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    })();
  }, []);

  const updateValidations = Yup.object({
    bio: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      bio: "",
      image: "",
    },
    validateOnChange: false,
    validationSchema: updateValidations,
    onSubmit: async (values) => {
      const formdata = new FormData();
      formdata.append("bio", values.bio);
      formdata.append("profilePicture", values.image);

      try {
        console.log(formdata)
        const response = await axios.put(
          "/api/users/profile",
          formdata,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        toast.success("Profile updated successfully", {
          position: "top-center",
        })
        setUser(response.data);
      } catch (e) {
        console.log('catch',e);
        toast.error(e.response.data);
      }
    },
  });

  const handleFileChange = (e) => {
    formik.setFieldValue("profilePicture", e.target.files[0]);
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/");
  };

  const handleCreatePost = () => {
    navigate("/CreateNewBlog");
  };

  return (
    <div>
      <h2>UserProfile</h2>
      <div>
        <div>
          <h4>User Profile</h4>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
{user.profilePicture && (
  <img
    alt="Profile Picture"
    src={`http://localhost:1000/uploads/images/${user.profilePicture}`}
    style={{ width: "120px", height: "120px", margin: "auto" }}
  />
)}
              <h5>Welcome - {user.username}</h5>
              <div>
                <p>
                  <b>Email:</b> {user.email}
                </p>
                <p>
                  <b>Bio:</b> {user.bio}
                </p>
              </div>

              {!edit ? (
                <button onClick={() => setEdit(true)}>Edit Profile</button>
              ) : (
                <div>
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      fullWidth
                      label="Bio"
                      variant="outlined"
                      margin="normal"
                      name="bio"
                      value={formik.values.bio}
                      onChange={formik.handleChange}
                      error={formik.touched.bio && Boolean(formik.errors.bio)}
                    />
                    <input
                      fullWidth
                      type="file"
                      label="Update Profile Pic"
                      variant="outlined"
                      margin="normal"
                      onChange={handleFileChange}
                    />

                    <button type="submit" style={{ marginTop: "2" }}>
                      Update Profile
                    </button>

                    <button onClick={() => setEdit(false)} style={{ marginTop: "2", marginLeft: "2" }}>
                      Cancel
                    </button>
                  </form>
                </div>
              )}

              <div style={{ marginTop: "3" }}>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleCreatePost} style={{ marginLeft: "2" }}>
                  Create a new Post
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
