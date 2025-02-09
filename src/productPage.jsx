import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./productPage.css";

function ProductPage() {

  const items = ["sandals", "shoes", "hat", "shirt"];
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [isActive, setIsActive] = useState(false);
  const [size, setSize] = useState('');

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(event.target.value);

    if (inputValue === "") {
      setFilteredItems(data.name);
    } else {
      const matchedItems = items.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredItems(matchedItems);
    }
    console.log(inputValue);
  };

  const changeSize = (newSize) => {
    setSize(newSize)
  };
    
  const [data, setData] = useState(null);
  const location = useLocation();
  const productId = location.state?.id; // Assuming you passed `id` as part of the state

  // Fetch the data for the product when the component is mounted
  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:5000/api/data/${productId}`)
        .then((response) => {
          console.log(response.data); // Logs the fetched data
          setData(response.data); // Store the data in the state
        })
        .catch((error) => {
          console.error('Error fetching item:', error);
        });
    }
  }, [productId]); // Depend on the productId

  // Add a fallback while the data is being fetched
  if (!data) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    
    if (!data) {
      alert("Data is still loading. Please wait.");
      return;
    }
    const cartData = {
      image: data.image,
      size: size || "m",
      price: data.price,
      name: data.name,
      quantity: 1,
    };

    axios.post("http://localhost:5000/cart", cartData) // Replace with your endpoint
      .then((response) => {
        console.log("Item added to cart:", response.data);
        console.log("Item added to cart!");
      })
      .catch((error) => {
        console.error("Error adding item to cart:", error);
        console.log("Failed to add item to cart.");
      });
  };

  return (
    <>
    <div className="navBar">
    <div className="leftBar">
      <img src="./src/assets/person.svg" alt="person" id="profileIcon" />
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
      <Link to="/cart" className="cartBag" state={{
            cart: 'hellooooo'
          }}>
            <img
              src="/src/assets/shoppingBagIcon.svg"
              alt="shopping bag"
              id="bagIcon"
            />
      </Link>
    </div>
  </div>
    <div className="main">
      <div className="productPage">
        <img src={data.image} alt="product" className="productImage" />
        <div className="productDetails">
          <h1>{data.name}</h1>
          <p id="price">{`${data.price}kr`}</p>
          <div>
            <p>Choose Size: </p>
            <div className="sizes">
              <button onClick={() => changeSize('xs')} style={{ backgroundColor: size === 'xs' ? 'black' : 'white', color: size === 'xs' ? 'white' : 'black' }}>XS</button>
              <button onClick={() => changeSize('s')} style={{ backgroundColor: size === 's' ? 'black' : 'white', color: size === 's' ? 'white' : 'black' }}>S</button>
              <button onClick={() => changeSize('m')} style={{ backgroundColor: size === 'm' ? 'black' : 'white', color: size === 'm' ? 'white' : 'black' }}>M</button>
              <button onClick={() => changeSize('l')} style={{ backgroundColor: size === 'l' ? 'black' : 'white', color: size === 'l' ? 'white' : 'black' }}>L</button>
            </div>
          </div>
          <button className="buyButton" onClick={handleAddToCart} disabled={!size}>
            Place in cart
          </button>

        </div>
      </div>
    </div>
    </>
  );
}

export default ProductPage;
