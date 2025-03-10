import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import "./Home.css";
import styles from "./Slider.module.css";

//npm run dev for startup

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

  const [slideImages, setSlideImages] = useState([]);
  const [storageItems, setStorageItems] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/serenShop/storageGet')
      .then((response) => {
        setStorageItems(response.data); // First update storageItems
  
        // Update slideImages immediately after setting storageItems
        setSlideImages(response.data.map(item => item.path));
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);
  
  const items = storageItems.map((item) => item.name);
  const [inputValue, setInputValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [isActive, setIsActive] = useState(false);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(event.target.value);
    if (inputValue.length > 0) {
      setIsActive(true);
    }
    else {
      setIsActive(false);
    }
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


  const [signUp, setSignUp] = useState(null);
  const [gmail, setGmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [year, setYear] = useState(0)
  const [shownUsername, setShowUsername] = useState("")

  const verification = () => {
    axios.get('http://localhost:5000/usersGet')
      .then((response) => {
        console.log("Fetched data:", response.data);
        
        // Check if the response contains a user with the specified gmail
        const user = response.data.find((item) => item.gmail === gmail);
  
        if (!response.data || response.data.length === 0) {
          setSignUp(true); // No users found, allow sign-up
          console.log("No users found, sign-up enabled.");
        } else if (user) {
          setSignUp(false); // User found, prevent sign-up
          setShowUsername(user.username); // Set the username of the found user
          console.log("Logged in as:", user.username);
          setActiveWindow(false);
        } else {
          setSignUp(true); // Gmail not found, allow sign-up
          console.log("Gmail not found, sign-up enabled.");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  

  const addUser = () => {
    axios.post('http://localhost:5000/addUser', {
      gmail: gmail,
      password: password,
      username: username,
      year: year
    })
   .then(function (response) {
     console.log("User added successfully");
    })
   .catch(function (error) {
     console.error("Error adding user:", error);
    });
  }

  if (slideImages.length === 0) return <p>Loading slides...</p>;

  return (
    <>
      <div className="navBar">
        <div className="leftBar">
          <img src="./src/assets/person.svg" alt="Profile Icon" id="profileIcon" onClick={() => {setActiveWindow(!activeWindow )}}/>
          <p>{shownUsername}</p>
        </div>
        <h1 className="title">SEREN</h1>
        <div id="rightBar">
          <div className="searchFunction">
            <input
              type="text"
              className="searchBarInactive"
              placeholder="search"
              id="search"
              value={inputValue}
              onChange={handleInputChange}
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
          <Link to="/serenShop/cart" className="cartBag" state={{
            cart: 'hellooooo'
          }}>
            <img
              src="./src/assets/shoppingBagIcon.svg"
              alt="shopping bag"
              id="bagIcon"
            />
          </Link>
        </div>
      </div>

      <div className={activeWindow ? "activeLogInWindow" : "logInWindow"}>
          <div className={signUp ? "signingIn" : "notSigningIn"}>
            <div className="topSignUp">
              <h3>Sign Up</h3>
              <div className="closeButton" onClick={() => {setActiveWindow(!activeWindow)}}>X</div>
            </div>
            <form className="signupForm">
            <label htmlFor="email">gmail:</label>
            <input
              type="text"
              name = "email"
              placeholder="Email"
              id="signupGmail"
              value={gmail}
              onChange={(e) => {setGmail(e.target.value)}}
              required
            />
            <label htmlFor="password">password:</label>
            <input
              type="password"
              name = "password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              required
              />
            <label htmlFor="username">username:</label>
            <input
              type="text"
              name = "username"
              placeholder="Username"
              id="username"
              value={username}
              onChange={(e) => {setUsername(e.target.value)}}
              required
              />
              <label htmlFor="year">Year:</label>
              <input
                type="number"
                name = "year"
                placeholder="Year"
                id="year"
                value={year}
                onChange={(e) => {setYear(e.target.value)}}
                required
                />
            <button type="button" onClick={addUser}>Continue</button>
          </form>

          </div>

        <div className={signUp ? "notLoggingIn" : "loggingIn"}>
          <div className="topLogIn">
            <div className="closeButton" onClick={() => {setActiveWindow(!activeWindow)}}>X</div>
            <h3>Log In </h3>
          </div>
          <form className="loginForm">
          <p>Login or signup using Gmail</p>
            <input
              type="text"
              placeholder="Email"
              id="email"
              value={gmail}
              onChange={(e) => {setGmail(e.target.value)}}
              required
            />
            <button type="button" onClick={verification} onKeyDown={e => e.key === 'Enter' ? verification: ''}>Continue</button>
          </form>
        </div>
      </div>

      <div className="topPart">
        <img src="./src/assets/bgPic1.jpg" alt="" className="bigPicture1" />
        <img src="./src/assets/bgPic2.jpg" alt="" className="bigPicture2" />
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

      <div className={styles.container}>
        <Slide easing="ease">
          {storageItems.map((slide, index) => (
            <div className={styles.slide} key={slide}>
              <div
                style={{ backgroundImage: `url(${slideImages[index]})` }}
              >
                <span>Slide {index + 1}</span>
              </div>
            </div>
          ))}
        </Slide>
      </div>



      {/*

<Slide easing="ease" slidesToShow={3}> 
  {slideImages.map((image, index) => (
    <div className={styles.slide} key={index}>
      <img 
        src={image} 
        alt={`Slide ${index + 1}`} 
        style={{ width: "100%", height: "300px", objectFit: "cover" }}
      />
    </div>
  ))}
</Slide>

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
      
      */}

      <div className="midPart">
        <div className="line"></div>
        <h2>POPULAR</h2>
      </div>

      <div className="popular">
        <Link
          to="/serenShop/shop" state={{id: 1}}
        >
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link
          to="/serenShop/shop" state={{id: 2}}
        >
          <img
            src="./src/assets/whiteShirt.jpg"
            alt="white shirt"
            className="popularImg"
          />
        </Link>
        <Link
          to="/serenShop/shop" state={{id: 3}}
        >
          <img
            src="./src/assets/blackCroppedShirt.jpg"
            alt="black cropped shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/serenShop/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/serenShop/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/serenShop/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/serenShop/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/serenShop/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/serenShop/shop">
          <img
            src="./src/assets/brownShirt.jpg"
            alt="brown shirt"
            className="popularImg"
          />
        </Link>
        <Link to="/serenShop/shop">
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
            <a className="footerText" href="">Om SerenShop</a>
          </li>
        </ul>
        <ul>
          <li>
            <a className="footerText" href="">Contact us</a>
          </li>
        </ul>
        <ul>
          <li>
            <a className="footerText" href="">Help</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Home;
