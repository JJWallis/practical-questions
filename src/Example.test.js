import * as examples from './Example'
import { jest } from '@jest/globals'

beforeEach(() => {
   jest.resetAllMocks()
})

it('adds and subtracts correctly', () => {
   const mockedAdd = jest.spyOn(examples, 'add')
   const test = jest.spyOn(examples, 'subtract').mockImplementation(() => {
      throw new Error('Invalid arguments')
   })

   const result = mockedAdd(1, 2)
   expect(test).toThrow()
   expect(result).toBe('')
})
