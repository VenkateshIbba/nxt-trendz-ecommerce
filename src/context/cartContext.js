import React from "react";

const cartContext = React.createContext ({
    cartList: [],
    addCartItem: () => {},
    deleteCartItem: () => {},
    increaseCartItem: () => {},
    decreaseCartItem: () => {}
})

export default cartContext