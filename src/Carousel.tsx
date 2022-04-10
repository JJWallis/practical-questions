import React, { useEffect, useState } from 'react'

const Carousel: React.FC = () => {
   const [images, setImages] = useState([])

   const fetchImgs = async () => {
      try {
         const res = await fetch('https://www.reddit.com/r/aww/top/.json?t=all')
         const { data } = await res.json()
         setImages(data.children)
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      fetchImgs()
   }, [])

   useEffect(() => console.log(images))

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
