const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const carData = require('./cars.json').cars; // Access the 'cars' array directly

const app = express();
const PORT = 5000;

// Path to the users JSON file
const usersFilePath = './users.json';
const carsFilePath = './cars.json'; // Path to the cars JSON file

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper functions
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data).users;
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

const writeUsers = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify({ users }, null, 2));
  } catch (error) {
    console.error('Error writing to users file:', error);
  }
};

const readCars = () => {
  try {
    const data = fs.readFileSync(carsFilePath);
    return JSON.parse(data).cars;
  } catch (error) {
    console.error('Error reading cars file:', error);
    return [];
  }
};

const writeCars = (cars) => {
  try {
    fs.writeFileSync(carsFilePath, JSON.stringify({ cars }, null, 2));
  } catch (error) {
    console.error('Error writing to cars file:', error);
  }
};

// Endpoint to add car to user's orders
// Endpoint to add car to user's orders
app.post('/api/users/addToOrders', (req, res) => {
  const { userId, carId } = req.body;

  // Read users and cars from the JSON files
  const users = readUsers();
  const cars = readCars();

  // Find the user by userId (assuming username is unique)
  const user = users.find(user => user.username === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Find the car by carID
  const car = cars.find(car => car.carID === carId);

  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }

  if (!car.status) {
    return res.status(400).json({ message: 'Car is already rented' });
  }

  // Generate a unique order ID (timestamp-based or random)
  const orderId = `order-${Date.now()}`;  // Generates a unique ID based on the current timestamp

  // Create the order
  const newOrder = {
    orderId,           // New orderId field
    carId: car.carID,
    carBrand: car.brand,
    carModel: car.model,
    orderDate: new Date().toISOString(),
    returnStatus: false // Initially set to false because the car is not returned yet
  };

  // Add the car to the user's orders
  user.orders.push(newOrder);

  // Update the car's status and increment the "ordered" count
  car.status = false;
  car.ordered += 1;

  // Write the updated users and cars data back to the JSON files
  writeUsers(users);
  writeCars(cars);

  res.status(200).json({ message: 'Car successfully rented', order: newOrder });
});

// Combined route for car data with all filters
app.get('/api/cars', (req, res) => {
  const { brand, model, color, type, status, min_ordered } = req.query;

  let filteredCars = readCars();

  // Apply filters based on query parameters
  if (brand) {
    filteredCars = filteredCars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
  }

  if (model) {
    filteredCars = filteredCars.filter(car => car.model.toLowerCase() === model.toLowerCase());
  }

  if (color) {
    filteredCars = filteredCars.filter(car => car.color.toLowerCase() === color.toLowerCase());
  }

  if (type) {
    filteredCars = filteredCars.filter(car => car.type.toLowerCase() === type.toLowerCase());
  }

  if (status) {
    const statusBool = status.toLowerCase() === 'true';
    filteredCars = filteredCars.filter(car => car.status === statusBool);
  }

  if (min_ordered) {
    filteredCars = filteredCars.filter(car => car.ordered >= parseInt(min_ordered, 10));
  }

  // Return the filtered cars
  res.json(filteredCars);
});

// Get car data by brand
app.get('/api/cars/brands/:brand', (req, res) => {
  const brand = req.params.brand.toLowerCase();
  const carsByBrand = readCars().filter(car => car.brand.toLowerCase() === brand);

  if (carsByBrand.length > 0) {
    res.json(carsByBrand);
  } else {
    res.status(404).json({ error: 'Brand not found' });
  }
});

// Get car data by model
app.get('/api/cars/models/:model', (req, res) => {
  const model = req.params.model.toLowerCase();
  const carsByModel = readCars().filter(car => car.model.toLowerCase() === model);

  if (carsByModel.length > 0) {
    res.json(carsByModel);
  } else {
    res.status(404).json({ error: 'Model not found' });
  }
});

// Get top ordered cars
app.get('/api/cars/top-ordered', (req, res) => {
  const sortedCars = [...readCars()].sort((a, b) => b.ordered - a.ordered);

  const topOrderedCars = sortedCars.slice(0, 3).map(car => ({
    brand: car.brand,
    model: car.model,
  }));

  res.json(topOrderedCars);
});

