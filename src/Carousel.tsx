import React, { useCallback, useEffect, useRef, useState } from 'react'
import { v4 as uuid } from 'uuid'

const Carousel: React.FC = () => {
   const [images, setImages] = useState<any[]>([])
   const [activeImg, setActiveImg] = useState(0)
   const onMount = useRef(false)
   const timerRef = useRef<null | NodeJS.Timeout>(null)
   const lastImg = images.length - 1

   const increment = () => {
      if (activeImg < lastImg) setActiveImg((prev) => prev + 1)
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

   const produceCircles = (images: any[]) => {
      return images.map((_, idx) => (
         <button
            key={uuid()}
            style={{
               backgroundColor: `${activeImg === idx ? 'black' : 'white'}`,
            }}
            className="carousel-circle"
            aria-label="change active image"
            onClick={() => {
               setActiveImg(idx)
               resetTimer()
            }}
         ></button>
      ))
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
      if (activeImg === lastImg) setActiveImg(0)
   }, [images, activeImg, lastImg])

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
            <div>{produceCircles(images)}</div>
         </div>
      </main>
   )
}

export default Carousel
