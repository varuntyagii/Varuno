import { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";

const Wishlist = () => {
  const { wishlist } = useContext(shopDataContext);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-7xl mx-auto mt-14 sm:mt-16 lg:mt-10">
      {/* Header Section - Fully Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-100">
            Liked Items
          </h1>
          <span className="bg-rose-500/10 text-rose-400 text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-rose-500/20">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        
        {/* Optional: Clear all button for mobile/desktop */}
        {wishlist.length > 0 && (
          <button 
            onClick={() => {/* Add clear all functionality if needed */}}
            className="text-xs sm:text-sm text-gray-400 hover:text-rose-400 transition-colors self-start sm:self-auto"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Empty State - Responsive */}
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-24 px-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gray-800/50 rounded-full flex items-center justify-center mb-4 sm:mb-5 lg:mb-6">
            <svg 
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </div>
          <p className="text-gray-200 text-base sm:text-lg lg:text-xl font-medium mb-2">
            No liked items yet
          </p>
          <p className="text-gray-400 text-xs sm:text-sm lg:text-base text-center max-w-xs">
            Tap the heart icon on any product to add it to your wishlist
          </p>
          <button 
            onClick={() => window.location.href = '/collection'}
            className="mt-6 sm:mt-8 px-5 sm:px-6 py-2.5 sm:py-3 bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-medium rounded-xl transition-colors shadow-lg shadow-rose-500/20"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        /* Products Grid - Fully Responsive */
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {wishlist.map(item => (
            <div key={item._id} className="w-full flex justify-center">
              <Card 
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                originalPrice={item.originalPrice}
                category={item.category}
              />
            </div>
          ))}
        </div>
      )}

      {/* Bottom padding for mobile */}
      <div className="h-10 sm:h-0"></div>
    </div>
  );
};

export default Wishlist;
