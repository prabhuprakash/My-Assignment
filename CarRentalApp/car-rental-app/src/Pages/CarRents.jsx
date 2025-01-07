import { Button, Card, Flex, Form, Input, Layout, message, Modal, Select, Typography } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LogInContext } from '../Context/LoginContextProvider';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const StyledHeader = styled(Header)`
  position: fixed;
  margin-top: 0px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e0e0e0;
  z-index: 1;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: 16px;
  }

  .title {
    font-size: 28px;
    color: #333;
    margin: 0;
    font-weight: 600;
  }

  .filters {
    display: flex;
    gap: 16px;
    flex-grow: 1;

    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
      align-items: flex-start;
    }
  }

  .reset-button {
    align-self: center;
    @media (max-width: 768px) {
      margin-left: 0;
      margin-top: 16px;
    }
  }
`;

const StyledContent = styled(Content)`
  position: fixed;
  padding-top: 65px;
  width: 100%;
  background-color: #f9f9f9;
  display: flex;
  
  overflow-y: auto;
  max-height: calc(100vh - 64px);
  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const CarCard = styled(Card)`
  width: 300px;
  margin: 10px;
  border-radius: 12px;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 8px;
`;

const StyledFlex = styled(Flex)`
  top: 150;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CarRentals = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({ brands: [], colors: [], types: [], models: [] });
  const [selectedFilters, setSelectedFilters] = useState({
    brand: '',
    model: '',
    color: '',
    type: '',
  });
  const [hasWarned, setHasWarned] = useState(false); // Track warning state
  const [isRenting, setIsRenting] = useState(null); // State to track which car is being rented
  const [loading, setLoading] = useState(false);
  const [isAddCarModalVisible, setIsAddCarModalVisible] = useState(false); // Add Car Modal State
  const [newCar, setNewCar] = useState({}); // State to store new car data

  const { logInState } = useContext(LogInContext);

  // Fetching cars data and filters
  const fetchCarsData = useCallback(async () => {
    try {
      const filtersResponse = await fetch('http://localhost:5000/api/cars/filters');
      const filtersData = await filtersResponse.json();
      setFilters(filtersData);

      // Fetch cars with selected filters
      let query = '';
      Object.keys(selectedFilters).forEach((key) => {
        if (selectedFilters[key]) {
          query += `${key}=${selectedFilters[key]}&`;
        }
      });

      const carsResponse = await fetch(`http://localhost:5000/api/cars?${query}`);
      const carsData = await carsResponse.json();
      setCars(carsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [selectedFilters]);

  useEffect(() => {
    if (logInState.type === "LogIn") {
      fetchCarsData();
    } else {
      if (!hasWarned) {
        message.warning("You need to login.");
        setHasWarned(true); // Ensure the warning shows only once
      }
    }
  }, [logInState, fetchCarsData, hasWarned]);

  const handleFilterChange = (filterKey, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };
  const handleAddCar = () => {
    setIsAddCarModalVisible(true);
  };

  const handleAddCarSubmit = async (values) => {
    if (!values.brand || !values.model || !values.carID || !values.color || !values.type) {
      message.error('Please fill in all the fields.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (response.ok) {
        message.success('Car added successfully!');
        fetchCarsData(); // Refresh the cars list
        setIsAddCarModalVisible(false); // Close the modal
      } else {
        message.error(result.message || 'Failed to add car');
      }
    } catch (error) {
      message.error('Error adding car');
      console.error(error);
    }
  };
  

  const handleAddCarCancel = () => {
    setIsAddCarModalVisible(false);
  };
  const handleDelete = async (car) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cars/${car.carID}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        message.success(`${car.brand} ${car.model} has been deleted.`);
        fetchCarsData(); // Refresh the cars list
      } else {
        message.error('Failed to delete the car.');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      message.error('Error deleting the car.');
    }
  };

  const handleRentClick = (car) => {
    setIsRenting(car);
    // Open confirmation modal
    Modal.confirm({
      title: 'Confirm Rent',
      content: `Do you want to rent ${car.brand} ${car.model}?`,
      onOk: () => handleConfirmRent(car),
    });
  };

  const handleConfirmRent = async (car) => {
    setLoading(true);

    try {
      // Add the car to the user's orders in the server
      const response = await fetch('http://localhost:5000/api/users/addToOrders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: logInState.name, carId: car.carID }),
        
      });
      console.log(logInState.name)
      const result = await response.json();
      if (response.ok) {
        message.success(`Successfully rented ${car.brand} ${car.model}`);
        // You may want to refetch the data to update available cars and orders
        fetchCarsData();
      } else {
        message.error(result.message || 'Failed to rent the car');
      }
    } catch (error) {
      message.error('Error renting the car');
      console.error(error);
    } finally {
      setLoading(false);
      setIsRenting(null); // Reset renting state
    }
  };

  if (logInState.type !== "LogIn") {
    return null; // Don't render the component if not logged in
  }

  return (
    <>
      <StyledHeader>
        <Title className="title" level={2}>
          Car Rentals
        </Title>
        <div className="filters">
          <Select
            placeholder="Select Brand"
            onChange={(value) => handleFilterChange('brand', value)}
            style={{ width: 200 }}
            value={selectedFilters.brand}
          >
            <Option value="">All Brands</Option>
            {filters.brands.map((brand, index) => (
              <Option key={index} value={brand}>
                {brand}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Select Model"
            onChange={(value) => handleFilterChange('model', value)}
            style={{ width: 200 }}
            value={selectedFilters.model}
          >
            <Option value="">All Models</Option>
            {filters.models.map((model, index) => (
              <Option key={index} value={model}>
                {model}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Select Color"
            onChange={(value) => handleFilterChange('color', value)}
            style={{ width: 200 }}
            value={selectedFilters.color}
          >
            <Option value="">All Colors</Option>
            {filters.colors.map((color, index) => (
              <Option key={index} value={color}>
                {color}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Select Type"
            onChange={(value) => handleFilterChange('type', value)}
            style={{ width: 200 }}
            value={selectedFilters.type}
          >
            <Option value="">All Types</Option>
            {filters.types.map((type, index) => (
              <Option key={index} value={type}>
                {type}
              </Option>
            ))}
          </Select>

          <Button
            className="reset-button"
            onClick={() => setSelectedFilters({ brand: '', model: '', color: '', type: '' })}
            type="primary"
          >
            Reset Filters
          </Button>
          {logInState.role === "admin" && <Button onClick={handleAddCar}>Add Car</Button>}
          
        </div>
      </StyledHeader>

      <StyledContent>
        <StyledFlex>
          {cars.length > 0 ? (
            cars.map((car, index) => (
              <CarCard key={index} hoverable cover={<CarImage src={`https://via.placeholder.com/300x200?text=${car.brand}`} />}>
                <Title level={4}>
                  {car.brand} {car.model}
                </Title>
                <Text>Color: {car.color}</Text>
                <br />
                <Text>Type: {car.type}</Text>
                <br />
                <Text>Status: {car.status ? 'Available' : 'Unavailable'}</Text>
                <br />
                {logInState.role==="admin"?(<Button
                  type="primary"
                  onClick={() => handleDelete(car)}
                >
                  Delete
                </Button>):(<Button
                  type="primary"
                  disabled={!car.status} // Disable if car is not available
                  loading={isRenting?.id === car.id && loading}
                  onClick={() => handleRentClick(car)}
                >
                  Rent
                </Button>)}
                
              </CarCard>
            ))
          ) : (
            <Text>No cars found</Text>
          )}
        </StyledFlex>
      </StyledContent>
      <Modal
  title="Add New Car"
  open={isAddCarModalVisible}
  onOk={() => handleAddCarSubmit(newCar)}
  onCancel={handleAddCarCancel}
>
  <Form layout="vertical">
    <Form.Item label="Brand">
      <Input onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })} />
    </Form.Item>
    <Form.Item label="Model">
      <Input onChange={(e) => setNewCar({ ...newCar, model: e.target.value })} />
    </Form.Item>
    <Form.Item label="Car ID">
      <Input onChange={(e) => setNewCar({ ...newCar, carID: e.target.value })} />
    </Form.Item>
    <Form.Item label="Color">
      <Input onChange={(e) => setNewCar({ ...newCar, color: e.target.value })} />
    </Form.Item>
    <Form.Item label="Type">
      <Input onChange={(e) => setNewCar({ ...newCar, type: e.target.value })} />
    </Form.Item>
  </Form>
</Modal>

    </>
  );
};

export default CarRentals;
