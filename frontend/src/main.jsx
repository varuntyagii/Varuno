import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContext from './context/AuthContext.jsx'
import UserContext from './context/UserContext.jsx'
import ShopContext from './context/ShopContext'

createRoot(document.getElementById('root')).render(

  //  <BrowserRouter>
  //    <App />
  //  </BrowserRouter>

  // <StrictMode>
  <BrowserRouter>
    <AuthContext>
      <UserContext>
       <ShopContext>
         <App />
       </ShopContext>
      </UserContext>
    </AuthContext>
  </BrowserRouter>
  // </StrictMode>

)

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { lazy, Suspense } from "react";

// const Home = lazy(() => import("./pages/Home"));
// const Product = lazy(() => import("./pages/Product"));

// function App() {
//   return (
//     <BrowserRouter>
//       <Suspense fallback={<h2>Loading page...</h2>}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/product" element={<Product />} />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// }
