// import React, { useContext, useEffect, useState } from "react";
// import Nav from "../component/Nav";
// import Sidebar from "../component/Sidebar";
// import { authDataContext } from "../context/AuthContext";
// import axios from "axios";

// const Lists = () => {
//   let [list, setList] = useState([]);
//   let { serverUrl } = useContext(authDataContext);
//   const fetchList = async () => {
//     try {
//       let result = await axios.get(serverUrl + "/api/product/list");
//       setList(result.data);
//       console.log(result.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   useEffect(() => {
//     fetchList();
//   }, [])
//   return (
//     <div className="min-h-screen w-full relative bg-gradient-to-br from-[#020617] via-[#0b122b] to-[#020617] text-white overflow-hidden">

//       {/* subtle glow */}
//       <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[140px]" />
//       <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-orange-500/20 rounded-full blur-[140px]" />

//       <Nav />

//       <div className="flex pt-[70px]">
//         <Sidebar />

//         {/* Main content */}
//         <main
//           className="
//               flex-1
//               px-4
//               sm:px-6
//               md:px-8
//               lg:px-32
//               py-6
//               md:py-10
//               overflow-x-hidden
//             "
//         >
//           <h1 className="text-xl sm:text-2xl md:text-4xl mb-4 md:mb-6">
//             All Listed Product
//           </h1>

//           {list?.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {(() => {
//                 let cards = [];
//                 for (let i = 0; i < list.length; i++) {
//                   cards.push(
//                     <div key={i} className="bg-white/5 rounded-lg p-4">
//                       <img
//                         src={list[i].image?.[0]}
//                         className="w-full h-48 object-cover rounded-md"
//                       />
//                     </div>
//                   );
//                 }
//                 return cards;
//               })()}

//             </div>
//           ) : (
//             <div className="text-white text-lg">No product available.</div>
//           )}
//         </main>


//       </div>
//     </div>
//   );
// };

// export default Lists;


import React, { useContext, useEffect, useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from 'sonner';
import { RiDeleteBin6Line } from "react-icons/ri";

const Lists = () => {
  let [list, setList] = useState([]);
  let { serverUrl } = useContext(authDataContext);
  
 const fetchList = async () => {
  try {
    let result = await axios.get(serverUrl + "/api/product/list");
    console.log("🔍 FIRST PRODUCT FULL DATA:", result.data[0]);
    console.log("🔍 IMAGE URL:", result.data[0]?.image);
    setList(result.data);
  } catch (error) {
    console.log(error)
  }
}

const removeList = async(id)=>{
try {
let result = await axios.delete(`${serverUrl}/api/product/remove/${id}`, { withCredentials: true });
  if(result.data){
    fetchList()
      toast.success("Product deleted successfully!");


  }
  else{
    console.log("Failed to remove Product");
  }
} catch (error) {
  console.log(error)
}
}
  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-[#020617] via-[#0b122b] to-[#020617] text-white overflow-hidden">
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-orange-500/20 rounded-full blur-[140px]" />
      <Nav />
      <div className="flex pt-[70px]">
        <Sidebar />
        <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-32 py-6 md:py-10 overflow-x-hidden">
          <h1 className="text-xl sm:text-2xl md:text-4xl mb-4 md:mb-6">
            All Listed Product
          </h1>
              {list?.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {list.map((item, index) => (
      <div key={index} className="bg-white/5 rounded-lg p-4">
        
        {/* IMAGE */}
        <div className="w-full h-48 rounded-md overflow-hidden bg-gray-800 mb-3 flex items-center justify-center">
          {item.image?.[0] ? (
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-[50%] h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          ) : (
            <span className="text-gray-400">📷 No Image</span>
          )}
        </div>

        {/* INFO */}
        <h3 className="font-bold text-xl line-clamp-1">
          {index + 1}. {item.name} ({item.category})
        </h3>
        <p className="text-orange-400 text-2xl font-black">₹{item.price}</p>
        <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>

        {/* DELETE BUTTON */}
        <div className="flex justify-end mt-2">
          <span
            className="text-xl font-bold cursor-pointer hover:text-red-500 transition-colors"
            onClick={() => removeList(item._id)}
            
          > 
  

            <RiDeleteBin6Line />
            
          </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <div className="text-4xl mb-2">📷</div>
            <span className="text-sm">No Products</span>
          </div>
        )}


          
                </main>
              </div>
            </div>
          );
        };

        export default Lists;
