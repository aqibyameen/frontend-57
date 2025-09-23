"use client"

import type React from "react"
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
  useState,
} from "react"

interface CartItem {
  id: string
  name: string
  price: number
  discountPrice?: number
  image: string
  size: string
  color: string
  quantity: number
}

interface WishlistItem {
  id: string
  name: string
  price: number
  discountPrice?: number
  image: string
  category: string
}

interface CartState {
  items: CartItem[]
  wishlist: WishlistItem[]
  isCartOpen: boolean
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "ADD_TO_WISHLIST"; payload: WishlistItem }
  | { type: "REMOVE_FROM_WISHLIST"; payload: string }
  | { type: "HYDRATE_STATE"; payload: Partial<CartState> } // ✅ for localStorage load

const initialState: CartState = {
  items: [],
  wishlist: [],
  isCartOpen: false,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color,
      )

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === existingItem.id &&
            item.size === existingItem.size &&
            item.color === existingItem.color
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        }
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.max(0, action.payload.quantity) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      }

    case "TOGGLE_CART":
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      }

    case "SET_CART_OPEN":
      return {
        ...state,
        isCartOpen: action.payload,
      }

    case "ADD_TO_WISHLIST": {
      const existingItem = state.wishlist.find(
        (item) => item.id === action.payload.id,
      )
      if (existingItem) return state

      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      }
    }

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.id !== action.payload,
        ),
      }

    case "HYDRATE_STATE":
      return {
        ...state,
        ...action.payload,
        isCartOpen: false, // 🚫 never persist this
      }

    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [hydrated, setHydrated] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cartState")
      if (stored) {
        const parsed = JSON.parse(stored)
        dispatch({ type: "HYDRATE_STATE", payload: parsed })
      }
    } catch (err) {
      console.error("Failed to load cart from storage", err)
    } finally {
      setHydrated(true) // ✅ only after hydration
    }
  }, [])

  // Save to localStorage *only after hydration*
  useEffect(() => {
    if (!hydrated) return
    const { items, wishlist } = state
    localStorage.setItem("cartState", JSON.stringify({ items, wishlist }))
  }, [state.items, state.wishlist, hydrated])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}


export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

// ✅ Helper functions
export function useCartActions() {
  const { dispatch } = useCart()

  return {
    addToCart: (item: CartItem) =>
      dispatch({ type: "ADD_TO_CART", payload: item }),
    removeFromCart: (id: string) =>
      dispatch({ type: "REMOVE_FROM_CART", payload: id }),
    updateQuantity: (id: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
    setCartOpen: (open: boolean) =>
      dispatch({ type: "SET_CART_OPEN", payload: open }),
    addToWishlist: (item: WishlistItem) =>
      dispatch({ type: "ADD_TO_WISHLIST", payload: item }),
    removeFromWishlist: (id: string) =>
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id }),
  }
}
