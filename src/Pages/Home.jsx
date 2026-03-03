import React, { useContext } from 'react'
import LatestCollection from '../components/LatestCollection'
import { shopContext } from '../context/ShopContext'

const Home = () => {
const {token}=useContext(shopContext)


return (
    <div>
      <LatestCollection/>
    </div>
  )
}

export default Home