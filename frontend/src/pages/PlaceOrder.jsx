import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Lottie from 'lottie-react';
import { SiRazorpay, SiStripe } from 'react-icons/si';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import arrowAnimation from '../assets/arrow right.json';
import axios from 'axios';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee, product, currency, discount } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [method, setMethod] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.street.trim()) newErrors.street = 'Required';
    if (!formData.city.trim()) newErrors.city = 'Required';
    if (!formData.state.trim()) newErrors.state = 'Required';
    if (!formData.zipcode.trim()) newErrors.zipcode = 'Required';
    if (!formData.country.trim()) newErrors.country = 'Required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    else if (!/^[0-9+\-\s()]{8,15}$/.test(formData.phone)) newErrors.phone = 'Invalid phone';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const prepareOrderItems = () => {
    const items = [];
    for (const id in cartItem) {
      for (const size in cartItem[id]) {
        if (cartItem[id][size] > 0) {
          const itemInfo = structuredClone(product.find((p) => p._id === id));
          if (itemInfo) {
            itemInfo.size = size;
            itemInfo.quantity = cartItem[id][size];
            items.push(itemInfo);
          }
        }
      }
    }
    return items;
  };

  const calculateTotals = () => {
    const subtotalRaw = getCartAmount?.() ?? 0;
    const subtotal = Math.max(0, subtotalRaw);
    const isEmpty = subtotal === 0;

    const discountAmount = isEmpty ? 0 : (subtotal * discount) / 100;
    const afterDiscount = isEmpty ? 0 : Math.max(0, subtotal - discountAmount);

    const shippingFee = isEmpty ? 0 : subtotal >= 500 ? 0 : delivery_fee;

    const gstTax = isEmpty ? 0 : ((afterDiscount + shippingFee) * 18) / 100;
    const total = isEmpty ? 0 : afterDiscount + shippingFee + gstTax;

    return { subtotal, discountAmount, shippingFee, gstTax, total, isEmpty };
  };

  const { subtotal, discountAmount, shippingFee, gstTax, total, isEmpty } = calculateTotals();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }
    if (!method) {
      toast.error('Please select payment method');
      return;
    }
    if (isEmpty) {
      toast.error('Cart is empty');
      return;
    }

    setLoading(true);

    const orderItems = prepareOrderItems();
    const orderData = {
      address: formData,
      items: orderItems,
      amount: total,
      paymentMethod: method,
    };

    try {
      switch (method) {
        case 'cod': {
          const res = await axios.post(`${serverUrl}/api/order/placeorder`, orderData, { withCredentials: true });
          if (res.data?.success) {
            setCartItem({});
            localStorage.removeItem('cartData');
            toast.success('Order placed!');
            navigate('/order');
          }
          break;
        }
        case 'razorpay': {
          const res = await axios.post(`${serverUrl}/api/order/razorpay`, orderData, { withCredentials: true });
          if (res.data?.success) initPay(res.data.order);
          break;
        }
        case 'stripe': {
          const res = await axios.post(`${serverUrl}/api/order/create-checkout-session`, orderData, { withCredentials: true });
          if (res.data?.success && res.data?.url) {
            setCartItem({});
            localStorage.removeItem('cartData');
            window.location.href = res.data.url;
          } else {
            toast.error('Stripe session failed');
          }
          break;
        }
        default:
          toast.error('Invalid payment method');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to place order';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Your Store',
      description: 'Order Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const verifyRes = await axios.post(`${serverUrl}/api/order/verifyrazorpay`, response, { withCredentials: true });
          if (verifyRes.data?.success) {
            setCartItem({});
            localStorage.removeItem('cartData');
            toast.success('Payment successful!');
            navigate('/order');
          }
        } catch (err) {
          toast.error('Payment verification failed');
        }
      },
      theme: { color: '#3b82f6' },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 py-8 px-4 sm:px-6 mt-15">
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 3500 }} />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left - Delivery Form */}
        <div className="lg:w-3/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Title text1="DELIVERY" text2="INFO" size="lg" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-gray-800/70 border ${errors.firstName ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm`}
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-gray-800/70 border ${errors.lastName ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm`}
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {[
              { name: 'email', type: 'email', placeholder: 'Email address' },
              { name: 'street', placeholder: 'Street address' },
              { name: 'city', placeholder: 'City' },
              { name: 'state', placeholder: 'State' },
              { name: 'zipcode', placeholder: 'Zip code' },
              { name: 'country', placeholder: 'Country' },
              { name: 'phone', type: 'tel', placeholder: 'Phone number' },
            ].map((field) => (
              <div key={field.name}>
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-gray-800/70 border ${errors[field.name] ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm`}
                />
                {errors[field.name] && <p className="text-red-400 text-xs mt-1">{errors[field.name]}</p>}
              </div>
            ))}

            <div className="hidden lg:block mt-2">
              <Lottie animationData={arrowAnimation} loop className="w-32 h-32 ml-auto opacity-60 -mt-12" />
            </div>
          </form>
        </div>

        {/* Right - Summary + Payment */}
        <div className="lg:w-2/5 space-y-6">
          {/* Order Summary */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-lg mt-5">
            <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>

            {isEmpty ? (
              <div className="py-6 text-center">
                <p className="text-lg font-medium text-gray-300">Cart is empty</p>
                <p className="mt-2 text-gray-400 text-sm">Add items to continue</p>
              </div>
            ) : (
              <div className="space-y-2.5 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{currency}{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount ({discount}%)</span>
                    <span>-{currency}{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? <span className="text-green-400">FREE</span> : `${currency}${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>{currency}{gstTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-white font-bold pt-3 border-t border-gray-700/60 text-base">
                  <span>Total</span>
                  <span>{currency}{total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-3">Payment Method</h2>
            <p className="text-gray-400 text-xs mb-4">Select your preferred payment option</p>

            <div className="space-y-3">
              {[
                { id: 'cod', label: 'Cash on Delivery', icon: '💵', color: 'green' },
                { id: 'razorpay', label: 'Razorpay', icon: <SiRazorpay className="text-blue-400 text-2xl" />, color: 'blue' },
                { id: 'stripe', label: 'Stripe', icon: <SiStripe className="text-purple-500 text-2xl" />, color: 'purple' },
              ].map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setMethod(opt.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-lg border-2 cursor-pointer transition-all ${
                    method === opt.id
                      ? `border-${opt.color}-500 bg-gray-800/50`
                      : 'border-gray-700 hover:border-gray-500 bg-gray-800/30'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      method === opt.id ? `border-${opt.color}-500 bg-${opt.color}-600/20` : 'border-gray-500'
                    }`}
                  >
                    {method === opt.id && <div className={`w-3 h-3 rounded-full bg-${opt.color}-500`} />}
                  </div>
                  <div className="flex items-center gap-2.5">
                    {opt.icon}
                    <span className="text-white text-sm font-medium">{opt.label}</span>
                  </div>
                </div>
              ))}
            </div>

        <button
  type="submit"
  onClick={handleSubmit}
  disabled={loading || !method || isEmpty}
  className={`w-full mt-5 py-3 px-5 rounded-lg font-medium text-base transition-all ${
    loading || !method || isEmpty
      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
      : 'bg-white text-gray-900 hover:bg-gray-100 active:bg-gray-200'
  }`}
>
  {loading
    ? 'Processing...'
    : isEmpty
    ? 'Cart empty'
    : !method
    ? 'Select payment'
    : 'PLACE ORDER'}
</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PlaceOrder;