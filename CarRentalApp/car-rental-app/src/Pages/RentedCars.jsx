import { Button, Card, DatePicker, Layout, List, message, Spin } from 'antd';
import moment from 'moment'; // For date manipulation
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LogInContext } from '../Context/LoginContextProvider';

const { Content } = Layout;
const { Meta } = Card;
const { RangePicker } = DatePicker;

const StyledContent = styled(Content)`
  position: fixed;
  padding: 50px 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow-y: hidden;
  max-height: calc(100vh - 64px);
  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #1890ff;
`;

const CenteredSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ReturnButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;

const NoCarsMessage = styled.div`
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
  color: #d9d9d9;
`;

const RentedCars = () => {
  const { logInState } = useContext(LogInContext);
  const username = logInState.name;  // Getting username from the logInState
  const role = logInState.role;      // Getting role from the logInState

  const [rentedCars, setRentedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasWarned, setHasWarned] = useState(false);
  const [dateRange, setDateRange] = useState([moment().subtract(7, 'days'), moment()]); // Default to 7 days ago and now

  useEffect(() => {
    if (logInState.type === 'LogIn') {
      let url = `http://localhost:5000/api/users/rented-cars?username=${username}&role=${role}`;
      
      // If the admin has selected a date range, include it in the query
      if (role === 'admin' && dateRange) {
        const startDate = dateRange[0].format('YYYY-MM-DD');
        const endDate = dateRange[1].format('YYYY-MM-DD');
        url += `&startDate=${startDate}&endDate=${endDate}`;
      }
  
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.ordersHistory) {
            setRentedCars(data.ordersHistory);  // Assuming the data has ordersHistory field
          }
          setLoading(false);
        })
        .catch((err) => {
          setError('Error fetching rented cars');
          setLoading(false);
        });
    } else {
      if (!hasWarned) {
        message.warning('You need to login.');
        setHasWarned(true);
      }
      setLoading(false);
    }
  }, [logInState, hasWarned, username, role, dateRange]); // Added dateRange to dependency

  const handleReturnCar = (orderId) => {
    fetch('http://localhost:5000/api/users/return-car', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid: logInState.name, orderId }), // Send userid and orderId
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          message.success('Car returned successfully');
          setRentedCars((prevCars) => prevCars.filter((car) => car.orderId !== orderId)); // Filter by orderId
        } else {
          message.error(data.message || 'Failed to return car');
        }
      })
      .catch((err) => message.error('Error returning car'));
  };

  if (loading) {
    return <CenteredSpinner><Spin size="large" /></CenteredSpinner>;
  }

  if (error) {
    return <PageContainer><div>{error}</div></PageContainer>;
  }

  if (logInState.type !== "LogIn") {
    return null; // Don't render the component if not logged in
  }

  return (
    <StyledContent>
      <Title>{logInState.role === "admin" ? "All Rented Cars" : "Rented Cars"}</Title>
      
      {role === 'admin' && (
        <div style={{ marginBottom: '20px' }}>
          <RangePicker
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
            format="YYYY-MM-DD"
          />
        </div>
      )}
      
      {rentedCars.length === 0 ? (
        <NoCarsMessage>No rented cars found</NoCarsMessage>
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
          dataSource={rentedCars}
          renderItem={(car) => (
            <List.Item key={car.orderId}>
              <Card
                hoverable
                cover={<img alt={car.carModel} src={`https://via.placeholder.com/300?text=${car.carModel}`} />}
              >
                <Meta
                  title={`${car.carBrand} - ${car.carModel}`}
                  description={`Rented on: ${new Date(car.orderDate).toLocaleDateString()}`}
                />
                <div>Order ID: {car.orderId}</div> {/* Display the orderId */}
                {logInState.role !== "admin" && (
                  <ReturnButton
                    type="primary"
                    danger
                    onClick={() => handleReturnCar(car.orderId)}
                  >
                    Return Car
                  </ReturnButton>
                )}
              </Card>
            </List.Item>
          )}
        />
      )}
    </StyledContent>
  );
};

export default RentedCars;
