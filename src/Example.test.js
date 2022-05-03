import * as examples from './Example'

jest.mock('./Example', () => {
   const originalModule = jest.requireActual('./Example')

   return {
      __esModule: true,
      ...originalModule,
      subtract: jest.fn(() => {
         throw new Error('Invalid arguments')
      }),
   }
})

beforeEach(() => {
   jest.resetAllMocks()
})

it('adds and subtracts correctly', () => {
   const result = examples.add(1, 2)
   expect(examples.subtract).toThrow()
})
