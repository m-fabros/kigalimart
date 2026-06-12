import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const exists = state.cartItems.find(i => i._id === action.payload._id);
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i._id === action.payload._id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cartItems: state.cartItems.filter(i => i._id !== action.payload) };
    case 'UPDATE_QTY':
      return {
        ...state,
        cartItems: state.cartItems.map(i =>
          i._id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const cartTotal = state.cartItems.reduce((acc, i) => acc + i.price * i.qty, 0);
  const cartCount = state.cartItems.reduce((acc, i) => acc + i.qty, 0);

  return (
    <CartContext.Provider value={{
      cartItems: state.cartItems,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartTotal,
      cartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);