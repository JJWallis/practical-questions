export function subtract(x, y) {
   if (x && y) return x + y
   throw new Error('Invalid arguments')
}

export function add(a, b) {
   try {
      const result = subtract(a, b)
      return 200 - result
   } catch (error) {
      return error.message
   }
}
