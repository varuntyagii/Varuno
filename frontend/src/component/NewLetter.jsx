import React, { useState, useContext } from 'react';
import Title from './Title';
import { toast } from 'sonner';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

const NewLetter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    setStatus('');

    try {
      const response = await axios.post(`${serverUrl}/api/newsletter/subscribe`, {
        email: email.toLowerCase().trim()
      });

      if (response.data.success) {
        setStatus('success');
        setEmail('');
        toast.success('Subscribed successfully! 🎉');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Subscription failed';
      
      if (message === 'Already subscribed') {
        setStatus('already');
        toast.info('Already subscribed! 🙌');
      } else {
        setStatus('error');
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full py-16 px-4 flex justify-center">
      <div className="max-w-4xl w-full bg-gray-900/70 border border-gray-700 rounded-2xl p-8 md:p-12 text-center">
        <span className="text-2xl md:text-3xl font-bold text-white block mb-4">
          <Title text1="Subscribe to" text2="our Newsletter" />
        </span>

        <p className="mt-3 text-gray-300 text-sm md:text-base mb-8">
          Get updates, offers, and product launches directly in your inbox.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'success'}
              className="
                w-full sm:w-80 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 
                text-white focus:outline-none focus:border-blue-500
              "
              required
            />
            
            <button 
              type="submit" 
              disabled={status === 'success' || !email || isLoading}
              className="
                px-6 py-3 rounded-lg bg-gray-600 text-white font-semibold 
                hover:bg-gray-700 transition
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </button>
          </div>
        </form>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl animate-pulse">
            <p className="text-green-100 font-medium">
              🎉 Thank you for subscribing!
            </p>
          </div>
        )}

        {status === 'already' && (
          <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-xl">
            <p className="text-yellow-100 font-medium">
              🙌 You're already subscribed!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewLetter;
