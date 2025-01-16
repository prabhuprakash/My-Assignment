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
    orderDate: new Date().toISOString().split('T')[0],
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
// Combined route for car data with multiple selects for filters
app.get('/api/cars', (req, res) => {
  const filters = req.query; // Extract all query parameters
  let filteredCars = readCars(); // Read cars from JSON file

  // Dynamically apply filters based on query parameters
  filteredCars = filteredCars.filter(car => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // Skip keys with empty values (e.g., trailing '&')

      if (key === 'status') {
        // Special handling for boolean 'status'
        const statusBool = value.toLowerCase() === 'true';
        return car.status === statusBool;
      } else if (key === 'min_ordered') {
        // Special handling for numerical 'min_ordered'
        return car.ordered >= parseInt(value, 10);
      } else if (car[key] !== undefined) {
        // Handle "all" option: Ignore the filter if "all" is selected
        if (value.toLowerCase() === 'all') return true;

        // Handle multiple values for a filter (e.g., "brand=chrysler,dodge")
        const filterValues = value.split(',').map(v => v.toLowerCase());
        return filterValues.includes(car[key].toString().toLowerCase());
      }
      return true; // Ignore unknown filter keys
    });
  });

  res.json(filteredCars);
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

  res.status(200).json({ success: true, message: 'Car returned successfully' , ordersHistory: user.orders });
});

// Endpoint to get  rented cars

app.get('/api/users/rented-cars', (req, res) => {
  const { username, role, startDate, endDate } = req.query;  // Extracting username, role, startDate, and endDate from query parameters
  console.log(username,role,startDate,endDate);
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

    console.log('All Orders for Admin:', allOrdersHistory);

    return res.status(200).json({ ordersHistory: allOrdersHistory });
  }

  // If the role is not admin (i.e., it is 'user'), fetch the specific user's order history
  const user = users.find(user => user.username.toLowerCase() === username.toLowerCase());  // Case insensitive comparison

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  let ordersHistory = user.orders; // Get the orders for the specific user

  // If startDate and endDate are provided, filter by date range
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    ordersHistory = ordersHistory.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= start && orderDate <= end;
    });
  }

  console.log('User Orders:', ordersHistory);

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

// Endpoint to update car data by carID
app.post('/api/cars/update', (req, res) => {
  const { carID, ...updateFields } = req.body; // Extract carID and the fields to update

  if (!carID) {
    return res.status(400).json({ message: 'carID is required' });
  }

  // Read the current cars from the JSON file
  const cars = readCars();

  // Find the car by carID
  const car = cars.find(car => car.carID === carID);

  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }

  // Update the car object with the provided fields
  Object.keys(updateFields).forEach(key => {
    if (car.hasOwnProperty(key)) {
      car[key] = updateFields[key];
    }
  });

  // Write the updated cars array back to the JSON file
  writeCars(cars);

  res.status(200).json({ message: 'Car updated successfully', updatedCar: car });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
