import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { backendUrl } from '../App'

const Add = () => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [sizes, setSizes] = useState([])

  const onsubmitHandler = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")

    try {

      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1) // checking if the image 1 is available
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const responce = await axios.post(backendUrl + "/api/products/add", formData, {
        headers: {
          token: token
        }
      })

      if (responce.data.success) {
        toast.success("Item added")
        description('')
        setName("")
        setImage1('')
        setImage2('')
        setImage3('')
        setImage4('')
        setPrice('')
      }
else{
  toast.error("failed to add")
}
      console.log(responce)
    } catch (error) {
toast.error(error.messsage)
    }

  }

  return (
    <form onSubmit={onsubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p>Upload</p>
        <div className='flex  flex-row gap-2'>
          <label htmlFor="image1">
            <img className='w-20 h-28 cursor-pointer' src={!image1 ? assets.upload : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
          </label>

          <label htmlFor="image2">
            <img className='w-20 h-28 cursor-pointer' src={!image2 ? assets.upload : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
          </label>

          <label htmlFor="image3">
            <img className='w-20 h-28 cursor-pointer' src={!image3 ? assets.upload : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
          </label>

          <label htmlFor="image4">
            <img className='w-20 h-28 cursor-pointer' src={!image4 ? assets.upload : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>

        </div>
      </div>

      <div className='w-full'>
        <p>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w[500px] px-3 py-2' type="text" placeholder='typer here' required />
      </div>




      <div className='w-full'>
        <p>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w[500px] px-3 py-2' type="text" placeholder='write Description' required />
      </div>

      <div >
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p>Product price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
        </div>

        <div>
          <p>Product Sizes</p>
          <div className=' flex flex-row gap-3'>
            <div onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(item => item !== "S") : [...prev, "S"])}>
              <p className={` ${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
            </div>

            <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
              <p className={` ${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
            </div>

            <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
              <p className={` ${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
            </div>

            <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
              <p className={` ${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
            </div>

            <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
              <p className={` ${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
            </div>
          </div>
        </div>
      </div>

      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  )
}

export default Add