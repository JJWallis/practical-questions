import React from 'react'

const Test = () => {
   const [comments, setComments] = React.useState<string[]>([])
   const [comment, setComment] = React.useState('')

   return (
      <div>
         <form>
            <input
               type="text"
               value={comment}
               onChange={(e) => setComment(e.target.value)}
            />
            <input
               type="button"
               value="Post"
               onClick={() =>
                  comment.length && setComments([...comments, comment])
               }
            />
         </form>
         <ul>
            {comments.map((comment, idx) => (
               <li key={idx}>{comment}</li>
            ))}
         </ul>
      </div>
   )
}

export default Test
