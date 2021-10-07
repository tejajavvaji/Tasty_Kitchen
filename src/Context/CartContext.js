import React from 'react'

const CartContext = React.createContext({
  cartData: [
    {
      id: 0,
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/tasty-kitchens/restaurants/cafe-madarassi-2200153.jpg',
      title: 'poha',
      quantity: 2,
      price: 500,
    },
  ],
  addProductsToCart: () => {},
  deleteProductsInCart: () => {},
})

export default CartContext
