import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { IconButton,} from "@mui/material";
import { useParams } from 'react-router'
import Avatar from '../../components/Avatar/Avatar'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import './UserProfile.css'
import moment from 'moment'

const UserProfile = () => {
    const { id } = useParams()
    const users = useSelector((state) => state.userReducer)
    const currentProfile = users.filter((user) => user._id === id)[0]
    // console.log(users.filter((user) => user._id === id))
    const currentUser = useSelector((state) => state.currentUserReducer)
    const dispatch = useDispatch();
    const _id = currentUser?.result?._id
    const user = users.filter((User) => User._id === _id)[0]
    const token = currentUser?.result?.token;
    const friends = user?.friends
    const primaryLight = '#ff9625';
    const primaryDark = '#000';
  
  
    const patchFriend = async () => {
      const response = await fetch(
        `http://localhost:5000/user/${_id}/${id}`,
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
    //   window.location.reload();
    };
    const [Switch, setSwitch] = useState(false)
    return (
        <div className='home-container-1'>
            <LeftSidebar />
            <div className='home-container-2'>
                <section>
                    <div className='user-details-container'>
                        <div className='user-details'>
                            <Avatar value={currentProfile?.name.charAt(0).toUpperCase()} backgroundColor="purple" color="white" fontSize='50px' px='40px' py='30px' >
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                                <p>Memebership : {currentProfile?.accountType.toUpperCase()}</p>
                                <p>Friend { }
                                <IconButton
                                    onClick={() => patchFriend()}
                                    sx={{ backgroundColor: primaryLight,p: "1rem" }}
                                >
                                    {Array.isArray(friends) ? (friends.includes(id) ? (
                                        <PersonRemoveOutlined sx={{ color: primaryDark }} />
                                    ) : (
                                        <PersonAddOutlined sx={{ color: primaryDark }} />
                                    )) : (
                                    <PersonAddOutlined sx={{ color: primaryDark }} />)}
                                </IconButton>
                                </p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type='button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                                </button>
                            )
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch} />
                            ) : (
                                <ProfileBio currentProfile={currentProfile} />
                            )
                        }
                    </>
                </section>
            </div>

        </div>
    )
}

export default UserProfile