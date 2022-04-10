import React from 'react'

function Greeter(props: any) {
   return <div>Hello {/* Write your code here */}</div>
}

class Test extends React.Component {
   render() {
      return <Greeter user="Admin" />
   }
}

export default Test
