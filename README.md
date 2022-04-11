# Practical Coding Interview Questions

This repo contains all my attempts at practical coding problems that are usually best tackled using React

All the challenges are being sourced from [Frontendeval](https://frontendeval.com/) which is an amazing resource I discovered while browsing the Frontend subreddit

## Challenges

### Analogue Clock

[Task](https://frontendeval.com/questions/analog-clock)

This challenge required me to build an analogue clock which consisted of building the working hands for the hours, minutes and seconds inside a circular clock face. I wrote a function that would retrieve a new instance of the date object and placed the relevant properties inside an object into local state. I then created a timer with `setInterval()` that would run every second inside a `useEffect()` hook. Passing the stateful variables down to the JSX beneath allowed me to create a new hand for each using a blank div. Each hand was positioned absolute to the relatively positioned clock face with a `right: 50%` position offset to keep it centered.

I further applied a `transform-origin: center` to ensure they rotated from the centre point. To rotate each hand by the correct degree and angle, I divided the amount of hours by 12 and minutes/seconds by 60 and multiplied the returned value by 360, the total number of degrees in a circle. To add each hour number around the face I had to create each multiple new lines where the numbers would be positioned at either end, with two centrally facing 90 degree alongside four more facing at 30, 60, 120 and 150 degrees accordingly.

```jsx
const grabTime = () => {
   const currDate = new Date()
   const seconds = currDate.getSeconds()
   const minutes = currDate.getMinutes()
   const hours = currDate.getHours()
   return { seconds, minutes, hours }
}

const produceHours = () => {
   const hours = []
   for (let i = 1; i <= 12; i++)
      hours.push(
         <span
            style={{
               transform: `translate(${(i / 12) * 360}px, ${(i / 12) * 360}px)`,
            }}
            className="hour"
            aria-label={`${i} hour`}
         >
            {i}
         </span>
      )
   return hours.reverse()
}
```

### Multi-step Form

[Task](https://frontendeval.com/questions/multi-step-form)

For this challenge I was tasked with coding out a multi-step form that was handled on the same page, meaning I had to conditionally render the type of input, label and buttons allowing users to navigate forwards or backwards through the submission process. The most difficult aspect of this challenge was storing the data in state and preserving that data between each render so that the correct value would match with the current input being rendered. I achieved this by organising my state inside an array of objects and selected the desired value prop in each object with a separate number state variable. This number would increment and decrement between 0 and the arrays length to keep the user's input in sync with the correct object of data.

On reflection, I now realise it would have been cleaner to store this number inside the form state itself after all objects to achieve a more minimal representation of state. The back button was also rendered based on whether the current active input number was greater than zero, and the next button would become a submit button when the number reached one less than the length of the form state array (the last index position).

```jsx
const initialState = [
   { name: 'name', value: '' },
   { name: 'email', value: '' },
   { name: 'date', value: '' },
   { name: 'password', value: '' },
]

return (
   <>
      <button hidden={!current} onClick={() => setCurrent((prev) => prev - 1)}>
         &larr; Back
      </button>
      ...
   </>
)
```

### Shopping List

[Task](https://frontendeval.com/questions/shopping-list)

This was a classic challenge which used all the useful logic that I learnt when writing my first todo list app in React. The shopping list was essentially a todo list allowing users to add items, check them off and remove them at will. I chose to model each shopping list item as an object inside a parent array in state, using a reducer to type out all possible actions and to update state in a declarative whilst strict manner. The search input was also debounced to make an API request when the user had stopped typing instead of every key stroke which would be horrendous for long-term performance. This was my first time implementing a debounce function which acts a higher order function to return a new one that calls our targeted function only when the timer it sets up finishes, yet every time that function gets called it will reset the timer again.

Finally, I utilised the `filter()` method to return an array of matched properties based on the user's input which would be displayed as full-width buttons to (increasing mobile touch targets) in a separate ordered list underneath the search field itself. In order to allow users to focus between each option using the arrow keys, I had to create a new `map()` stored on a ref and invoke it inside the render method to dynamically assign a new ref to each option which could then be individually focused.

### Modal Overlay

[Task](https://frontendeval.com/questions/modal-overlay)

The purpose of this challenge was to create a dismissible modal overlay where the UI would initially show a 'Show offer' button which, when clicked, would display the modal window alongside a transparent grey overlay in the background. I chose to conditionally render the modal window as a component based on when the 'Show offer' button was clicked since the next the part of this challenge required me to have multiple offers/modals available at the same time. As a result, rendering the same modal component and passing the offer through via props allowed me to populate the window with dynamic data instead of having to render two separate modal windows.

The offers were being stored in state as an object and would be conditionally reset based on whether the user would click the close button. Finally, I implemented a `clickOutside()` function invoked in a `useEffect()` that would setup a native click event on the document to check if where the user had clicked was a descandant element of the modal window itself. This comparison was made by storing the modal's referential identity on a `useRef()` hook.

### Data Fetching and Visualization

[Task](https://frontendeval.com/questions/data-fetching)

This challenge involved retrieving a list of numbers from an endpoint and then ploting those as a histogram showing the frequency of each number in the list. I first removed all duplicates from the returned array and sorted them in order to produce the column numbers underneath each bar on the graph. I used `display: grid` on both the graph and row container underneath to match the column numbers and their widths. The row container was `position: absolute` and relative to the graph itself with a `width: 100%` to scale in relation to the graph's size.

I wrote a nested loop over the sorted 'column' array and original data to check how many times each number was found, ultimately returning the length of each `filter()` array. In order to determine the percentage height for each column I calculated the current value divided by the total number of columns multipled by 100. ` style={{ height: ${Math.floor((amount / max) * 100)}%}}`.

###

### Useful resources

-  [Analogue Clock](https://dev.to/code_mystery/simple-analog-clock-using-html-css-javascript-2c6a) = This resource helped me with the mathematical formula needed to determine the degree by which each hand should correctly rotate.

## Author

-  Website - [Joshua Jameson-Wallis](https://www.joshuajamesonwallis.com/)
-  Linkedin - [Joshua Jameson-Wallis](https://www.linkedin.com/in/joshua-jameson-wallis/)
