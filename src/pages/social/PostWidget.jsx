import {
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { IconButton,Typography} from "@mui/material";
  import FlexBetween from "../../components/widgets/FlexBetween";
  import Friend from "../../components/widgets/Friend";
  import WidgetWrapper from "../../components/widgets/WidgetWrapper";
  import { useDispatch, useSelector } from "react-redux";
  import { useLocation } from "react-router-dom";
  import copy from 'copy-to-clipboard'

  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    picturePath,
    likes,
  }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => (state.currentUserReducer))
    const token = currentUser?.result?.token;
    const loggedInUserId = currentUser?.result?._id;
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const main = '#A3A3A3';
    // const primary = '#ff9625'
    const u_location = useLocation()
    const url = 'https://localhost:3000'
  
    const handleShare = () => {
      copy(url + u_location.pathname)
      alert('Copied url : ' + url + u_location.pathname )
    }
  
    // const handleSubmit = async (values) => {
    //   const response = await fetch(`http://localhost:6001/posts/${postId}/comment`, {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ userId: loggedInUserId, values}),
    //   });
    //   const updatedPost = await response.json();
    //   dispatch({type:'FETCH_POST', payload: updatedPost });
    // }
    const patchLike = async () => {
      const response = await fetch(`http://localhost:5000/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch({type:'FETCH_POST', payload: updatedPost });
    };
  
    return (
      <WidgetWrapper m="2rem 0">
        <Friend
          friendId={postUserId}
          name={name}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={`http://localhost:5000/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: '#fff' }} />
                ) : (
                  <FavoriteBorderOutlined sx={{color:'#fff'}} />
                )}
              </IconButton>
              <Typography color="#fff">{likeCount}</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined onClick={handleShare} sx={{ color: '#fff' }} />
          </IconButton>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;
  