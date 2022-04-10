import React from 'react'

const Carousel: React.FC = () => {
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
