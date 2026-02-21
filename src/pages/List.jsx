import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'

const List = () => {

const [list,setList]=useState([])

const fetchList=async()=>{

  try {
    const responce=await axios.get(backendUrl + '/api/products/list')
    console.log(responce)
  } catch (error) {
    
  }

}

useEffect(()=>{
fetchList()  
},[])

  return (
    <div>

    </div>
  )
}

export default List