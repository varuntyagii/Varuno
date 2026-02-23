// // import React, { useContext } from 'react'
// // import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
// // import Registration from './pages/Registration'
// // import Home from './pages/Home'
// // import Login from './pages/Login'
// // import Nav from './component/Nav'
// // import { Toaster } from "sonner";
// // import { userDataContext } from './context/UserContext'
// // import Gsap from './pages/gsap'
// // import About from './pages/About'
// // import Collection from './pages/Collection'
// // import Contact from './pages/Contact'
// // import Product from './pages/Product'
// // import ProductDetails from './pages/ProductDetails'
// // import Cart from "./pages/Cart"
// // import PlaceOrder from './pages/PlaceOrder'
// // import Order from './pages/Order'
// // import NoteFound from './pages/NoteFound'
// // import Ai from './component/Ai'
// // const App = () => {
// //   const { userData } = useContext(userDataContext);
// //   const location = useLocation(); 

// //   return (
// //     <>
// //       <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800">


// //         {userData && <Nav />}
// //         <Toaster position="top-right" 
// //         autoClose={2000} // closes after 2 seconds
// //         hideProgressBar={false} 
// //         newestOnTop={false} 
// //         closeOnClick 
// //         rtl={false} 
// //         pauseOnFocusLoss 
// //         draggable 
// //         pauseOnHover />

// //         <Routes>
// //           {/* Public Routes */}
// //           <Route 
// //             path='/login' 
// //             element={!userData ? <Login /> : <Navigate to={location.state?.from || "/"} replace />} 
// //           />
// //           <Route 
// //             path='/signup' 
// //             element={!userData ? <Registration /> : <Navigate to={location.state?.from || "/"} replace />} 
// //           />

// //           {/* Protected Routes */}
// //           <Route 
// //             path='/' 
// //             element={userData ? <Home /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} 
// //           />
// //           <Route 
// //             path='/about' 
// //             element={userData ? <About /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} 
// //           />
// //           <Route 
// //             path='/collection' 
// //             element={userData ? <Collection /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} 
// //           />
// //           <Route 
// //             path='/contact' 
// //             element={userData ? <Contact /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} 
// //           />
// //          <Route 
// //             path="/productDetails/:productId" 
// //             element={
// //               userData ? <ProductDetails /> : 
// //               <Navigate to="/login" state={{ from: location.pathname }} replace />
// //             } 
// //           />

// //             <Route 
// //             path="/cart" 
// //             element={
// //               userData ? <Cart/> : 
// //               <Navigate to="/login" state={{ from: location.pathname }} replace />
// //             } 
// //           />
// //             <Route 
// //             path="/placeorder" 
// //             element={
// //               userData ? <PlaceOrder/> : 
// //               <Navigate to="/login" state={{ from: location.pathname }} replace />
// //             } 
// //           />
// //             <Route 
// //             path="/order" 
// //             element={
// //               userData ? <Order/> : 
// //               <Navigate to="/login" state={{ from: location.pathname }} replace />
// //             } 
// //           />

// //           <Route 
// //             path='/product' 
// //             element={userData ? <Product /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} 
// //           />
// //           <Route path='*' element={<NoteFound/>}/>

// //         </Routes>
// //         <Ai/>

// //       </div>
// //     </>
// //   )
// // }

// // export default App


// // import React, { useContext } from 'react'
// // import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
// // import { ReactLenis } from 'lenis/dist/lenis-react'
// // import Registration from './pages/Registration'
// // import Home from './pages/Home'
// // import Login from './pages/Login'
// // import Nav from './component/Nav'
// // import { Toaster } from "sonner";
// // import { userDataContext } from './context/UserContext'
// // import Gsap from './pages/gsap'
// // import About from './pages/About'
// // import Collection from './pages/Collection'
// // import Contact from './pages/Contact'
// // import Product from './pages/Product'
// // import ProductDetails from './pages/ProductDetails'
// // import Cart from "./pages/Cart"
// // import PlaceOrder from './pages/PlaceOrder'
// // import Order from './pages/Order'
// // import NoteFound from './pages/NoteFound'
// // import Ai from './component/Ai'
// // import LinkedInSuccess from './pages/LinkedInSuccess'
// // import Success from './pages/Success'
// // import Cancel from './pages/Cancel'

// // const App = () => {
// //   const { userData, loading } = useContext(userDataContext);
// //   const location = useLocation();

// //   if (loading) {
// //     return null; // or a loading spinner
// //   }

// //   return (
// //     <ReactLenis
// //       root
// //       options={{
// //         lerp: 0.1, // smoothness, lower is slower
// //         smoothWheel: true,
// //         smoothTouch: true
// //       }}
// //     >
// //       <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800">

// //         {userData && <Nav />}

// //         <Toaster
// //           position="top-right"
// //           richColors
// //           closeButton
// //           expand
// //           duration={3000}
// //           visibleToasts={3}
// //           toastOptions={{
// //             style: {
// //               background: "#1f2937",
// //               color: "#fff",
// //               border: "1px solid #374151",
// //             },
// //           }}
// //         />


