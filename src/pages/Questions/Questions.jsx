import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import Homemainbar from '../../components/HomeMainbar/HomeMainbar'
import '../../App.css'
const Questions = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar/>
      <div className='home-container-2'>
        <Homemainbar/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default Questions;