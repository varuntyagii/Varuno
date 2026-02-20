import React from 'react';
import Lottie from 'lottie-react';
import Error404 from '../assets/404_error'
import { useNavigate } from 'react-router-dom';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';

const NoteFound = () => {
    let navigate  = useNavigate()
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#020617] via-[#0b122b] to-[#020617] flex flex-col justify-center items-center gap-6 overflow-hidden">
  <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[200px]" />
  <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[200px]" />

        <Nav/>
        <Sidebar/>
  <Lottie
    animationData={Error404}
    loop
    className="w-full max-w-[900px] sm:max-w-[400px] md:max-w-[700px]"
  />

  <button
    onClick={()=>navigate('/login')} // redirect to home
    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
  >
    Back Home
  </button>
</div>



  );
};

export default NoteFound;
