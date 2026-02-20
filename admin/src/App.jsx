import React, { useContext } from 'react'
import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Login from './pages/Login'
import Orders from './pages/Orders'
import { Route, Routes } from 'react-router-dom'
import { adminDataContext } from './context/AdminContext'
import { Toaster } from "sonner";
import Settings from './pages/Settings'
import Pricing from './component/Pricing'
import { Features } from './component/Features'
import Docs from './component/Docs'
import { VanishList } from './pages/VanishList'
import NoteFound from './pages/NoteFound'
import { ReactLenis } from 'lenis/react';

const App = () => {
  let {adminData} = useContext(adminDataContext);
  return (
    <>  
    <ReactLenis
      root
      options={{
        lerp: 0.1, // smoothness, lower is slower
        smoothWheel: true,
        smoothTouch: true
      }}
    >
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

        {!adminData ? <Login/>:<>
         <Routes>
          
          <Route path='/' element={ <Home/> }/>
          <Route path='/add' element={ <Add/> }/>
          <Route path='/Lists' element={ <Lists/> }/>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/Orders' element={ <Orders/> }/>
          <Route path='/Settings' element={ <Settings/> }/>
          <Route path='/Pricing' element={ <Pricing/> }/>
          <Route path='/Docs' element={ <Docs/> }/>
          <Route path='/vanish' element={ <VanishList/> }/>

          <Route path='/Features' element={ <Features/> }/>
          <Route path='*' element={ <NoteFound/> }/>
          
        </Routes>
         </>
        }
        </ReactLenis>
    </>
  )
}

export default App
