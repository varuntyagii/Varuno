import { useContext } from "react";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";

const Wishlist = () => {
  const { wishlist } = useContext(shopDataContext);

  return (
    <div className="min-h-screen px-6 py-10 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Liked Items</h1>
        <span className="bg-rose-100 text-rose-500 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {wishlist.length}
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <svg className="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p className="text-gray-400 text-lg">No liked items yet</p>
          <p className="text-gray-300 text-sm">Kisi bhi product pe heart karo!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(item => (
            <Card key={item._id} 
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
              originalPrice={item.originalPrice}
              category={item.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
