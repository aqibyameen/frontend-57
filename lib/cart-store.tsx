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

interface CheckoutForm {
  name: string
  email: string
  address: string
  phone: string
}

interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
  status: string
  form: CheckoutForm
  createdAt: string
  paymentMethod: "cod" | "card"
}

interface CartState {
  items: CartItem[]
  wishlist: WishlistItem[]
  isCartOpen: boolean
  isCheckoutOpen: boolean
  checkoutForm: CheckoutForm
  orders: Order[]
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "SET_CHECKOUT_OPEN"; payload: boolean }
  | { type: "ADD_TO_WISHLIST"; payload: WishlistItem }
  | { type: "REMOVE_FROM_WISHLIST"; payload: string }
  | { type: "UPDATE_CHECKOUT_FORM"; payload: Partial<CheckoutForm> }
  | { type: "PLACE_ORDER"; payload: Order }
  | { type: "UPDATE_ORDER_STATUS"; payload: { id: string; status: Order["status"] } }
  | { type: "HYDRATE_STATE"; payload: Partial<CartState> }

const initialState: CartState = {
  items: [],
  wishlist: [],
  isCartOpen: false,
  isCheckoutOpen: false,
  checkoutForm: { name: "", email: "", address: "", phone: "" },
  orders: [],
}

function cartReducer(state: CartState, action: CartAction): CartState {
  console.log(state)
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
      return { ...state, items: [...state.items, action.payload] }
    }

    case "REMOVE_FROM_CART":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload.id
              ? { ...i, quantity: Math.max(0, action.payload.quantity) }
              : i,
          )
          .filter((i) => i.quantity > 0),
      }

    case "CLEAR_CART":
      return { ...state, items: [] }

    case "TOGGLE_CART":
      return { ...state, isCartOpen: !state.isCartOpen }

    case "SET_CART_OPEN":
      return { ...state, isCartOpen: action.payload }

    case "SET_CHECKOUT_OPEN":
      return { ...state, isCheckoutOpen: action.payload }

    case "ADD_TO_WISHLIST":
      return state.wishlist.some((w) => w.id === action.payload.id)
        ? state
        : { ...state, wishlist: [...state.wishlist, action.payload] }

    case "REMOVE_FROM_WISHLIST":
      return { ...state, wishlist: state.wishlist.filter((w) => w.id !== action.payload) }

    case "UPDATE_CHECKOUT_FORM":
      return { ...state, checkoutForm: { ...state.checkoutForm, ...action.payload } }

    case "PLACE_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
        items: [],
        checkoutForm: { name: "", email: "", address: "", phone: "" },
        isCheckoutOpen: false,
      }

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id ? { ...o, status: action.payload.status } : o,
        ),
      }

    case "HYDRATE_STATE":
      return { ...state, ...action.payload, isCartOpen: false, isCheckoutOpen: false }

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

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cartState")
      if (stored) {
        dispatch({ type: "HYDRATE_STATE", payload: JSON.parse(stored) })
      }
    } catch (err) {
      console.error("Failed to load cart", err)
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const { items, wishlist, orders } = state
    console.log(items)
    localStorage.setItem("cartState", JSON.stringify({ items, wishlist, orders }))
  }, [state.items, state.wishlist, state.orders, hydrated])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}

export function useCartActions() {
  const { dispatch } = useCart()
  return {
    addToCart: (item: CartItem) => dispatch({ type: "ADD_TO_CART", payload: item }),
    removeFromCart: (id: string) => dispatch({ type: "REMOVE_FROM_CART", payload: id }),
    updateQuantity: (id: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
    setCartOpen: (open: boolean) => dispatch({ type: "SET_CART_OPEN", payload: open }),
    setCheckoutOpen: (open: boolean) => dispatch({ type: "SET_CHECKOUT_OPEN", payload: open }),

    addToWishlist: (item: WishlistItem) => dispatch({ type: "ADD_TO_WISHLIST", payload: item }),
    removeFromWishlist: (id: string) => dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id }),

    updateCheckoutForm: (data: Partial<CheckoutForm>) =>
      dispatch({ type: "UPDATE_CHECKOUT_FORM", payload: data }),
    placeOrder: (order: Order) => dispatch({ type: "PLACE_ORDER", payload: order }),
    updateOrderStatus: (id: string, status: Order["status"]) =>
      dispatch({ type: "UPDATE_ORDER_STATUS", payload: { id, status } }),
  }
}
