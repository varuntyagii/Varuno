import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'

const RelatedProduct = ({ currentProductId }) => {
    const { product, currency } = useContext(shopDataContext)

    // Get 4 related products (excluding current product)
    const relatedProducts = product
        ?.filter(p => p._id !== currentProductId)
        ?.slice(0, 12) || []

    // Rating stars component
    const RatingStars = ({ rating = 4.5, reviews = 127 }) => (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-500'
                        }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
            <span className="text-xs text-gray-400 ml-1">({reviews})</span>
        </div>
    )

    if (relatedProducts.length === 0) return null

    return (
        <div className="w-full bg-gray-900 py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">You Might Also Like</h2>
                    <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {relatedProducts.map((productItem) => (
                        // In RelatedProduct.jsx - CHANGE THIS LINE:
                        <Link
                            key={productItem._id}
                            to={`/productDetails/${productItem._id}`}
                            className="group"
                        >

                            <div className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 p-4 hover:bg-gray-750 transition-colors">
                                {/* Image */}
                                <div className="w-full h-48 rounded-lg overflow-hidden mb-4 group-hover:scale-105 transition-transform">
                                    <img
                                        src={productItem.image?.[0] || productItem.image1 || 'https://via.placeholder.com/300x300/374151/9CA3AF?text=No+Image'}
                                        alt={productItem.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 group-hover:text-gray-300">
                                        {productItem.name}
                                    </h3>

                                    {/* Rating */}
                                    <RatingStars rating={4.2} reviews={Math.floor(Math.random() * 200) + 50} />

                                    {/* Price */}
                                    <div className="text-lg md:text-xl font-bold text-white">
                                        {currency} {productItem.price}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RelatedProduct
