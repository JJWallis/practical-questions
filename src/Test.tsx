import React from 'react'

const Test = () => {
   const [comments, setComments] = React.useState<String[]>([])
   const [comment, setComment] = React.useState('')

   const produceComment = () => {
      if (comment.length) {
         setComments([...comments, comment])
         setComment('')
      }
   }

   return (
      <div>
         <form>
            <input
               type="text"
               value={comment}
               onChange={(e) => setComment(e.target.value)}
            />
            <input type="button" value="Post" onClick={produceComment} />
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
