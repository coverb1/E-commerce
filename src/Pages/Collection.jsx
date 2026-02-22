import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'


const Collection = () => {
  const { products, search, showsearch } = useContext(shopContext)
  const [filterProducts, setFilterProducts] = useState([])
  const [Category, setcategory] = useState([])
  const [subCategory, setsubCategory] = useState([])
  const [sortType, setsortType] = useState('Relevant')

  const togglecategory = (e) => {
    if (Category.includes(e.target.value)) {
      setcategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setcategory((prev) => [...prev, e.target.value])
    }
  }

  const togglesubcategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setsubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setsubCategory((prev => [...prev, e.target.value]))
    }
  }

  useEffect(() => {
    setFilterProducts(products)
  }, [subCategory])

  const applyfiltter = () => {
    let productsCopy = products.slice()
    if (search && showsearch) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (Category.length > 0) {
      productsCopy = productsCopy.filter(item => Category.includes(item.category));
    }
    setFilterProducts(productsCopy)
  }

  useEffect(() => {
    console.log(subCategory)
  }, [subCategory])

  useEffect(() => {
    applyfiltter()
  }, [Category, subCategory, search, showsearch])

  useEffect(() => {
    setFilterProducts(products)
  },[products])

  const sortProduct = () => {
    let fpCopy = filterProducts.slice()
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)))
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)))
        break;
      default:
        applyfiltter();
        break;
    }
  }

  useEffect(() => {
    sortProduct()
  }, [sortType])


  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t">

      {/* LEFT SIDEBAR */}
      <div className="w-full sm:w-64">
        <p className="text-xl font-semibold mb-5">Filters</p>

        {/* Category */}
        <div className="border rounded-lg p-5 mb-5">
          <p className="text-sm font-medium mb-3">Categories</p>
          <div className="flex flex-col gap-3 text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" value={'men'} onChange={togglecategory} /> Men
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" value={'girl'} onChange={togglecategory} /> Women
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" value={'kids'} onChange={togglecategory} /> Kids
            </label>
          </div>
        </div>

        {/* Type */}
        <div className="border rounded-lg p-5">
          <p className="text-sm font-medium mb-3">Type</p>
          <div className="flex flex-col gap-3 text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" value={'Topwear'} onChange={togglesubcategory} /> Topwear
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" value={'Bottomwear'} onChange={togglesubcategory} /> Bottomwear
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" value={'Winterwear'} onChange={togglesubcategory} /> Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1">

        {/* Sort */}
        <div className="flex justify-end mb-6">
          <select onChange={(e) => setsortType(e.target.value)} className="border border-gray-300 rounded-md text-sm px-3 py-2">
            <option value='Relevant'>Sort by: Relevant</option>
            <option value='low-high'>Price: Low to High</option>
            <option value='high-low'>Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.images}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Collection
