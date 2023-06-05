import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  const currentUser = useSelector((state) => (state.currentUserReducer))
  const token = currentUser?.result?.token;

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch({type:'POST_SOCIAL', payload: data });
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:5000/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch({type:'FETCH_POST', payload: data });
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    {Array.isArray(posts)?
    posts.map(
        ({
          _id,
          userId,
          name,
          description,
          picturePath,
          likes,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={name}
            description={description}
            picturePath={picturePath}
            likes={likes}
          />
        )
      ):
      (null)}
      
    </>
  );
};

export default PostsWidget;
