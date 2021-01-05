export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number / 100)
}

// e.g., in the filters.js we have categories as the type and all_products as the data being passed in for the 1st paramater
// this is similar to the "Menu" basic project we did earlier: in that project we had only 1 unique type though, here we have categories, companies, and colors
export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type])
  if (type === 'colors') {
    unique = unique.flat()
  }
  return ['all', ...new Set(unique)]
}

// unique.flat just means we will get an array instead of an array of arrays because colors is already an array we get back from the api