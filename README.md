# Practical Coding Interview Questions

This repo contains all my attempts at practical coding problems that are usually best tackled using React

All the challenges are being sourced from [Frontendeval](https://frontendeval.com/) which is an amazing resource I discovered while browsing the Frontend subreddit

## Challenges

### Analogue Clock

This challenge required me to build an analogue clock which consisted of building the working hands for the hours, minutes and seconds inside a circular clock face. I wrote a function that would retrieve a new instance of the date object and placed the relevant properties inside an object into local state. I then created a timer with `setInterval()` that would run every second inside a `useEffect()` hook. Passing the stateful variables down to the JSX beneath allowed me to create a new hand for each using a blank div. Each hand was positioned absolute to the relatively positioned clock face with a `right: 50%` position offset to keep it centered. I further applied a `transform-origin: center` to ensure they rotated from the centre point. To rotate each hand by the correct degree and angle, I divided the amount of hours by 12 and minutes/seconds by 60 and multiplied the returned value by 360, the total number of degrees in a circle. To add each hour number around the face I had to create each multiple new lines where the numbers would be positioned at either end, with two centrally facing 90 degree alongside four more facing at 30, 60, 120 and 150 degrees accordingly.

[Link](https://frontendeval.com/questions/analog-clock)

### Analogue Clock

Multi-step Form = For this challenge I was tasked with coding out multi step form that was on the same page and conditionally rendered the type of input, label as well as buttons to navigate to and from certain pages. The most difficult aspect of this challenge was storing the data in state and preserving that data between each render so that the correct value would match the current input. I achieved this by organising my state inside an array of objects and selected the desired value prop in each object with another number state that would increment/decrement between 0 and the arrays length. I realise now on reflection it would have been cleaner to store this number inside the form stage itself after all objects to achieve a more minimal representation of state. The back button was also rendered based on whether the current active input number was greater than zero, and the next button would become a submit type/text content when the length - 1 num was reached. I encountered a bug where the form would submit a step early, even though targeting the length itself would result in the submit button never occurring. EXPLAIN FIX.

Shopping List = This was a classic challenge which used all the useful logic that I learnt when writing my first TODO list app in React. The shopping list was essentially a todo list allowing users to add items, check them off and remove them at will. I chose to model each shopping list item as an object inside a parent array in state, using a reducer to type out all possible actions and to update state in a strict and safe manner. The search input was also denounced to make an API request when the user had stopped typing instead of on every key stroke which would be horrendous for long-term performance. This was my first time implementing a Debounce function which acts a higher order function to return a new one that calls our targeted function only when the timer it sets up finishes, yet every time that function gets called it resets the timer. Finally, I utilised the filter method to return an array of matched properties based on the users input which would be displayed as a separate ordered list underneath.

### Useful resources

-  [Analogue Clock](https://dev.to/code_mystery/simple-analog-clock-using-html-css-javascript-2c6a) = This resource helped me with the mathematical formula needed to determine the degree by which each hand should correctly rotate.

## Author

-  Website - [Joshua Jameson-Wallis](https://www.joshuajamesonwallis.com/)
-  Linkedin - [Joshua Jameson-Wallis](https://www.linkedin.com/in/joshua-jameson-wallis/)
