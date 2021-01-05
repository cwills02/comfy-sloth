import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {...state.filters, max_price: maxPrice, price: maxPrice},
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return {...state, grid_view: true}
  }
  if (action.type === SET_LISTVIEW) {
    return {...state, grid_view: false}
  }
  if (action.type === UPDATE_SORT) {
    return {...state, sort: action.payload}
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products];
    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => {
        if (a.price < b.price) {
          // long way of a.price - b.price for ascending order
          return -1; 
        }
        if (a.price > b.price) {
          return 1; 
        }
        return 0;
      })
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      // descending order
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return {...state, filtered_products: tempProducts}
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } }
    // again the [] notation indicates that this is being done dynamically, whatever name-value he is passing in, access that property  and set it to that value
  }
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;

    let tempProducts = [...all_products];
    // filtering
    // text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      })
    }
    // category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(product => product.category === category)
    }
    // company
    if (company !== 'all') {
      tempProducts = tempProducts.filter(product => product.company === company)
    }
    // colors, remember colors is an array
    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }
    // price
    tempProducts = tempProducts.filter((product) => product.price <= price)
    //shipping
    if (shipping) {
      tempProducts = tempProducts.filter((product) => product.shipping === true)
    }

    return { ...state, filtered_products: tempProducts };
  }
  // we always want to have the array of a fresh set of all the products otherwise we'll run out the products when we filter the products and create a new array
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
      ...state.filters,
      text: '',
      company: 'all',
      category: 'all',
      color: 'all',
      price: state.filters.max_price,
      shipping: false,
      },
    }
  }
  throw new Error(`No matching "${action.type}" - action type`)
}

export default filter_reducer

// we must use the spread operator for the LOAD_PRODUCTS so that we create copies instead of having both the all_products and filtered_products point to the same point in memory if we did not do so