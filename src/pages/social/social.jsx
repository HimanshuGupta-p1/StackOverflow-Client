import React from 'react'
import { Box, useMediaQuery } from "@mui/material";
import MyPostWidget from './myPostWidget'
import PostsWidget from './postsWidget'
import { useSelector } from 'react-redux'
import FriendListWidget from './friendsList';
import AdvertWidget from './AdvertWidget';

const Social = () => {
  const currentUser = useSelector((state) => (state.currentUserReducer))
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const _id = currentUser?.result?._id
  return (
      <Box
        width="100%"
        padding="2rem 0"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        style={{backgroundColor:'#CCF7FE'}}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined} display={isNonMobileScreens?"block":"none"}>
          <br/>
          <br/>
        <FriendListWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
        >
          <MyPostWidget />
          <PostsWidget userId={_id} />
        </Box>
          <Box flexBasis="26%">
            <br/>
            <br/>
            <AdvertWidget/>
          </Box>
      </Box>
    
    )
}

export default Social