// //         <Routes>
// //           {/* Public Routes */}
// //           <Route path='/login' element={!userData ? <Login /> : <Navigate to={location.state?.from || "/"} replace />} />
// //           <Route path='/signup' element={!userData ? <Registration /> : <Navigate to={location.state?.from || "/"} replace />} />

// //           {/* Protected Routes */}
// //           <Route path='/' element={userData ? <Home /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} />
// //           <Route path='/about' element={userData ? <About /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} />
// //           <Route path='/collection' element={userData ? <Collection /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} />
// //           <Route path='/contact' element={userData ? <Contact /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} />
// //           <Route path="/productDetails/:productId" element={userData ? <ProductDetails /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} />
// //           <Route path="/cart" element={userData ? <Cart /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} />
// //           <Route path="/placeorder" element={userData ? <PlaceOrder /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} />
// //           <Route path="/order" element={userData ? <Order /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} />
// //           <Route path='/product' element={userData ? <Product /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} />
// //           {/* <Route path='/linkedin/success' element={userData ? <LinkedInSuccess /> : <Navigate to="/login" state={{ from: location.pathname }} replace />} /> */}
// //           <Route path='*' element={<NoteFound />} />
// //           <Route path="/linkedin/success" element={<LinkedInSuccess />} />
// //           <Route path='/success' element={<Success/>} />
// //           <Route path='/cancel' element={<Cancel/>} />

// //         </Routes>
// //         {userData && <Ai />}




// //       </div>
// //     </ReactLenis>
// //   )
// // }

// // export default App

// import React, { useContext } from 'react';
// import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
// import { userDataContext } from './context/UserContext';
// import { Toaster } from "sonner";
// import Nav from './component/Nav';
// import Ai from './component/Ai';

// import Registration from './pages/Registration';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import About from './pages/About';
// import Collection from './pages/Collection';
// import Contact from './pages/Contact';
// import Product from './pages/Product';
// import ProductDetails from './pages/ProductDetails';
// import Cart from './pages/Cart';
// import PlaceOrder from './pages/PlaceOrder';
// import Order from './pages/Order';
// import NoteFound from './pages/NoteFound';
// import VerifyEmail from './pages/VerifyEmail';
// import ForgotPassword from './pages/ForgotPassword';
// import LinkedInSuccess from './pages/LinkedInSuccess';
// // import DiscordSuccess from './pages/DiscordSuccess';
// import Success from './pages/Success';
// import Cancel from './pages/Cancel';
// import { ReactLenis } from 'lenis/react';
// import FAQPage from './pages/FAQPage';

// const App = () => {
//   const { userData, loading } = useContext(userDataContext);
//   const location = useLocation();

//   if (loading) return null;

//   return (
//     <ReactLenis
//       root
//       options={{
//         lerp: 0.1, // smoothness, lower is slower
//         smoothWheel: true,
//         smoothTouch: true
//       }}
//     >
//       <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800">

//         {userData && userData.isVerified && <Nav />}

//         <Toaster
//           position="top-right"
//           richColors
//           closeButton
//           expand
//           duration={3000}
//           visibleToasts={3}
//           toastOptions={{
//             style: {
//               background: "#1f2937",
//               color: "#fff",
//               border: "1px solid #374151",
//             },
//           }}
//         />


//         <Routes>

//           {/* ================= PUBLIC ROUTES ================= */}
//           <Route
//             path="/login"
//             element={!userData ? <Login /> : userData.isVerified ? <Navigate to="/" replace /> : <Navigate to="/verifemail" replace />}
//           />
//           <Route
//             path="/signup"
//             element={!userData ? <Registration /> : userData.isVerified ? <Navigate to="/" replace /> : <Navigate to="/verifemail" replace />}
//           />
//           <Route
//             path="/forgot-password"
//             element={!userData ? <ForgotPassword /> : <Navigate to="/" replace />}
//           />

//           {/* ================= EMAIL VERIFICATION ================= */}
//           <Route
//             path="/verifemail"
//             element={
//               !userData
//                 ? <Navigate to="/signup" replace />
//                 : !userData.isVerified
//                   ? <VerifyEmail />
//                   : <Navigate to="/" replace />
//             }
//           />

//           {/* ================= PROTECTED + VERIFIED ROUTES ================= */}
//           <Route
//             path="/"
//             element={userData && userData.isVerified ? <Home /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
//           />
//           <Route
//             path="/about"
//             element={userData && userData.isVerified ? <About /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
//           />
//           <Route
//             path="/collection"
//             element={userData && userData.isVerified ? <Collection /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
//           />
//           <Route
//             path="/contact"
//             element={userData && userData.isVerified ? <Contact /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
//           />
//           <Route
//             path="/product"
//             element={userData && userData.isVerified ? <Product /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
//           />
//           <Route
//             path="/productDetails/:productId"
//             element={userData && userData.isVerified ? <ProductDetails /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
//           />
//           <Route
//             path="/cart"
//             element={userData && userData.isVerified ? <Cart /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
//           />
//           <Route
//             path="/placeorder"
//             element={userData && userData.isVerified ? <PlaceOrder /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
//           />
//           <Route
//             path="/order"
//             element={userData && userData.isVerified ? <Order /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
//           />
//           <Route
//             path="/faq"
//             element={userData && userData.isVerified ? <FAQPage /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
//           />

