import { useState, useContext } from 'react'
import Sunscreens from '../../components/Sunscreens'
import UserContext from '../../contexts/UserContext'

export default function AllSunscreens() {

  console.log('AllSunscreensPage')

  return (
    <>
      <h1 className='text-center my-16'>All Sunscreens</h1>
      
      <Sunscreens />
    </>
  )
}
