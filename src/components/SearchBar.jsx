import React, { useContext } from 'react'
import { shopContext } from '../context/shopContext'
import { assets } from '../assets/assets'

const SearchBar = () => {

  const {
    search,
    setSearch,
    showSearch,
    setshowSearch,
  } = useContext(shopContext)

  if (!showSearch) return null

  return (
    <div className="border-t border-b bg-gray-50 text-center">
      <div
        className="inline-flex items-center justify-between
        border border-gray-400 py-2 my-5 px-4
        rounded-full w-3/4 sm:w-1/2"
      >
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm"
        />

        <img
          src={assets.close}
          alt="close"
          className="w-4 cursor-pointer ml-3"
          onClick={() => setshowSearch(false)}
        />
      </div>
    </div>
  )
}

export default SearchBar