//           {/* ================= OTHER ROUTES ================= */}
//           <Route path="/linkedin/success" element={userData && userData.isVerified ? <LinkedInSuccess /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />} />
//           {/* Discord success is PUBLIC — Supabase redirects here before our session is set */}
//           {/* <Route path="/discord/success" element={<DiscordSuccess />} /> */}
//           <Route path="/success" element={userData && userData.isVerified ? <Success /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />} />
//           <Route path="/cancel" element={userData && userData.isVerified ? <Cancel /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />} />

//           {/* Catch all */}
//           <Route
//             path="*"
//             element={
//               userData
//                 ? userData.isVerified
//                   ? <NoteFound />            // verified users see 404 page
//                   : <Navigate to="/verifemail" replace /> // unverified users stay on verify
//                 : <Navigate to="/signup" replace />       // not logged in -> signup
//             }
//           />

//         </Routes>
//         {userData && userData.isVerified && <Ai />}




//       </div>
//     </ReactLenis>
//   )
// }

// export default App;

import React, { useContext } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { userDataContext } from './context/UserContext';
import { Toaster } from "sonner";
import Nav from './component/Nav';
import Ai from './component/Ai';

import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import NoteFound from './pages/NoteFound';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import LinkedInSuccess from './pages/LinkedInSuccess';
// import DiscordSuccess from './pages/DiscordSuccess';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import { ReactLenis } from 'lenis/react';
import FAQPage from './pages/FAQPage';

const App = () => {
  const { userData, loading } = useContext(userDataContext);
  const location = useLocation();

  if (loading) return null;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // smoothness, lower is slower
        smoothWheel: true,
        smoothTouch: true
      }}
    >
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800">

        {userData && userData.isVerified && <Nav />}

        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
          duration={3000}
          visibleToasts={3}
          toastOptions={{
            style: {
              background: "#1f2937",
              color: "#fff",
              border: "1px solid #374151",
            },
          }}
        />


        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route
            path="/login"
            element={!userData ? <Login /> : userData.isVerified ? <Navigate to="/" replace /> : <Navigate to="/verifemail" replace />}
          />
          <Route
            path="/signup"
            element={!userData ? <Registration /> : userData.isVerified ? <Navigate to="/" replace /> : <Navigate to="/verifemail" replace />}
          />
          <Route
            path="/forgot-password"
            element={!userData ? <ForgotPassword /> : <Navigate to="/" replace />}
          />

          {/* ================= EMAIL VERIFICATION ================= */}
          <Route
            path="/verifemail"
            element={
              !userData
                ? <Navigate to="/signup" replace />
                : !userData.isVerified
                  ? <VerifyEmail />
                  : <Navigate to="/" replace />
            }
          />

          {/* ================= PROTECTED + VERIFIED ROUTES ================= */}
          <Route
            path="/"
            element={userData && userData.isVerified ? <Home /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
          />
          <Route
            path="/about"
            element={userData && userData.isVerified ? <About /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
          />
          <Route
            path="/collection"
            element={userData && userData.isVerified ? <Collection /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
          />
          <Route
            path="/contact"
            element={userData && userData.isVerified ? <Contact /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
          />
          <Route
            path="/product"
            element={userData && userData.isVerified ? <Product /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
          />
          <Route
            path="/productDetails/:productId"
            element={userData && userData.isVerified ? <ProductDetails /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
          />
          <Route
            path="/cart"
            element={userData && userData.isVerified ? <Cart /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
          />
          <Route
            path="/placeorder"
            element={userData && userData.isVerified ? <PlaceOrder /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
          />
          <Route
            path="/order"
            element={userData && userData.isVerified ? <Order /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
          />
          <Route
            path="/faq"
            element={userData && userData.isVerified ? <FAQPage /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />}
          />

          {/* ================= OTHER ROUTES ================= */}
          <Route path="/linkedin/success" element={userData && userData.isVerified ? <LinkedInSuccess /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />} />
          {/* Discord success is PUBLIC — Supabase redirects here before our session is set */}
          {/* <Route path="/discord/success" element={<DiscordSuccess />} /> */}
          <Route path="/success" element={userData && userData.isVerified ? <Success /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />} />
          <Route path="/cancel" element={userData && userData.isVerified ? <Cancel /> : <Navigate to={!userData ? "/login" : "/verifemail"} replace />} />

          {/* Catch all */}
          <Route
            path="*"
            element={
              userData
                ? userData.isVerified
                  ? <NoteFound />            // verified users see 404 page
                  : <Navigate to="/verifemail" replace /> // unverified users stay on verify
                : <Navigate to="/signup" replace />       // not logged in -> signup
            }
          />

        </Routes>
        {userData && userData.isVerified && <Ai />}




      </div>
    </ReactLenis>
  )
}

export default App;
