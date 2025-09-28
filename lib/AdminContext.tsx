/** @format */

"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  description: string;
  sizes: string[];
  gender: string[];
  price: number;
  discountPrice?: number;
  fabric: string;
  category: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface Order {
  _id: string;
  userOrderId: string;
  email: string;
  total: number;
  status: "pending" | "dispatch" | "delivered";
  paymentMethod: string;
  createdAt: string;
  form: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: {
    name: string;
    price: number;
    discountPrice?: number;
    quantity: number;
    size?: string;
    color?: string;
    image?: string;
  }[];
}

interface Customer {
  _id: string;
  email: string;
  userOrderId: string;
  createdAt: string;
}

interface OrderUser {
  _id: string;
  userOrderId: string;
  email: string;
  total: number;
  status: "pending" | "dispatch" | "delivered";
  paymentMethod: string;
  createdAt: string;
  form: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: {
    name: string;
    price: number;
    discountPrice?: number;
    quantity: number;
    size?: string;
    color?: string;
    image?: string;
  }[];
}

interface AdminContextType {
  orders: Order[];
  customers: Customer[];
  userOrder: OrderUser[];
  products: Product[];
  loadingOrders: boolean;
  loadingCustomers: boolean;
  loadingProducts: boolean;
  refreshOrders: () => Promise<void>;
  refreshCustomers: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  refreshOrdersByID: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [userOrder, setUserOrder] = useState<OrderUser[]>([]);

  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // fetch orders
  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch(`/api/admin/order`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : data.orders ?? []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  // fetch order by ID (userOrderId stored in localStorage)
  const fetchOrderByID = async () => {
    const userOrderId = localStorage.getItem("userOrderId");
    if (!userOrderId) return;

    try {
      const res = await fetch(`/api/orders?userOrderId=${userOrderId}`);
      const data = await res.json();
      setUserOrder(Array.isArray(data) ? data : data.orders ?? []);
    } catch (err) {
      console.error("Failed to fetch user order:", err);
    }
  };

  // fetch customers
  const fetchCustomers = async () => {
    setLoadingCustomers(true);
    try {
      const res = await fetch(`/api/customers/get-all`);
      const data = await res.json();
      setCustomers(Array.isArray(data) ? data : data.customers ?? []);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    } finally {
      setLoadingCustomers(false);
    }
  };

  // fetch products
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(`/api/products`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.products ?? []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  // auto load on mount
  useEffect(() => {
    fetchOrders();
    fetchCustomers();
    fetchProducts();
    fetchOrderByID();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        orders,
        customers,
        products,
        userOrder,
        loadingCustomers,
        loadingOrders,
        loadingProducts,
        refreshOrders: fetchOrders,
        refreshCustomers: fetchCustomers,
        refreshProducts: fetchProducts,
        refreshOrdersByID: fetchOrderByID,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
