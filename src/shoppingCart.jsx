import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./shoppingCart.css";

function Cart() {
  const location = useLocation();
  const { cart } = location.state || {}; // Destructure the passed state

  const [isHovered, setIsHovered] = useState("");
  const menRef = useRef(null);
  const womenRef = useRef(null);
  const childrenRef = useRef(null);
  const unisexRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleMouseEnter = (tag) => {
    setIsHovered(tag);
    dropdownRef.current.classList.add("visible");

    if (tag === "men" && menRef.current) {
      menRef.current.classList.add("visibleText");
      womenRef.current.classList.remove("visibleText");
      childrenRef.current.classList.remove("visibleText");
      unisexRef.current.classList.remove("visibleText");
    } else if (tag === "women" && womenRef.current) {
      womenRef.current.classList.add("visibleText");
      menRef.current.classList.remove("visibleText");
      childrenRef.current.classList.remove("visibleText");
      unisexRef.current.classList.remove("visibleText");
    } else if (tag === "children" && childrenRef.current) {
      childrenRef.current.classList.add("visibleText");
      menRef.current.classList.remove("visibleText");
      womenRef.current.classList.remove("visibleText");
      unisexRef.current.classList.remove("visibleText");
    } else if (tag === "unisex" && unisexRef.current) {
      unisexRef.current.classList.add("visibleText");
      womenRef.current.classList.remove("visibleText");
      childrenRef.current.classList.remove("visibleText");
      menRef.current.classList.remove("visibleText");
    }
  };

  const handleMouseLeave = () => {
    setIsHovered("");
    if (menRef.current) {
      menRef.current.classList.remove("visibleText");
    }
    if (womenRef.current) {
      womenRef.current.classList.remove("visibleText");
    }
    if (childrenRef.current) {
      childrenRef.current.classList.remove("visibleText");
    }
    if (unisexRef.current) {
      unisexRef.current.classList.remove("visibleText");
    }

    dropdownRef.current.classList.remove("visible");
  };

  const items = ["sandals", "shoes", "hat", "shirt"];
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(event.target.value);
    
    if (inputValue === "") {
      setFilteredItems(items);
    } else {
      const matchedItems = items.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredItems(matchedItems);
  }
  console.log(inputValue);
};

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/cartGet')
      .then((response) => {
        console.log("Cart items fetched:", response.data);
        setCartItems(response.data); // Update state with the fetched items
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);


    // Handle item deletion
    const handleRemoveItem = (id) => {
      axios
        .delete(`http://localhost:5000/api/cartDelete/${id}`)
        .then(() => {
          // Remove the item from the local state
          setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
          console.log("Item removed successfully!");
        })
        .catch((error) => {
          console.error("Error removing item:", error);
          console.log("Failed to remove item. Please try again.");
        });
    };
  

  return (
    <>
      <div className="navBar">
        <div className="leftBar">
          <img
            src="/src/assets/person.svg"
            alt="Profile Icon"
            id="profileIcon"
          />
        </div>
        <Link to='/' id="title">
          <h1 className="title">SEREN</h1>
        </Link>
        <div id="rightBar">
          <div className="bg">
            <input
              type="text"
              className={isActive ? "searchBarActive" : "searchBarInactive"}
              placeholder="search"
              id="search"
              value={inputValue}
              onChange={handleInputChange}
              onClick={toggleClass}
            ></input>
            <div
              id="searchItems"
              className={isActive ? "searchActive" : "searchInactive"}
            >
              {filteredItems.length > 0
                ? filteredItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                : null}
            </div>
          </div>
          <Link to="/cart" className="cartBag">
            <img
              src="/src/assets/shoppingBagIcon.svg"
              alt="shopping bag"
              id="bagIcon"
            />
          </Link>
        </div>
      </div>
      <div className="shoppingCart">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cartItem">
              <img src={item.path} alt={item.name} className="cartItemImage" />
              <h3 id="itemName">{item.name}</h3>
              <p id="size">{item.size}</p>
              <p>{item.price}kr</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <div>
            <h3>Seems like your cart is empty</h3>
            <Link to='/'>
              <button id="goShopping">GO SHOPPING</button>
            </Link>
          </div>
        )}
      </div>
      <button id="checkout">Checkout</button>
    </>
  );
}

export default Cart;
