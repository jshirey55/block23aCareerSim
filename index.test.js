const array = require('./index')
console.log(array)

test('render length greater than 0', () => {
    const array = [1, 2, 3]
    expect(array.length).toBeGreaterThan(0)
})