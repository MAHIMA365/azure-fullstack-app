"use client"

import { useAuth, useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { api } from "../api"

export default function HomePage() {
  const { getToken, isSignedIn, signOut } = useAuth()
  const { user } = useUser()
  const [products, setProducts] = useState([])
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
    headerActions: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    welcomeText: {
      fontSize: "14px",
      color: "#6b7280",
    },
    userName: {
      fontWeight: "500",
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
    hero: {
      marginBottom: "3rem",
      textAlign: "center",
    },
    heroTitle: {
      fontSize: "48px",
      fontWeight: "bold",
      color: "#111827",
      marginBottom: "1rem",
      lineHeight: "1.2",
    },
    heroSubtitle: {
      fontSize: "18px",
      color: "#6b7280",
      maxWidth: "672px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "24px",
    },
    card: {
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s",
    },
    cardImage: {
      position: "relative",
      height: "192px",
      width: "100%",
      overflow: "hidden",
      backgroundColor: "#f3f4f6",
    },
    image: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      transition: "transform 0.3s",
    },
    cardContent: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    cardTitle: {
      fontWeight: "600",
      fontSize: "18px",
      color: "#111827",
      marginBottom: "8px",
    },
    cardDescription: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "16px",
      flexGrow: 1,
      lineHeight: "1.5",
    },
    cardFooter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      paddingTop: "12px",
      borderTop: "1px solid #e5e7eb",
    },
    price: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#3b82f6",
    },
    addButton: {
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
    },
  }

  // ✅ Temporary static demo data
  const demoProducts = [
    {
      id: 1,
      name: "Margherita Pizza",
      price: 12.99,
      description: "Classic cheese pizza with tomato sauce",
      image: "https://images.unsplash.com/photo-1601924582971-d7f4e3e02b63",
    },
    {
      id: 2,
      name: "Cheese Burger",
      price: 9.49,
      description: "Beef burger with melted cheese and lettuce",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    },
    {
      id: 3,
      name: "Pasta Alfredo",
      price: 10.99,
      description: "Creamy pasta with garlic and parmesan",
      image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    },
    {
      id: 4,
      name: "Chicken Fried Rice",
      price: 8.75,
      description: "Stir-fried rice with chicken and vegetables",
      image: "https://images.unsplash.com/photo-1608139740936-3bdbeb5afc8f",
    },
    {
      id: 5,
      name: "Fresh Salad Bowl",
      price: 6.99,
      description: "Mixed greens with cucumber, tomato, and dressing",
      image: "https://images.unsplash.com/photo-1570197788417-0e823fc9f2fa",
    },
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Try fetching from backend first
        const data = await api.getProducts()
        if (data && data.length > 0) {
          setProducts(data)
        } else {
          setProducts(demoProducts) // fallback
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
        setProducts(demoProducts) // fallback to local data
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = async (product) => {
    if (!isSignedIn) {
      alert("Please sign in to add items to cart")
      window.location.href = "/sign-in"
      return
    }

    try {
      const token = await getToken()
      console.log("Adding to cart:", { productId: product.id, quantity: 1 })
      await api.addToCart(token, product.id, 1)
      alert(`${product.name} added to cart!`)
    } catch (error) {
      console.error("Failed to add to cart:", error)
      alert(`Failed to add to cart: ${error.message}`)
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
            <p style={styles.loadingText}>Loading delicious menu...</p>
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
        .card:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }
        .card:hover .card-image img {
          transform: scale(1.05);
        }
        .button:hover, .add-button:hover {
          background-color: #2563eb;
        }
        .button:active, .add-button:active {
          transform: scale(0.95);
        }
        @media (max-width: 640px) {
          .hero-title {
            font-size: 36px !important;
          }
          .welcome-text {
            display: none;
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

            <div style={styles.headerActions}>
              {isSignedIn ? (
                <>
                  <span style={styles.welcomeText} className="welcome-text">
                    Welcome, <span style={styles.userName}>{user?.firstName}</span>!
                  </span>
                  <a href="/cart" style={styles.button} className="button">
                    <span>🛒</span>
                    <span>View Cart</span>
                  </a>
                  <button onClick={() => signOut()} style={styles.button} className="button">
                    Logout
                  </button>
                </>
              ) : (
                <a href="/sign-in" style={styles.button} className="button">
                  Sign In
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={styles.main}>
          {/* Hero Section */}
          <div style={styles.hero}>
            <h2 style={styles.heroTitle} className="hero-title">
              Order Your Favorite Dishes
            </h2>
            <p style={styles.heroSubtitle}>Fresh ingredients, authentic flavors, delivered right to your door</p>
          </div>

          {/* Products Grid */}
          <div style={styles.grid}>
            {products.map((p) => (
              <article key={p.id} style={styles.card} className="card">
                {/* Product Image */}
                <div style={styles.cardImage} className="card-image">
                  <img src={p.image || "/placeholder.svg"} alt={p.name} style={styles.image} />
                </div>

                {/* Product Info */}
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{p.name}</h3>
                  <p style={styles.cardDescription}>{p.description}</p>

                  {/* Price and Action */}
                  <div style={styles.cardFooter}>
                    <span style={styles.price}>${p.price.toFixed(2)}</span>
                    <button onClick={() => addToCart(p)} style={styles.addButton} className="add-button">
                      <span>+</span>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🍽️</div>
              <h3 style={styles.emptyTitle}>No items available</h3>
              <p style={styles.emptyText}>Check back soon for delicious options!</p>
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

