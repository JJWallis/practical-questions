# Practical Coding Interview Questions

This repo contains all my attempts at practical coding problems that are usually best tackled using React

All the challenges are being sourced from [Frontendeval](https://frontendeval.com/) which is an amazing resource I discovered while browsing the Frontend subreddit

### What I learned

Analogue Clock = This challenge required me to build an analogue clock which consisted of building the working hands for the hours, minutes and seconds inside a circular clock face. I wrote a function that would retrieve a new instance of the date object and placed the relevant properties inside an object into local state. I then created a timer with `setInterval()` that would run every second inside a `useEffect()` hook. Passing the stateful variables down to the JSX beneath allowed me to create a new hand for each using a blank div. Each hand was positioned absolute to the relatively positioned clock face with a `right: 50%` position offset to keep it centered. I further applied a `transform-origin: center` to ensure they rotated from the centre point. To rotate each hand by the correct degree and angle, I divided the amount of hours by 12 and minutes/seconds by 60 and multiplied the returned value by 360, the total number of degrees in a circle. To add each hour number around the face I had to create each multiple new lines where the numbers would be positioned at either end, with two centrally facing 90 degree alongside four more facing at 30, 60, 120 and 150 degrees accordingly.

### Continued development

### Useful resources

-  [Analogue Clock](https://dev.to/code_mystery/simple-analog-clock-using-html-css-javascript-2c6a) = This resource helped me with the mathematical formula needed to determine the degree by which each hand should correctly rotate.

## Author

-  Website - [Joshua Jameson-Wallis](https://www.joshuajamesonwallis.com/)
-  Linkedin - [Joshua Jameson-Wallis](https://www.linkedin.com/in/joshua-jameson-wallis/)
