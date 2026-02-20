import React from 'react'
import f01 from '../assets/f01.jpg'
import f1 from '../assets/f1.jpg'
import f2 from '../assets/f2.jpg'
import f3 from '../assets/f3.jpg'
import f4 from '../assets/f4.jpg'
const Backgroud = ({ heroCount }) => {

  if (heroCount == 0) {
    return <img
      src={f01}
      className="absolute right-6 md:right-20 top-[25%] md:top-4 w-[85%] md:w-[30%] h-[45%] md:h-[88%] object-cover pt-15"
    />


  }
  else if (heroCount == 1) {  
    return <img
      src={f1}
      className="absolute right-6 md:right-20 top-[25%] md:top-4 w-[85%] md:w-[30%] h-[45%] md:h-[88%] object-cover pt-15"
    />

  }
  else if (heroCount == 2) {
    return <img
      src={f2}
      className="absolute right-6 md:right-20 top-[25%] md:top-4 w-[85%] md:w-[30%] h-[45%] md:h-[88%] object-cover pt-15"
    />

  }
  else if (heroCount == 3) {
    return <img
      src={f3}
      className="absolute right-6 md:right-20 top-[25%] md:top-4 w-[85%] md:w-[30%] h-[45%] md:h-[88%] object-cover pt-15" 
    />

  }
  else if (heroCount == 4) {
    return <img
      src={f4}
      className="absolute right-6 md:right-20 top-[25%] md:top-4 w-[85%] md:w-[30%] h-[45%] md:h-[88%] object-cover pt-15"
    />

  }


}

export default Backgroud
