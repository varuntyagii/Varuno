// import React, { useContext, useEffect, useState } from 'react'
// import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
// import Title from '../component/Title';
// import { shopDataContext } from '../context/ShopContext';
// import Card from '../component/Card';
// import Footer from './Footer';

// const Collection = () => {
//   let [showFilter, setShowFilter] = useState(false);
//   let {product, search, showSearch} = useContext(shopDataContext);
  
//   let [filterProduct, setfilterProduct] = useState([]);
  
//   let [category, setCategory] = useState([]);
//   let [subCategory, setSubCategory] = useState([]);

//   let [sortType, setSortType] = useState("Relavent");

//   const toggleCategory = (e)=>{
//     if(category.includes(e.target.value)){
//       setCategory(prev=>prev.filter(item=>item !== e.target.value))
//     }
//     else{
//       setCategory(prev=>[...prev, e.target.value]); //Usko array ke end me add kar diya
//     }
//   }
//   const toggleSubCategory = (e)=>{
//        if(subCategory.includes(e.target.value)){
//       setSubCategory(prev=>prev.filter(item=>item !== e.target.value))
//     }
//       else{
//       setSubCategory(prev=>[...prev, e.target.value]); //Usko array ke end me add kar diya
//     }

//   }

//   const applyFilter = ()=>{
//     let productCopy = product.slice();
//     if(showSearch && search){
//       productCopy = productCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
//     }
//     if(category.length > 0){
//           productCopy = productCopy.filter((item)=>{
//            return category.includes((item.category))
//           })
//     }
//     if(subCategory.length > 0){
//           productCopy = productCopy.filter((item)=>{
//            return  subCategory.includes((item.subCategory))
//           })
//     }
//     setfilterProduct(productCopy)
//   }
//  const sortProduct = () => {
//   let fbCopy = [...filterProduct]; // real clone

//   if (sortType === 'low-high') {
//     fbCopy.sort((a, b) => a.price - b.price);
//   } 
//   else if (sortType === 'high-low') {
//     fbCopy.sort((a, b) => b.price - a.price);
//   }

//   setfilterProduct(fbCopy);
// };

// // useEffect(() => {
// //   applyFilter();

// // }, [category, subCategory]);
// useEffect(() => {
//   sortProduct();
// }, [sortType]);

//   useEffect(()=>{
//     setfilterProduct(product);
//   },[product])

//   useEffect(()=>{
//     applyFilter();
//   }, [category, subCategory,  search, showSearch]);
//   return (
//     <div className="w-full min-h-screen
//  bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 
//     items-start
//     md:flex-col
//     justify-start
//     pt-[70px]
//     overflow-x-hidden
//     z-[2]
//     flex 
//     flex-col
//   mb-20 md:mb-0
//   overflow-y-hidden overflow-x-hidden 
//     ">

//       <div className='md:w-[30vw] border-gray-400 lg:w-[20vw] w-[100vw] md:min-h-[100vw] p-[20px] border-r-[1px] text-[#aaf5fa] lg:fixed  font-spaceGrotesk  '>
//        <p
//           className="text-[25px] font-semibold flex gap-5 items-center justify-start 
//                     cursor-pointer select-none"
//           onClick={() => setShowFilter(prev => !prev)}
//         >
//           FILTER
//           <span
//             className={`transition-transform duration-300 ease-in-out md:hidden ${
//               showFilter ? "rotate-90" : "rotate-0"
//             }`}
//           >
//             <FaChevronRight />
//           </span>
//         </p>

//       </div>
//      <div className={`border-[2px] border-[#f8fa] pl-5 px-2 py-2 mt-4 md:mt-20 rounded-md bg-slate-600 ml-4 z-30 ${showFilter ? "" : "hidden"} md:block`} >
//   <p className=' text-[18px] text-[#f8fafa] font-spaceGrotesk '> CATEGORIES </p>
//   <div className=' w-[230px] h-[120px] flex flex-col items-start justify-center gap-[10px]'>
//     <p className='flex items-center gap-[10px] text-16px font-light'> 
//       <input type="checkbox" value={'Men'} className='w-3' onChange={toggleCategory}/> Men</p>
//     <p className='flex items-center gap-[10px] text-16px font-light'> 
//       <input type="checkbox" value={'Women'} className='w-3' onChange={toggleCategory}/> Women</p>
//     <p className='flex items-center gap-[10px] text-16px font-light'> 
//       <input type="checkbox" value={'Kids'} className='w-3' onChange={toggleCategory}/> Kids</p>
//   </div>
// </div> 

