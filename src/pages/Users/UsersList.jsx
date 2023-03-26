import React from 'react'
import { useSelector } from 'react-redux'
import User from './User'
const UsersList = () => {
    const users = useSelector((state) => state.userReducer)
  return (
    <div className='user-list-container'>
            {
                users.map((user) => (
                    <User user={user} key={user?._id} />
                ))
            }
        </div>
  )
}

export default UsersList