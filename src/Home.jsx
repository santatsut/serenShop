import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import "./Home.css";

//npm run dev for startup

const images = [
  "/src/assets/brownShirt.jpg",
  "/src/assets/whiteShirt.jpg",
  "/src/assets/blackCroppedShirt.jpg",
  // Add more image paths here
];

const blazers = [
  "/src/assets/greyBlazer.jpg",
  "",
  "",
  "",
  ""
];

const chains = [
  "",
  "",
  "",
  "",
];

const shirts = [
  "",
  "",
  "",
  "",
];



function Home() {
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [fadeIn, setFadeIn] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 3000); // Change slide every 3 seconds

  //   return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, []);

  // useEffect(() => {
  //   setFadeIn(true); // Re-apply the fade-in class when currentIndex changes
  // }, [currentIndex]);

  // const goToPrevious = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //   );
  //   setFadeIn(false);
  // };

  // const goToNext = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   setFadeIn(false);
  // };

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

  const [activeWindow, setActiveWindow] = useState(false);

  const logIn = () => {
    
    // Log in logic goes here
    console.log("Logged in");
  }

  /* för att sortera bilderna för det man trycker på filtret */

  const [choice, setChoice] = useState("");
  let className;
  let content;

  switch (choice) {
    case "blazers":
      className = 'sectionChangeActive';
      content = (
        blazers.map((item, index) => (
          <img src={item} alt={`Blazer ${index + 1}`} key={index} />
        ))
      );
      break;
    case "chains":
      className = 'sectionChangeActive';
      content = (
        chains.map((item, index) => (
          <img src={item} alt={`Shirt ${index + 1}`} key={index} />
        ))
      );
      break;
    case "shirts":
      className = 'sectionChangeActive';
      content = (
        shirts.map((item, index) => (
          <img src={item} alt={`Shirt ${index + 1}`} key={index} />
        ))
      );
      break;
    default:
      className = 'sectionChangeInactive'; // Default class for unspecified choices
      content = null; // Default content
      break;
  }

  const [storageItems, setStorageItems] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/storageGet')
      .then((response) => {
        console.log("Cart items fetched:", response.data);
        setStorageItems(response.data); // Update state with the fetched items
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const buttonStyle = {
      width: "30px",
      background: 'none',
      border: '0px'
    };

    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z"/></svg></button>,
        nextArrow: <button style={{ ...buttonStyle }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"><path d="M512 256L270 42.6v138.2H0v150.6h270v138z"/></svg></button>
    }

  return (
    <>
      <div className="navBar">
        <div className="leftBar">
          <h2>contact</h2>
          <h2>about</h2>
          <img src="/src/assets/person.svg" alt="Profile Icon" id="profileIcon" onClick={() => {setActiveWindow(!activeWindow )}}/>
        </div>
        <h1 className="title">SEREN</h1>
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

      <div className={activeWindow ? "activeLogInWindow" : "logInWindow"}>
        <h2>Log In</h2>
        <form>
          <input
            type="text"
            placeholder="Email"
            id="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            required
          />
          <button type="submit">Log In</button>
        </form>
        <p>Don't have an account? Sign Up <Link to="/signup">here</Link></p>
      </div>

      <div className="topPart">
        <img src="/src/assets/bgPic1.jpg" alt="" className="bigPicture1" />
        <img src="/src/assets/bgPic2.jpg" alt="" className="bigPicture2" />
        <div className="filters">
          <h2 className="tags" onMouseEnter={() => handleMouseEnter("men")}>
            Mens
          </h2>
          <h2 className="tags" onMouseEnter={() => handleMouseEnter("women")}>
            womens
          </h2>
          <h2
            className="tags"
            onMouseEnter={() => handleMouseEnter("children")}
          >
            children
          </h2>
          <h2 className="tags" onMouseEnter={() => handleMouseEnter("unisex")}>
            unisex
          </h2>
          <div
            className="dropdown"
            ref={dropdownRef}
            onMouseLeave={handleMouseLeave}
          >
            <ul className="Men" ref={menRef}>
              <li onClick={() => setChoice("blazers")}>blazers</li>
              <li onClick={() => setChoice("chains")}>chains</li>
            </ul>
            <ul id="Women" ref={womenRef}>
              <li onClick={() => setChoice("shirts")}>shirts</li>
              <li onClick={() => setChoice("dresses")}>dresses</li>
              <li onClick={() => setChoice("skirts")}>skirts</li>
            </ul>
            <ul id="Children" ref={childrenRef}>
              <li>shirts</li>
              <li>pants</li>
            </ul>

            <ul id="Unisex" ref={unisexRef}>
              <li>Unisex Item 1</li>
              <li>Unisex Item 2</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={className}>
        {content}
      </div>

      <div className="midPart">
        <div className="line"></div>
        <h2>NEW FASHION</h2>
      </div>

      {/*
      <div className="slideshow">
        <button className="prev" onClick={goToPrevious}>
          ❮
        </button>
        <img
          src={images[currentIndex]}
          alt="slideshow"
          className={`slideImage ${fadeIn ? "fade-in" : ""}`}
        />
        <img
          src={images[currentIndex]}
          alt="slideshow"
          className={`slideImage ${fadeIn ? "fade-in" : ""}`}
        />
        <img
          src={images[currentIndex]}
          alt="slideshow"
          className={`slideImage ${fadeIn ? "fade-in" : ""}`}
        />
        <button className="next" onClick={goToNext}>
          ❯
        </button>
      </div> 
      */}
    
        <div className="newFashion">
          {storageItems.length > 0 ? (
            storageItems.map((item) => (
              <div key={item.id} className="storageItem">
                  <img src={item.path} alt={item.name} className="storageItemImage" />
              </div>
              ))
            ) : (
              <div>
                <h3>storage</h3>
              </div>
            )}
        </div>  

      <div className="midPart">
        <div className="line"></div>
        <h2>POPULAR</h2>
      </div>

      <div className="popular">
        <Link
          to="/shop" state={{id: 1}}
        >
          <img
            src="/src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link
          to="/shop" state={{id: 2}}
        >
          <img
            src="/src/assets/whiteShirt.jpg"
            alt="white shirt"
            className="popularImg"
          />
        </Link>
        <Link
          to="/shop" state={{id: 3}}
        >
          <img
            src="/src/assets/blackCroppedShirt.jpg"
            alt="black cropped shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
      </div>
      <div className="footer">
        <ul>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
        </ul>
        <ul>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
        </ul>
        <ul>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
          <li>
            <a className="footerText" href="">xxxxxxx</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Home;
