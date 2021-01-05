import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

// dev-2vnkn6tp.us.auth0.com
// mamxnnqOu1KTVubN6iWFB3KJ0eiNO2cy

ReactDOM.render(
  <Auth0Provider
    domain="dev-2vnkn6tp.us.auth0.com"
    clientId="mamxnnqOu1KTVubN6iWFB3KJ0eiNO2cy"
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <UserProvider>
      <ProductsProvider>
      <FilterProvider>
      <CartProvider>
        <App />
      </CartProvider>
      </FilterProvider>
      </ProductsProvider>
      </UserProvider>
    </Auth0Provider>,
  document.getElementById('root'))

  // important: we must wrap our FilterProvider with our ProductsProvider because we are trying to get some information from the productsprovider in the filterprovider