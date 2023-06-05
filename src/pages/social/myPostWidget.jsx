import {
    EditOutlined,
    DeleteOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "../../components/widgets/FlexBetween";
  import Dropzone from "react-dropzone";
  import WidgetWrapper from "../../components/widgets/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import { Link } from "react-router-dom";
//   import { setPosts } from "state";
  
  const MyPostWidget = () => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [isGif, setIsGif] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const currentUser = useSelector((state) => (state.currentUserReducer));
    const _id = currentUser?.result?._id;
    const token = currentUser?.result?.token;
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = '#fff';
    const medium = '';
  
    const handlePost = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }
  
      const response = await fetch(`http://localhost:5000/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch({type:'POST_SOCIAL', payload:posts });
      setImage(null);
      setIsImage(false);
      setIsGif(false);
      setIsVideo(false);
      setPost("");
    };
  
    return (
      <WidgetWrapper>
        <br/>
        <br/>
        <FlexBetween gap="1.5rem">
        <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color="white"><Link to={`/Users/${_id}`} className='' style={{color:"white", textDecoration:"none"}}>{currentUser?.result?.name.charAt(0).toUpperCase()}</Link></Avatar>
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: '#fff',
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
        </FlexBetween>
        {(isImage || isVideo || isGif) && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Drag or Upload Files Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>
  
          {isNonMobileScreens ? (
            <>
              <FlexBetween gap="0.25rem" onClick={() => setIsGif(!isGif)}>
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}  sx={{ "&:hover": { cursor: "pointer", color: medium }}}>Clip</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem" onClick={() => setIsVideo(!isVideo)}>
                <VideocamOutlinedIcon sx={{ color: mediumMain }} />
                <Typography sx={{ cursor: "pointer", color: mediumMain }}>Video</Typography>
              </FlexBetween>
            </>
          ) : (
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}
  
          <Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: '#000',
              backgroundColor: '#fff',
              borderRadius: "3rem",
            }}
          >
            POST
          </Button>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default MyPostWidget;