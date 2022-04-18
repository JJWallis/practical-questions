import React, { useCallback, useEffect, useRef, useState } from 'react'

const Carousel: React.FC = () => {
   const [images, setImages] = useState<any[]>([])
   const [activeImg, setActiveImg] = useState(0)
   const onMount = useRef(false)
   const timerRef = useRef<null | NodeJS.Timeout>(null)

   const increment = () => {
      if (activeImg < images.length - 1) setActiveImg((prev) => prev + 1)
      resetTimer()
   }

   const decrement = () => {
      if (activeImg > 0) setActiveImg((prev) => prev - 1)
      resetTimer()
   }

   const resetTimer = () => {
      if (timerRef.current) {
         clearInterval(timerRef.current)
         setupTimer()
      }
   }

   const updateImg = useCallback(
      (index: number) => {
         const { data } = images[index]
         const img = data.thumbnail
         return img
      },
      [images]
   )

   const setupTimer = () => {
      const cancelId = setInterval(() => {
         setActiveImg((prev) => prev + 1)
      }, 3000)
      timerRef.current = cancelId
   }

   useEffect(() => {
      if (!onMount.current) {
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

         setupTimer()
         fetchImgs()
      }
      onMount.current = true
   }, [activeImg, updateImg])

   useEffect(() => {
      if (activeImg === images.length) setActiveImg(0)
   }, [images, activeImg])

   return (
      <main>
         <div className="image-ct">
            <img src={images.length && updateImg(activeImg)} alt="" />
            <button className="btn btn-right" onClick={increment}>
               &rarr;
            </button>
            <button className="btn btn-left" onClick={decrement}>
               &larr;
            </button>
         </div>
      </main>
   )
}

export default Carousel
