import React, { useState } from 'react'

const Carousel: React.FC = () => {
   const [images, setImages] = useState([])

   const fetchImgs = async () => {
      try {
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <main>
         <div className="image-ct">
            {/* <img src="" alt="" /> */}
            <button className="btn btn-right">&rarr;</button>
            <button className="btn btn-left">&larr;</button>
         </div>
      </main>
   )
}

export default Carousel
