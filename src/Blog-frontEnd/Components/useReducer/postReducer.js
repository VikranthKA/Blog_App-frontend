// const [profileState, profileDispatch] = useReducer(profileReducer, { profileDetails: {} });

const postReducer = (state, action) => {
    switch (action.type) {
        case 'GET_ALL_BLOGS':
            console.log(action.payload)
            return { ...state, Blogs: action.payload }
        case 'CREATE_POST':
            return { ...state, Blogs: [action.payload, ...state.Blogs] }
        case `UPDATE_POST`:

            const updatedBlog = state.Blogs.map((post) => {
                if (post._id === action.payload.data._id) {
                    return action.payload.data
                } else {
                    return post
                }
            })

            return {
                ...state, Blogs: updatedBlog
            }
        case 'DELETE_POST':
            const deletePost = state.Blogs.filter((post) => post._id !== action.payload.data._id)
            return { ...state, Blogs: deletePost }
        case 'CREATE_COMMENT':
            const postWithCreatedComment = state.Blogs.map((post) => {
                if (post._id === action.payload.postId) {
                    const newComments = [...post.comments, action.payload.comment]
                    return { ...post, comments: newComments }
                } else {
                    return post
                }
            })
            return { ...state, Blogs: postWithCreatedComment }
        case 'UPDATE_COMMENT':
            const postWithUpdatedComment = state.Blogs.map((post) => {
                if (post._id === action.payload.postId) {
                    const updatedComment = post.commentId.map((comment) => {
                        if (comment._id === action.payload.comment._id) {
                            return action.payload.comment
                        } else {
                            return comment
                        }
                    })
                    return { ...post, commentId: updatedComment }
                } else {
                    return post
                }
            })
            return { ...state, Blogs: postWithUpdatedComment }
        case 'DELETE_COMMENT':
            const postWithDeletedComment = state.Blogs.map((post) => {
                if (post._id === action.payload.postId) {
                    const removedComments = post.commentId.filter(comment => comment._id !== action.payload.comment._id)
                    return { ...post, coomentId: removedComments }
                } else {
                    return post
                }
            })
            return {...state,Blogs:postWithDeletedComment}
        case "CLEAR_BLOGS_STATE":
            return {...state,Blogs:[]}
    }
}


export default postReducer