import React from 'react'

const Test = () => {
   const [comment, setComment] = React.useState('')

   return (
      <div>
         <form>
            <input
               type="text"
               value={comment}
               onChange={(e) => setComment(e.target.value)}
            />
            <input type="button" value="Post" />
         </form>
         <ul>{/* comments */}</ul>
      </div>
   )
}

export default Test