// Get unique values for filters
app.get('/api/cars/filters', (req, res) => {
  const cars = readCars();
  const filters = {
    brands: [...new Set(cars.map(car => car.brand.toLowerCase()))],
    colors: [...new Set(cars.map(car => car.color.toLowerCase()))],
    types: [...new Set(cars.map(car => car.type.toLowerCase()))],
    models: [...new Set(cars.map(car => car.model.toLowerCase()))],
  };

  res.json(filters);
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const users = readUsers();

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    const isAdmin = user.role === 'admin'; // Assuming `role` is a property in the `users.json`
    res.status(200).json({ 
      message: 'Login successful', 
      user: { 
        username: user.username, 
        role: isAdmin ? 'admin' : 'user' 
      } 
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Create account endpoint
app.post('/create-account', (req, res) => {
  const { username, password, mobile } = req.body;

  const users = readUsers();

  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser = { username, password, mobile,role:"user", orders: [] };

  users.push(newUser);

  writeUsers(users);

  res.status(201).json({ message: 'Account created successfully', user: newUser });
});

// Endpoint to handle car return
app.post('/api/users/return-car', (req, res) => {
  const { userid, orderId } = req.body;

  const users = readUsers();
  const cars = readCars();

  // Find the user by username
  const user = users.find(user => user.username === userid);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Find the order by orderId
  const order = user.orders.find(order => order.orderId === orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  // Find the car by carId
  const car = cars.find(car => car.carID === order.carId);
  if (!car) {
    return res.status(404).json({ success: false, message: 'Car not found' });
  }

  // Update the order's return status and car's availability
  order.returnStatus = true;
  car.status = true;

  // Write updated data back to JSON files
  writeUsers(users);
  writeCars(cars);

  res.status(200).json({ success: true, message: 'Car returned successfully' });
});

// Endpoint to get a user's rented cars
// Endpoint to get a user's rented cars
// Endpoint to get rented cars
// Endpoint to get rented cars history
// Endpoint to get rented cars history with date filtering
app.get('/api/users/rented-cars', (req, res) => {
  const { username, role, startDate, endDate } = req.query;  // Extracting username, role, startDate, and endDate from query parameters

  // Read users from the JSON file
  const users = readUsers();

  if (role === 'admin') {
    // If the user is an admin, return all orders from all users (both rented and returned)
    let allOrdersHistory = users
      .flatMap(user => user.orders.map(order => ({
        ...order,
        username: user.username  // Include the username to identify the user
      })));

    // If startDate and endDate are provided, filter by date range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      allOrdersHistory = allOrdersHistory.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= start && orderDate <= end;
      });
    }

    return res.status(200).json({ ordersHistory: allOrdersHistory });
  }

  // If the role is not admin, fetch the specific user's order history
  const user = users.find(user => user.username.toLowerCase() === username.toLowerCase());  // Case insensitive comparison

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  let ordersHistory = user.orders;

  // If startDate and endDate are provided, filter by date range
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    ordersHistory = ordersHistory.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= start && orderDate <= end;
    });
  }

  // Return the user's order history (all orders, including those that are returned)
  res.status(200).json({ ordersHistory });
});


// Endpoint to delete a car by carID
app.delete('/api/cars/:carID', (req, res) => {
  const { carID } = req.params;

  // Read cars from the JSON file
  const cars = readCars();

  // Find the index of the car to be deleted
  const carIndex = cars.findIndex(car => car.carID === carID);

  if (carIndex === -1) {
    return res.status(404).json({ message: 'Car not found' });
  }

  // Remove the car from the array
  const deletedCar = cars.splice(carIndex, 1)[0];

  // Write the updated cars array back to the JSON file
  writeCars(cars);

  res.status(200).json({ message: 'Car deleted successfully', deletedCar });
});

// Endpoint to add a new car
app.post('/api/cars', (req, res) => {
  const { carID, brand, model, color, type, status = true, ordered = 0 } = req.body;

  // Read the current cars from the JSON file
  const cars = readCars();

  // Check if the carID already exists
  if (cars.some(car => car.carID === carID)) {
    return res.status(400).json({ message: 'Car with this ID already exists' });
  }

  // Create a new car object
  const newCar = { carID, brand, model, color, type, status, ordered };

  // Add the new car to the array
  cars.push(newCar);

  // Write the updated cars array back to the JSON file
  writeCars(cars);

  res.status(201).json({ message: 'Car added successfully', newCar });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
