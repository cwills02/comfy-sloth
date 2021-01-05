import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((i) => i.id === id + color)
    // if item is already in the cart, below code...
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max
          }
          return {...cartItem, amount: newAmount}
        }
        else {
          // if this item was not in the cart previously we do not want to add anything, just return to our array
          return cartItem
        }
      })

      return {...state, cart:tempCart} 
    }
    // if this is a new item that was not in the cart previously, below code
    else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      }
      return {...state, cart: [...state.cart, newItem]}
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempCart } 
  }
  if (action.type === CLEAR_CART) {
    return {...state, cart: []}
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === 'inc') {
          let newAmount = item.amount + 1
          if (newAmount > item.max) {
            newAmount = item.max
          }
          return {...item, amount: newAmount}
        }
        if (value === 'dec') {
          let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1
          }
          return {...item, amount: newAmount}
        }
      }
      else {
        return item
      }
    })

    return {...state, cart: tempCart}
  }
  // for COUNT_CART_TOTALS: he destructured out total_items and total_amount right away at the start, reduce uses a callback function that takes 2 params: total and cartItem are used here
  if (action.type === COUNT_CART_TOTALS) {
    const {total_items, total_amount } = state.cart.reduce((total, cartItem) => {
      const { amount, price } = cartItem

      total.total_items += amount;
      total.total_amount += price * amount;
      return total
    }, {
      total_items:0, total_amount: 0
    })
    return { ...state, total_items, total_amount }
    // in ES6 since he named the properties of the object being created here the same as the state properties you can just shorten the syntax by using the same name
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
