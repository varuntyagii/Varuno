import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import Footer from './Footer'
import RelatedProduct from './RelatedProduct'

const ProductDetails = () => {
    const { productId } = useParams()
    const navigate = useNavigate()
    const { product, currency, addToCart } = useContext(shopDataContext)
    const [productData, setProductData] = useState(null)
    const [currentImage, setCurrentImage] = useState('')
    const [selectedSize, setSelectedSize] = useState('M')
    
    // Rating stars component
    const RatingStars = ({ rating = 4.5, reviews = 127 }) => (
        <div className="flex items-center gap-2">
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-400'
                            }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            <span className="text-sm text-gray-400 font-medium">({reviews})</span>
        </div>
    )

    useEffect(() => {
        if (!product || !Array.isArray(product)) return

        const foundProduct = product.find(item => item._id == productId)
        if (foundProduct) {
            setProductData(foundProduct)
            setCurrentImage(foundProduct.image?.[0] || foundProduct.image1 || '')
        }
    }, [productId, product])

    if (!productData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-xl">Loading...</div>
            </div>
        )
    }

    const images = Array.isArray(productData.image)
        ? productData.image
        : [productData.image1, productData.image2, productData.image3, productData.image4].filter(Boolean);

    // 🔥 Category display logic
    const getCategoryBadge = (category) => {
        if (!category) return null

        const categoryInfo = {
            'male': { label: 'Men', color: 'bg-blue-500/20 border-blue-500/50 text-blue-400' },
            'female': { label: 'Women', color: 'bg-pink-500/20 border-pink-500/50 text-pink-400' },
            'men': { label: 'Men', color: 'bg-blue-500/20 border-blue-500/50 text-blue-400' },
            'women': { label: 'Women', color: 'bg-pink-500/20 border-pink-500/50 text-pink-400' }
        }

        const info = categoryInfo[category.toLowerCase()] || { label: category, color: 'bg-gray-500/20 border-gray-500/50 text-gray-400' }

        return (
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${info.color}`}>
                {info.label}
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 overflow-y-hidden overflow-x-hidden mb-20 md:mb-0 ">
            <div className="flex-grow py-12 px-4 md:px-8">
                {/* Back Button */}
                <div className="max-w-6xl mx-auto mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 mt-8"
                    >
                        ← Back
                    </button>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-8 mb-2">
                    {/* Images */}
                    <div className="space-y-6">
                        <div className="w-full max-w-2xl bg-gray-800 rounded-xl p-2 border border-gray-700">
                            <img
                                src={currentImage || images[0]}
                                alt={productData.name}
                                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
                            />
                        </div>

                        {images.length > 0 && (
                            <div className="flex gap-3 justify-center flex-wrap mt-4">
                                {images.slice(0, 5).map((img, index) => (
                                    <div
                                        key={index}
                                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer ${currentImage === img
                                            ? 'border-white'
                                            : 'border-gray-700 hover:border-gray-500'
                                            }`}
                                        onClick={() => setCurrentImage(img)}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumb ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div className="mt-4">
                            <h1 className="text-4xl font-bold text-white mb-4">{productData.name}</h1>

                            {/* 🔥 CATEGORY BADGE */}
                            <div className="flex items-center gap-4 mb-4">
                                {getCategoryBadge(productData.category)}
                                <RatingStars rating={4.5} reviews={128} />
                            </div>

                            <div className="text-4xl font-bold text-white mt-4">
                                {currency} {productData.price}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mt-6">
                            <h3 className="text-xl font-semibold text-white mb-6">Size</h3>
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 rounded-lg font-medium text-sm border flex items-center justify-center transition-colors ${selectedSize === size
                                            ? 'bg-white text-gray-900 border-white shadow-md'
                                            : 'bg-transparent text-white border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-gray-400 mt-4">
                                Selected: <span className="text-white font-medium">{selectedSize}</span>
                            </p>
                        </div>

                        {/* Add to Cart */}
                        <button className="w-full h-14 bg-white text-gray-900 rounded-lg font-bold text-lg border-2 border-white hover:bg-gray-100 mt-6 flex items-center justify-center" onClick={() => addToCart(productData._id, selectedSize)}>
                            Add to Cart
                            
                        </button>


                        {/* Description */}
                        <div className="mt-8 mb-12 rounded-lg border border-gray-700 bg-gray-800 p-6">
                            <h3 className="text-lg font-semibold text-white mb-3">
                                Product Description
                            </h3>
                            <div className="h-px w-full bg-gray-700 mb-4"></div>
                            <p className="text-gray-300 text-sm leading-7">
                                {productData.description || 'Premium quality product crafted for everyday use with comfort and durability in mind.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3 Bottom Images */}
                {images.length >= 3 && (
                    <div className="max-w-6xl mx-auto mt-16">
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-semibold text-white mb-6 text-center">More Views</h3>
                            <div className="flex gap-4 justify-center">
                                {images.slice(0, 3).map((img, index) => (
                                    <div
                                        key={`bottom-${index}`}
                                        className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-700 hover:border-gray-500 cursor-pointer"
                                        onClick={() => setCurrentImage(img)}
                                    >
                                        <img
                                            src={img}
                                            alt={`View ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 🔥 Related Products with Category Filter */}
                <RelatedProduct
                    currentProductId={productData._id}
                    category={productData.category}  // 🔥 Passes category for filtering
                />

            </div>
            <Footer />
        </div>
    )
}

export default ProductDetails
