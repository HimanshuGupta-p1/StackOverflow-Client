import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const Friend = ({ friendId, name}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUserReducer);
  const users = useSelector((state) => (state.userReducer))
  const _id = currentUser?.result?._id
  const user = users.filter((User) => User._id === _id)[0]
  const token = currentUser?.result?.token;
  const friends = user?.friends
  // console.log(friends)
  const primaryLight = '#ff9625';
  const primaryDark = '#000';
  const main = '#A3A3A3';


  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:5000/user/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch({type:'POST_FRIEND', payload: data });
    window.location.reload();
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
      <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color="white"><Link to={`/Users/${friendId}`} className='' style={{color:"white", textDecoration:"none"}}>{name.charAt(0).toUpperCase()}</Link></Avatar> 
      <Box
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: '#A3A3A3',
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "1rem" }}
      >
        {Array.isArray(friends) ? (friends.includes(friendId) ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )):<PersonAddOutlined sx={{ color: primaryDark }} />}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
