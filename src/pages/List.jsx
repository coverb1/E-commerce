import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async () => {

    try {
      const responce = await axios.get(backendUrl + '/api/products/list')
      if (responce.data.success) {
        setList(responce.data.allProducts)
      }
      else {
        toast.error(responce.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(() => {
    fetchList()
  }, [])

const removeProducts=async(id)=>{
 try {
   const remove=await axios.delete(backendUrl+'/api/products/removeProducts',{
    data:{id:id},
    headers:{
      token:token
    }
   }
    
   )

  if (remove.data.success) {
    toast.success(remove.data.message)
    await fetchList();
  }
  else{
    console.log(error)
    toast.error(error.message)
  }
 } catch (error) {
  
 }
}

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List table title */}

       <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>price</b>
          <b className='text-center'>Action</b>
        </div>
{/* All products  */}

{
  list.map((item,index)=>(
    <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] py-1 gap-2 px-2 border text-sm'>
<img className='w-12' src={item.images[0]} alt="" />
<p>{item.name}</p>
<p>{item.category}</p>
<p >{currency}{item.price}</p>
<p onClick={()=>removeProducts(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
    </div>
  ))
}
      </div>
    </>
  )
}

export default List