// <div className={`border-[2px] border-[#f8fa] pl-5 px-2 py-2 mt-2 md:mt-4 rounded-md bg-slate-600 ml-4 z-30 ${showFilter ? "" : "hidden"} md:block`} >
//   <p className=' text-[18px] text-[#f8fafa] font-spaceGrotesk ' > SUB-CATEGORIES </p>
//   <div className=' w-[230px] h-[120px] flex flex-col items-start justify-center gap-[10px]'>
//     <p className='flex items-center gap-[10px] text-16px font-light'> 
//       <input type="checkbox" value={'TopWear'} className='w-3' onChange={toggleSubCategory}/> TopWear</p>
//     <p className='flex items-center gap-[10px] text-16px font-light'> 
//       <input type="checkbox" value={'BottomWear'} className='w-3' onChange={toggleSubCategory}/> BottomWear</p>
//     <p className='flex items-center gap-[10px] text-16px font-light'> 
//       <input type="checkbox" value={'WinterWear'} className='w-3' onChange={toggleSubCategory}/> WinterWear</p>
//   </div>
// </div> 

//             <div className='lg:pl-[20%] md:py-[20px] py-[20px]  ' > 
//               <div className=' md:w-[80vw] w-[100vw] p-[30px] flex flex-col lg:flex-row lg:px-[50px] justify-between md:-mt-100 mt-10'>
//                 <Title text1={'ALL'} text2={"COLLECTION"}/>
//                 <select name="" id="" value={sortType}
//                 onChange={(e) => setSortType(e.target.value)}
//                 className='bg-slate-600 w-[60%] md:w-[200px] h-[50px] px-[10px] text-white rounded-lg hover:border-[#46d1f7] border-[2px] '>
//                   <option value="relavent" className=' w-full h-full '>Sort By: Relavent</option>
//                   <option value="low-high" className=' w-full h-full '>Sort By: Low to High</option>
//                   <option value="high-low" className=' w-full h-full '>Sort By: High to Low</option>
//                 </select>
//               </div>
//               <div className='lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[60vh] flex items-center justify-center flex-wrap gap-[30px] '>
//                 {
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                           {filterProduct.map(item => (
//                             <Card
//                               key={item._id}
//                               id={item._id}
//                               name={item.name}
//                               price={item.price}
//                               image={item.image}
//                             />
//                           ))}
//                         </div>

//                 }
//               </div>
//             </div>
// <Footer/>
//     </div>
//   )
// }

// export default Collection

import React, { useContext, useEffect, useState } from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

const Collection = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { product, search, showSearch } = useContext(shopDataContext);
  
  const [filterProduct, setfilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () => {
    let productCopy = product.slice();
    
    if (showSearch && search) {
      productCopy = productCopy.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    if (category.length > 0) {
      productCopy = productCopy.filter(item => 
        category.includes(item.category)
      )
    }
    
    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item => 
        subCategory.includes(item.subCategory)
      )
    }
    
    setfilterProduct(productCopy)
  }

  const sortProduct = () => {
    let fbCopy = [...filterProduct];

    if (sortType === 'low-high') {
      fbCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      fbCopy.sort((a, b) => b.price - a.price);
    }

    setfilterProduct(fbCopy);
  };

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    setfilterProduct(product);
  }, [product])

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 pt-[70px] flex flex-col overflow-y-hidden overflow-x-hidden  ">
      
  {/* Background blurs */}
  
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full">
        
        {/* Sidebar Filter - Desktop */}
        <div className="hidden lg:block lg:w-[250px] xl:w-[300px] border-r border-gray-700 p-6 fixed h-screen overflow-y-auto">
          <p className="text-2xl font-bold text-[#aaf5fa] mb-6 font-spaceGrotesk">
            FILTERS
          </p>
          
          {/* Categories */}
          <div className="mb-6">
            <p className="text-lg text-white font-spaceGrotesk mb-3">CATEGORIES</p>
            <div className="flex flex-col gap-3 text-gray-300">
              <label className="flex items-center gap-3 cursor-pointer hover:text-[#aaf5fa] transition">
                <input type="checkbox" value="Men" className="w-4 h-4 cursor-pointer" onChange={toggleCategory} />
                <span>Men</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-[#aaf5fa] transition">
                <input type="checkbox" value="Women" className="w-4 h-4 cursor-pointer" onChange={toggleCategory} />
                <span>Women</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-[#aaf5fa] transition">
                <input type="checkbox" value="Kids" className="w-4 h-4 cursor-pointer" onChange={toggleCategory} />
                <span>Kids</span>
              </label>
            </div>
          </div>

          {/* Sub Categories */}
          <div>
            <p className="text-lg text-white font-spaceGrotesk mb-3">SUB-CATEGORIES</p>
            <div className="flex flex-col gap-3 text-gray-300">
              <label className="flex items-center gap-3 cursor-pointer hover:text-[#aaf5fa] transition">
                <input type="checkbox" value="TopWear" className="w-4 h-4 cursor-pointer" onChange={toggleSubCategory} />
                <span>TopWear</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-[#aaf5fa] transition">
                <input type="checkbox" value="BottomWear" className="w-4 h-4 cursor-pointer" onChange={toggleSubCategory} />
                <span>BottomWear</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:text-[#aaf5fa] transition">
                <input type="checkbox" value="WinterWear" className="w-4 h-4 cursor-pointer" onChange={toggleSubCategory} />
                <span>WinterWear</span>
              </label>
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden px-4 py-3">
          <button
            onClick={() => setShowFilter(prev => !prev)}
            className="flex items-center gap-3 text-[#aaf5fa] text-xl font-semibold font-spaceGrotesk"
          >
            FILTERS
            <FaChevronRight className={`transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Mobile Filter Dropdown */}
        {showFilter && (
          <div className="lg:hidden px-4 pb-4 space-y-4">
            {/* Categories Mobile */}
            <div className="bg-slate-700/50 border border-gray-600 rounded-lg p-4">
              <p className="text-lg text-white font-spaceGrotesk mb-3">CATEGORIES</p>
              <div className="flex flex-col gap-3 text-gray-300">
                <label className="flex items-center gap-3">
                  <input type="checkbox" value="Men" className="w-4 h-4" onChange={toggleCategory} />
                  <span>Men</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" value="Women" className="w-4 h-4" onChange={toggleCategory} />
                  <span>Women</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" value="Kids" className="w-4 h-4" onChange={toggleCategory} />
                  <span>Kids</span>
                </label>
              </div>
            </div>

            {/* Sub Categories Mobile */}
            <div className="bg-slate-700/50 border border-gray-600 rounded-lg p-4">
              <p className="text-lg text-white font-spaceGrotesk mb-3">SUB-CATEGORIES</p>
              <div className="flex flex-col gap-3 text-gray-300">
                <label className="flex items-center gap-3">
                  <input type="checkbox" value="TopWear" className="w-4 h-4" onChange={toggleSubCategory} />
                  <span>TopWear</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" value="BottomWear" className="w-4 h-4" onChange={toggleSubCategory} />
                  <span>BottomWear</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" value="WinterWear" className="w-4 h-4" onChange={toggleSubCategory} />
                  <span>WinterWear</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Products Section */}
        <div className="flex-1 lg:ml-[250px] xl:ml-[300px]">
          {/* Header with Title and Sort */}
          <div className="px-4 sm:px-6 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Title text1="ALL" text2="COLLECTION" />
            
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="bg-slate-600 w-full sm:w-[200px] h-12 px-4 text-white rounded-lg border-2 border-transparent hover:border-[#46d1f7] transition cursor-pointer"
            >
              <option value="relavent">Sort By: Relevant</option>
              <option value="low-high">Sort By: Low to High</option>
              <option value="high-low">Sort By: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="px-4 sm:px-6 lg:px-12 pb-12">
            {filterProduct.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterProduct.map(item => (
                  <Card
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-400 text-xl">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Collection