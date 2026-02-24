
import React, { useContext, useEffect, useState } from 'react'
import logo from "../assets/logo.png";
// import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Lottie from 'lottie-react';
import Cart from "../assets/Shopping-cart.json"
import { userDataContext } from '../context/UserContext';
// import { IoSearchCircle } from "react-icons/io5";
import { CiSearch, CiHome } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { linkWithCredential } from 'firebase/auth';
import { toast } from 'sonner';
import { RiHomeLine, RiHomeFill } from "react-icons/ri";


import { HiMenu, HiX } from "react-icons/hi";
import { shopDataContext } from '../context/ShopContext';



const Nav = () => {
  let { getCurrentUser, userData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext)
  let { search, setSearch, showSearch, setShowSearch, getCartCount } = useContext(shopDataContext);

  let [showHome, setShowHome] = useState(false);
  let [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.delete(serverUrl + "/api/auth/logOut", { withCredentials: true })
      console.log(result.data);
      toast.success("Logout successful");
      getCurrentUser();
      navigate("/login");


    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSearch(true);
  };

  const handleSearchBlur = () => {
    if (!search) {
      setIsSearchFocused(false);
      setShowSearch(false);
    }
  };

  const handleSearch = () => {
    if (!search.trim()) return; // ignore empty search
    navigate("/collection");
  };

  return (
    <nav className="w-full bg-white fixed top-0 left-0 z-50 transition-transform duration-100 ease-in-out">
      <div className="w-full  px-4 sm:px-6 lg:px-13">
        <div className="max-w-8xl  mx-auto flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            {/* Desktop logo: always visible */}
            <Link to="/" className="hidden md:block">
              <img
                src={logo}
                alt="Logo"
                className="w-[160px] h-[50px] object-cover cursor-pointer"
              />
            </Link>

            {/* Mobile logo: hide when search is open */}
            {!showSearch && (
              <Link to="/" className="md:hidden">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-[120px] h-[40px] object-cover cursor-pointer"
                />
              </Link>
            )}
          </div>

          {/* RESPONSIVE SEARCH - Unified for all screen sizes */}
          <div className="flex-1 max-w-md mx-4 md:mx-0">
            {/* Mobile Search - Full width when active */}
            {showSearch && (
              <div className="md:hidden">
                <div className="relative">
                  <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                    className="w-full h-12 pl-12 pr-12 rounded-full bg-gray-100 focus:bg-white focus:shadow-md border border-gray-200 focus:border-indigo-500 text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 ease-in-out"
                    placeholder="Search products..."
                  />
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-indigo-500 rounded-full text-white shadow-md hover:bg-indigo-600 transition-all duration-200"
                  >
                    <FaSearch className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Desktop Search - Always visible, fixed width */}
            <div className="hidden md:block relative w-full">
              <CiSearch
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6 cursor-pointer transition-colors duration-200 ${isSearchFocused || search ? "hidden" : "block"
                  }`}
                onClick={handleSearchFocus}
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="w-full h-12 pl-12 pr-12 rounded-full bg-white border border-black text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:shadow-md transition-all duration-300"
                placeholder="Search products..."
              />

              <button
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleSearch}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-7 h-7 flex items-center justify-center bg-indigo-500 rounded-full text-white shadow-md hover:bg-indigo-600 transition-all duration-200 ${isSearchFocused || search ? "opacity-100 scale-110" : "opacity-0 scale-90"
                  }`}
              >
                <FaSearch className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links + Icons - TOGETHER */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
            {/* Nav Links */}
            <div className="space-x-2 lg:space-x-10 mr-2 lg:mr-11 flex-shrink-0">
              <a href="#home">
                <button className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md cursor-pointer" onClick={() => { navigate("/") }}>
                  Home
                </button>
              </a>
              <a href="#collection">
                <button className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md cursor-pointer" onClick={() => { navigate("/collection") }}>
                  Collections
                </button>
              </a>
              <a href="#about">
                <button className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md cursor-pointer" onClick={() => { navigate("/about") }}>
                  About
                </button>
              </a>
              <a href="#contact">
                <button className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] rounded-md cursor-pointer" onClick={() => { navigate("/contact") }}>
                  Contact
                </button>
              </a>
            </div>

            {/* Profile + Cart - AB YAHAN HAIN */}
            <div className="flex items-center gap-4 sm:gap-7 flex-shrink-0">
              {!userData ? (
                <CgProfile className="w-8 h-8 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors" onClick={() => { setShowProfile(!showProfile) }} />
              ) : (
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold cursor-pointer uppercase" onClick={() => { setShowProfile(!showProfile) }}>
                  {userData.name?.charAt(0)}
                </div>
              )}

              <div className='relative w-8 h-8 cursor-pointer flex items-center justify-center' onClick={() => navigate("/cart")}>
                <div className='absolute w-35 h-35 -top-16 -left-13 pointer-events-none cursor-pointer'>
                  <Lottie
                    animationData={Cart}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <p className='absolute w-[18px] h-[18px] items-center justify-center bg-black px-[5px] py-[2px] text-white rounded-full text-[9px] top-[-7px] right-[-14px]'>
                  {getCartCount()}
                </p>
              </div>
            </div>
          </div>


          {/* Mobile Menu Button */}
          <button
            onClick={() => { setShowMobileMenu(!showMobileMenu), setShowSearch(false) }}
            className="md:hidden mt-2 text-2xl text-gray-700 hover:text-red-600 transition-colors z-20"
            aria-label="Toggle menu"
          >
            {showMobileMenu ? (
              <HiX className="w-8 h-8" />
            ) : (
              <HiMenu className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-lg absolute top-[64px] left-0 w-full z-40">
          <div className="flex flex-col py-4 space-y-2 text-center">
            <a
              href="#home"
              className="py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setShowMobileMenu(false);
                navigate("/");
              }}
            >
              Home
            </a>

            <a
              href="#about"
              className="py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setShowMobileMenu(false);
                navigate("/about");
              }}
            >
              About
            </a>

            <a
              href="#collection"
              className="py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setShowMobileMenu(false);
                navigate("/collection");
              }}
            >
              Collections
            </a>

            <a
              href="#contact"
              className="py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setShowMobileMenu(false);
                navigate("/contact");
              }}
            >
              Contact
            </a>
          </div>
        </div>
      )}

    {showProfile && (
  <div className="absolute top-[70px] right-4 w-56 bg-[#1f1f1f] rounded-lg border border-gray-700 shadow-xl z-50 overflow-hidden">
    <div className="py-1.5 text-sm text-gray-200">
      {userData && (
        <div className="px-4 py-3 border-b border-gray-800">
          <p className="font-medium">{userData.name || 'User'}</p>
          <p className="text-xs text-gray-400">{userData.email}</p>
        </div>
      )}

      <ul>
        {!userData ? (
          <li
            className="px-4 py-2.5 hover:bg-gray-800 cursor-pointer"
            onClick={() => {
              setShowProfile(false);
              navigate("/login");
            }}
          >
            Login
          </li>
        ) : (
          <>
            <li
              className="px-4 py-2.5 hover:bg-gray-800 cursor-pointer"
              onClick={() => {
                setShowProfile(false);
                navigate("/order");
              }}
            >
              Orders
            </li>
            <li
              className="px-4 py-2.5 hover:bg-gray-800 cursor-pointer"
              onClick={() => {
                setShowProfile(false);
                navigate("/about");
              }}
            >
              About
            </li>
            <li
              className="px-4 py-2.5 text-red-400 hover:bg-red-900/40 cursor-pointer border-t border-gray-800"
              onClick={() => {
                handleLogout();
                setShowProfile(false);
                navigate("/");
              }}
            >
              Logout
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
)}

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around items-center py-2">
          {/* Home */}
          <button
            onClick={() => {
              navigate("/"), setShowHome(!showHome), setShowSearch(false);
              setShowProfile(false)
            }}
            className="flex flex-col items-center text-gray-600 hover:text-black"
          >
            {!showHome ? <RiHomeLine className="w-6 h-6" /> : <RiHomeFill className="w-6 h-6" />}
            <span className="text-xs">Home</span>
          </button>

          {/* Search */}
          <button
            onClick={() => {
              setShowSearch(!showSearch);
              setShowMobileMenu(false);
              setShowHome(false);
              setShowProfile(false);
            }}
            className="flex flex-col items-center text-gray-600 hover:text-black"
          >
            {showSearch ? <FaSearch className="w-6 h-6" /> : <CiSearch className="w-6 h-6 font-bold" />}
            <span className="text-xs">Search</span>
          </button>

          {/* Cart */}
          <button className="relative flex flex-col items-center text-gray-600 hover:text-black" onClick={() => navigate("/cart")}>
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div className="absolute w-24 h-24 -top-11 -left-9 pointer-events-none">
                <Lottie
                  animationData={Cart}
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
            <span className="absolute -top-2.5 left-3 bg-black text-white text-[10px] px-1 rounded-full">
              {getCartCount()}
            </span>

            <span className="text-xs">Cart</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex flex-col items-center text-gray-600 hover:text-black"
          >
            {!userData ? (
              <CgProfile className="w-6 h-6" />
            ) : (
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs uppercase">
                {userData.name?.charAt(0)}
              </div>
            )}
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
