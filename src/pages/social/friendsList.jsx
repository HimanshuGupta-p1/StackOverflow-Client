import { Box, Typography} from "@mui/material";
import Friend from "../../components/widgets/Friend";
import WidgetWrapper from "../../components/widgets/WidgetWrapper";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";


const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => (state.currentUserReducer))
  const users = useSelector((state) => (state.userReducer))
  const user = users.filter((User) => User._id === userId)[0]
  const token = currentUser?.result?.token;
  // var friends = currentUser?.result?.friends;
  // console.log(friends)
  var friendsDetails = []
  if(Array.isArray(user?.friends)){
    users.forEach((User) => {if (user?.friends.includes(User._id)){
    friendsDetails.push({_id: User._id , name : User.name})
  }});
}
// console.log(friendsDetails)

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:5000/user/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch({type:'POST_FRIEND', payload: data });
  };
  
  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color="#A3A3A3"
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {Array.isArray(friendsDetails)? friendsDetails.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={friend.name}
          />
        )):
        (null)}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
