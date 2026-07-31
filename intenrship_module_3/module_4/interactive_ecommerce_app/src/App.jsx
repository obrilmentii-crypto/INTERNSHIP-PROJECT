import React, { useState, useMemo, useEffect } from 'react';

const LOCAL_CATALOG = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop up to 15 inches in the padded sleeve.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim-fit style, contrast raglan long sleeve, three-button henley placket, lightweight and soft fabric for breathable comfort.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879_.jpg",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "Great outerwear jacket for Spring, Autumn and Winter. Suitable for working, hiking, camping and daily casual wear.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 }
  },
  {
    id: 4,
    title: "John Hardy Women's Legends Naga Gold Bracelet",
    price: 695,
    description:
      "From the Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.9, count: 400 }
  },
  {
    id: 5,
    title: "Solid Gold Petite Micropave",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and handcrafted in San Francisco.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.3, count: 70 }
  },
  {
    id: 6,
    title: "WD 2TB Elements Portable External Hard Drive",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility. Fast data transfers. Improve PC Performance. High Capacity.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 3.8, count: 203 }
  }
];

export default function App() {
  const [products] = useState(LOCAL_CATALOG);

  const categories = ["men's clothing", "jewelery", "electronics"];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("explorer_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Save cart
  useEffect(() => {
    localStorage.setItem("explorer_cart", JSON.stringify(cart));
  }, [cart]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim() !== "") {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOrder === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortOrder]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return previousCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { product, quantity: 1 }];
    });
  };

  // Update quantity
  const updateQuantity = (productId, amount) => {
    setCart((previousCart) =>
      previousCart
        .map((item) => {
          if (item.product.id !== productId) {
            return item;
          }

          const newQuantity = item.quantity + amount;

          if (newQuantity <= 0) {
            const shouldRemove = window.confirm(
              `Remove "${item.product.title}" from the cart?`
            );

            return shouldRemove ? null : item;
          }

          return {
            ...item,
            quantity: newQuantity
          };
        })
        .filter(Boolean)
    );
  };

  // Remove item
  const removeFromCart = (productId) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.product.id !== productId)
    );
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        backgroundColor: "#f1f5f9",
        color: "#0f172a",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        paddingBottom: "40px"
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          backgroundColor: "#0f172a",
          color: "#ffffff",
          padding: "16px 32px",
          position: "sticky",
          top: 0,
          zIndex: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
        }}
      >
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 900,
            color: "#f8fafc",
            margin: 0,
            letterSpacing: "-0.05em"
          }}
        >
          Store
          <span style={{ color: "#6366f1" }}>Explorer</span>
        </h1>

        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            backgroundColor: "#6366f1",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "14px",
            padding: "10px 22px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <span>Shopping Basket</span>

          <span
            style={{
              backgroundColor: "#ffffff",
              color: "#6366f1",
              padding: "2px 10px",
              borderRadius: "9999px",
              fontSize: "13px",
              fontWeight: 900
            }}
          >
            {cartCount}
          </span>
        </button>
      </nav>

      {/* FILTER BAR */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px 24px 8px",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <input
          type="text"
          placeholder="Search collections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            minWidth: "280px",
            maxWidth: "400px",
            padding: "14px 20px",
            borderRadius: "14px",
            border: "2px solid #cbd5e1",
            backgroundColor: "#ffffff",
            fontSize: "14px",
            outline: "none"
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "16px",
            width: "100%",
            maxWidth: "400px"
          }}
        >
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              flex: 1,
              padding: "14px 16px",
              borderRadius: "14px",
              border: "2px solid #cbd5e1",
              backgroundColor: "#ffffff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <option value="">All Departments</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              flex: 1,
              padding: "14px 16px",
              borderRadius: "14px",
              border: "2px solid #cbd5e1",
              backgroundColor: "#ffffff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <option value="">Sort Configuration</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* PRODUCTS */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px"
        }}
      >
        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px",
              color: "#64748b",
              fontSize: "16px"
            }}
          >
            No products match your filters.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "32px"
            }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "24px",
                  padding: "20px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow:
                    "0 4px 6px -1px rgba(0,0,0,0.05)"
                }}
              >
                {/* IMAGE */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f8fafc",
                    borderRadius: "18px",
                    padding: "16px",
                    cursor: "pointer"
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain"
                    }}
                  />
                </div>

                {/* INFO */}
                <div
                  style={{
                    marginTop: "20px",
                    flex: 1,
                    cursor: "pointer"
                  }}
                  onClick={() => setSelectedProduct(product)}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#6366f1",
                      textTransform: "uppercase"
                    }}
                  >
                    {product.category}
                  </span>

                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#1e293b",
                      marginTop: "6px",
                      height: "44px",
                      overflow: "hidden",
                      lineHeight: 1.4
                    }}
                  >
                    {product.title}
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "6px"
                    }}
                  >
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#475569"
                      }}
                    >
                      Rating: ⭐ {product.rating.rate}
                    </span>

                    <span
                      style={{
                        fontSize: "12px",
                        color: "#94a3b8"
                      }}
                    >
                      ({product.rating.count} reviews)
                    </span>
                  </div>
                </div>

                {/* PRICE + ADD BUTTON */}
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "16px",
                    borderTop: "2px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px"
                  }}
                >
                  <strong
                    style={{
                      fontSize: "20px",
                      color: "#0f172a"
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </strong>

                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      backgroundColor: "#6366f1",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15,23,42,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 100
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              padding: "30px",
              maxWidth: "650px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              style={{
                display: "block",
                height: "250px",
                maxWidth: "100%",
                objectFit: "contain",
                margin: "0 auto 20px"
              }}
            />

            <span
              style={{
                color: "#6366f1",
                fontWeight: 800,
                textTransform: "uppercase",
                fontSize: "12px"
              }}
            >
              {selectedProduct.category}
            </span>

            <h2>{selectedProduct.title}</h2>

            <p
              style={{
                color: "#64748b",
                lineHeight: 1.6
              }}
            >
              {selectedProduct.description}
            </p>

            <h3>${selectedProduct.price.toFixed(2)}</h3>

            <p>
              ⭐ {selectedProduct.rating.rate} (
              {selectedProduct.rating.count} reviews)
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px"
              }}
            >
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                style={{
                  flex: 1,
                  backgroundColor: "#6366f1",
                  color: "#ffffff",
                  border: "none",
                  padding: "14px",
                  borderRadius: "12px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Add to Cart
              </button>

              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  padding: "14px 20px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART MODAL */}
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(15,23,42,0.65)",
            zIndex: 90,
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              maxWidth: "450px",
              height: "100%",
              padding: "30px",
              overflowY: "auto"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <h2>Shopping Cart</h2>

              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "24px",
                  cursor: "pointer"
                }}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 10px",
                  color: "#64748b"
                }}
              >
                <h3>Your cart is empty</h3>
                <p>Add some products to get started.</p>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: "flex",
                      gap: "15px",
                      padding: "18px 0",
                      borderBottom: "1px solid #e2e8f0"
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "contain",
                        backgroundColor: "#f8fafc",
                        borderRadius: "10px"
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <h4
                        style={{
                          margin: "0 0 6px",
                          fontSize: "14px"
                        }}
                      >
                        {item.product.title}
                      </h4>

                      <strong>
                        ${item.product.price.toFixed(2)}
                      </strong>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginTop: "10px"
                        }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, -1)
                          }
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            cursor: "pointer"
                          }}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, 1)
                          }
                          style={{
                            width: "30px",
                            height: "30px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            cursor: "pointer"
                          }}
                        >
                          +
                        </button>

                        <button
                          onClick={() =>
                            removeFromCart(item.product.id)
                          }
                          style={{
                            marginLeft: "auto",
                            border: "none",
                            background: "transparent",
                            color: "#ef4444",
                            cursor: "pointer",
                            fontWeight: 600
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* TOTAL */}
                <div
                  style={{
                    marginTop: "30px",
                    paddingTop: "20px",
                    borderTop: "2px solid #e2e8f0"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "20px",
                      fontWeight: 800
                    }}
                  >
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  <button
                    style={{
                      width: "100%",
                      marginTop: "20px",
                      padding: "15px",
                      backgroundColor: "#6366f1",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "12px",
                      fontWeight: 800,
                      cursor: "pointer"
                    }}
                    onClick={() =>
                      alert("Checkout functionality coming soon!")
                    }
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}