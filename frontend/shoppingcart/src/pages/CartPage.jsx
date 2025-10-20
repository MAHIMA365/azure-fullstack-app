"use client"

import { useAuth, useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { api } from "../api"

export default function CartPage() {
  const { getToken, signOut } = useAuth()
  const { user } = useUser()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    header: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderBottom: "1px solid #e5e7eb",
      backdropFilter: "blur(8px)",
    },
    headerInner: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "0 1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "64px",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    logoIcon: {
      height: "40px",
      width: "40px",
      borderRadius: "8px",
      backgroundColor: "#3b82f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
    },
    logoText: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#111827",
    },
    button: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      padding: "8px 16px",
      borderRadius: "8px",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      textDecoration: "none",
    },
    main: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "2rem 1rem",
    },
    greeting: {
      marginBottom: "2rem",
      paddingBottom: "1.5rem",
      borderBottom: "1px solid #e5e7eb",
    },
    greetingTitle: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#111827",
      marginBottom: "8px",
    },
    greetingSubtitle: {
      fontSize: "16px",
      color: "#6b7280",
    },
    sectionTitle: {
      fontSize: "24px",
      fontWeight: "600",
      color: "#111827",
      marginBottom: "1.5rem",
    },
    cartList: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      marginBottom: "2rem",
    },
    cartItem: {
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      transition: "all 0.2s",
    },
    itemInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    itemName: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#111827",
    },
    itemDetails: {
      fontSize: "14px",
      color: "#6b7280",
    },
    itemPrice: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#3b82f6",
    },
    clearButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      backgroundColor: "#ef4444",
      color: "#ffffff",
      padding: "12px 24px",
      borderRadius: "8px",
      fontWeight: "500",
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      fontSize: "16px",
    },
    emptyState: {
      textAlign: "center",
      padding: "4rem 0",
    },
    emptyIcon: {
      fontSize: "64px",
      marginBottom: "16px",
    },
    emptyTitle: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#111827",
      marginBottom: "8px",
    },
    emptyText: {
      color: "#6b7280",
      marginBottom: "24px",
    },
    loading: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
    },
    loadingContent: {
      textAlign: "center",
    },
    spinner: {
      display: "inline-block",
      height: "48px",
      width: "48px",
      borderRadius: "50%",
      border: "4px solid #3b82f6",
      borderRightColor: "transparent",
      animation: "spin 1s linear infinite",
      marginBottom: "16px",
    },
    loadingText: {
      fontSize: "18px",
      color: "#6b7280",
    },
    footer: {
      marginTop: "4rem",
      borderTop: "1px solid #e5e7eb",
      backgroundColor: "#ffffff",
    },
    footerInner: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "2rem 1rem",
    },
    footerText: {
      textAlign: "center",
      fontSize: "14px",
      color: "#6b7280",
    },
  }

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = await getToken()
        const data = await api.getCart(token)
        setCart(data)
      } catch (error) {
        console.error("Failed to fetch cart:", error)
        // Set empty cart on error
        setCart({ items: [] })
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [getToken])

  const clearCart = async () => {
    try {
      const token = await getToken()
      await api.clearCart(token)
      setCart({ ...cart, items: [] })
      alert("Cart cleared!")
    } catch (error) {
      console.error("Failed to clear cart:", error)
      alert("Failed to clear cart.")
    }
  }

  if (loading) {
    return (
      <>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div style={styles.loading}>
          <div style={styles.loadingContent}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Loading your cart...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .cart-item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }
        .button:hover {
          background-color: #2563eb;
        }
        .button:active {
          transform: scale(0.95);
        }
        .clear-button:hover {
          background-color: #dc2626;
        }
        .clear-button:active {
          transform: scale(0.95);
        }
        @media (max-width: 640px) {
          .greeting-title {
            font-size: 24px !important;
          }
          .cart-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>

      <div style={styles.container}>
        {/* Header Section */}
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>
                <span>🍽️</span>
              </div>
              <h1 style={styles.logoText}>Delicious Menu</h1>
            </div>

            <div style={{display: 'flex', gap: '12px'}}>
              <a href="/" style={styles.button} className="button">
                <span>←</span>
                <span>Back to Menu</span>
              </a>
              <button onClick={() => signOut()} style={styles.button} className="button">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={styles.main}>
          {/* Greeting Section */}
          <div style={styles.greeting}>
            <h2 style={styles.greetingTitle} className="greeting-title">
              Hello, {user?.firstName || "Customer"}! 👋
            </h2>
            <p style={styles.greetingSubtitle}>Here's what you've added to your cart</p>
          </div>

          {/* Cart Items Section */}
          <h3 style={styles.sectionTitle}>Your Cart Items</h3>

          {cart?.items?.length > 0 ? (
            <>
              <div style={styles.cartList}>
                {cart.items.map((item) => (
                  <div key={item.id} style={styles.cartItem} className="cart-item">
                    <div style={styles.itemInfo}>
                      <div style={styles.itemName}>{item.product?.name}</div>
                      <div style={styles.itemDetails}>
                        Quantity: {item.quantity} × ${item.product?.price?.toFixed(2)}
                      </div>
                    </div>
                    <div style={styles.itemPrice}>${(item.quantity * item.product?.price).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <button onClick={clearCart} style={styles.clearButton} className="clear-button">
                <span>🗑️</span>
                <span>Clear Cart</span>
              </button>
            </>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🛒</div>
              <h3 style={styles.emptyTitle}>Your cart is empty</h3>
              <p style={styles.emptyText}>Add some delicious items to get started!</p>
              <a href="/" style={styles.button} className="button">
                Browse Menu
              </a>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerInner}>
            <p style={styles.footerText}>© 2025 Delicious Menu. Fresh food delivered with love.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
