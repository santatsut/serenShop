const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000; // The same port as your React app or whatever you prefer

app.use(express.json());
app.use(cors());


// Middleware to parse JSON data
app.use(bodyParser.json());

// MySQL connection settings
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123123', // Your MySQL password
  database: 'seren'
};

// Endpoint to add an item to the cart
app.post('/serenShop/cart', async (req, res) => {
  const { image, size, price, name, quantity } = req.body;

  // Create MySQL connection
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log(`Received: ${image} ${size}, ${quantity}, ${price}, ${name}`);
    
    // Insert query to add the cart item
    const query = `INSERT INTO cart (path, size, quantity, price, name) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await connection.execute(query, [image, size, quantity, price, name]);
    
    // Send a success response
    res.status(201).json({ message: 'Item added to cart', id: result.insertId });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

app.get('/serenShop/cartGet', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const query = `SELECT * FROM cart`;
    const [results] = await connection.execute(query);

    res.json(results);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Error fetching cart items', error: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

app.get('/serenShop/storageGet', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const query = `SELECT * FROM storage`;
    const [results] = await connection.execute(query);

    res.json(results);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Error fetching cart items', error: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

app.get('/serenShop/usersGet', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const query = `SELECT gmail, username FROM users`;
    const [results] = await connection.execute(query);

    res.json(results);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Error fetching cart items', error: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

app.post('/serenShop/addUser', async (req, res) => {
  const { gmail, password, username, year } = req.body;
  let connection;
  try {
    console.log('attempting to connect...');
    connection = await mysql.createConnection(dbConfig);
    console.log('connected')
    console.log(`Received: ${gmail}, ${password}, ${username}, ${year}`);
    
    // Insert query to add the cart item
    const query = `INSERT INTO users (gmail, password, username, year) VALUES (?, ?, ?, ?)`;
    const [result] = await connection.execute(query, [gmail, password, username, year]);
    
    // Send a success response
    res.status(201).json({ message: 'added user', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

app.delete('/serenShop/api/cartDelete/:id', async (req, res) => {
  const { id } = req.params;
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log(`Received: ${id}`);
    
    // Delete query to remove the cart item
    const query = `DELETE FROM cart WHERE id =?`;
    await connection.execute(query, [id]);
    
    // Send a success response
    res.status(204).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    res.status(500).json({ message: 'Error deleting item from cart', error: error.message });
  } finally {
    if (connection) await connection.end();
  }
});

// Endpoint to fetch all cart items
app.get('/serenShop/api/data/:id', async (req, res) => {
  const { id } = req.params; // Extract the ID from the URL
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const query = `SELECT id, path, quantity, price, name FROM storage WHERE id = ?`;
    const [results] = await connection.execute(query, [id]);

    if (results.length > 0) {
      const product = results[0];
      return res.json({
        id: product.id,
        image: product.path,
        quantity: product.quantity,
        price: product.price,
        name: product.name,
      }); // Send the response and stop further execution
    } else {
      return res.status(404).json({ message: 'Product not found' }); // Send the response and stop further execution
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ message: 'Error fetching data', error: error.message });
  } finally {
    if (connection) await connection.end();
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
