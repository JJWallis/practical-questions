import React, { useEffect, useState } from 'react'

const Carousel: React.FC = () => {
   const [images, setImages] = useState<any[]>([])
   const [activeImg, setActiveImg] = useState(0)

   const updateImg = (index: number) => {
      const data = images[index].data
      console.log(data)
   }

   const increment = () => setActiveImg((prev) => prev + 1)

   const decrement = () => setActiveImg((prev) => prev - 1)

   useEffect(() => {
      const fetchImgs = async () => {
         try {
            const res = await fetch(
               'https://www.reddit.com/r/aww/top/.json?t=all'
            )
            const { data } = await res.json()
            setImages(data.children)
         } catch (error) {
            console.error(error)
         }
      }

      fetchImgs()
   }, [])

   useEffect(() => console.log(images))

   return (
      <main>
         <div className="image-ct">
            {/* <img src="" alt="" /> */}
            <button
               className="btn btn-right"
               onClick={() => activeImg < images.length && increment()}
            >
               &rarr;
            </button>
            <button
               className="btn btn-left"
               onClick={() => activeImg > 0 && decrement()}
            >
               &larr;
            </button>
         </div>
      </main>
   )
}

export default Carousel
