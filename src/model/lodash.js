import('lodash').then(({ default: _ }) => {
  const numbers = [1, 5, 3, 5, 8, 10, 1, 1, 1, 5, 15, 42, 5]
  const uniqueNumbers = _.uniq(numbers)

  console.log('Lodash uniq:', uniqueNumbers)

  console.log('Lodash random:', _.random(0, 100))
})
