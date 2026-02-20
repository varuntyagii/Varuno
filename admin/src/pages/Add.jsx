import React, { useContext, useState } from "react";
import Nav from "../component/Nav";
import Sidebar from "../component/Sidebar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  let { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);
  const handleSizeToggle = (size) => {
   
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //     console.log({
  //       name,
  //       description,
  //       price,
  //       category,
  //       subCategory,
  //       bestseller,
  //       sizes,
  //       images: [image1, image2, image3, image4].filter(Boolean),
  //     });
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true);

    try {
      let formData = new FormData()
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      if (image1) formData.append("image1", image1);
if (image2) formData.append("image2", image2);
if (image3) formData.append("image3", image3);
if (image4) formData.append("image4", image4);

      let result = await axios.post(serverUrl + "/api/product/addProduct", formData, { withCredentials: true });
      console.log(result.data)
      setLoading(false);
      if (result.data) {
        setName("")
        setDescription("")
        setImage1(null)
        setImage2(null)
        setImage3(null)
        setImage4(null)
        setPrice("")
        setCategory("Men");
        setSubCategory("TopWear")
         setSizes([]);   
         toast.success("Product added successfully!");


      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b122b] to-[#020617]">
      {/* Glow Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-orange-500/20 rounded-full blur-[140px]" />
      </div>

      {/* Fixed Nav & Sidebar */}
      <Nav />
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="pt-19 px-4 pb-12 md:ml-24">
  <div className="max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold text-white mb-8">
      Add Product
    </h1>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="bg-white rounded-xl shadow-lg p-6 space-y-6"
          >
            {/* IMAGES */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-700">
                Upload Images
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[image1, image2, image3, image4].map((img, i) => (
                  <label key={i} className="cursor-pointer block">
                    {!img ? (
                      <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400 transition">
                        <span className="text-gray-400 text-xl">+</span>
                      </div>
                    ) : (
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`upload-${i}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                    )}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const setters = [
                          setImage1,
                          setImage2,
                          setImage3,
                          setImage4,
                        ];
                        setters[i](e.target.files[0]);
                      }}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                required
              />
            </div>

            {/* CATEGORY / PRICE */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option>Men</option>
                <option>Women</option>
                <option>Kids</option>
                <option>Other</option>
              </select>

              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option>Topwear</option>
                <option>Bottomwear</option>
                <option>Winterwear</option>
              </select>

              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₹ Price"
                className="px-4 py-2 border rounded-lg"
                required
              />
            </div>

            {/* SIZES */}
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-4 py-2 border rounded-lg ${sizes.includes(size)
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* BESTSELLER */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={bestseller}
                onChange={(e) => setBestseller(e.target.checked)}
              />
              <span className="text-sm text-gray-700">Add to Bestseller</span>
            </label>

            {/* SUBMIT */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
              {loading ? "Loding..." : "Add Product"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Add;
