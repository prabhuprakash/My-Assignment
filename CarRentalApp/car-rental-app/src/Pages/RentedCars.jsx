import { Button, Card, DatePicker, Flex, Layout, message, Spin, Typography } from 'antd';
import dayjs from 'dayjs'; // Importing dayjs
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LogInContext } from '../Context/LoginContextProvider';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const RentedCarsLayout =styled(Layout)`
  
`;

const RentedCarsHeader = styled(Header)`
  position: fixed;
  margin-top: 0px;
  background: #ffffff;
  display: flex;
  justify-content: space-evenly;
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
`;

const RentedCarsContent = styled(Content)`
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

const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CenteredSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  margin-bottom: 5px;
  border-radius: 8px;
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
  const [dateRange, setDateRange] = useState([dayjs().subtract(7, 'days'), dayjs()]); // Default to 7 days ago and now

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
          setRentedCars(data.ordersHistory); // Filter by orderId
        } else {
          message.error(data.message || 'Failed to return car');
        }
      })
      .catch((err) => message.error('Error returning car'));
  };

  const disabledDate = (current) => {
    // Disable dates after the selected end date
    return current && current.isAfter(dateRange[1], 'day');
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
    <RentedCarsLayout>
      <RentedCarsHeader>
        <Title level={2}>{logInState.role === "admin" ? "All Rented Cars" : "Rented Cars"}</Title>
        <RangePicker
  value={dateRange}
  onChange={(dates) => setDateRange(dates)}
  format="YYYY-MM-DD"
  disabledDate={(current) => current && current > dayjs().endOf('day')} // Disable dates beyond today
/>
      </RentedCarsHeader>
      <RentedCarsContent>
        {rentedCars.length === 0 ? (
          <NoCarsMessage>No rented cars found</NoCarsMessage>
        ) : (
          <Flex wrap="wrap" gap="16px" justify="start">
            {rentedCars.map((car, index) => (
              <CarCard key={index} hoverable cover={<CarImage src={`https://placehold.co/300x200?text=${car.carBrand}`} />}>
                <Title level={4}>{car.carBrand} - {car.carModel}</Title>
                {logInState.role === "admin" &&<Text>User Name: {car.username}</Text>}              
                <br />
                <Text>Rented on: {dayjs(car.orderDate).format('YYYY-MM-DD')}</Text>
                <br />
                <Text>Order ID: {car.orderId}</Text>
                <br />
                <Text>Status: {car.returnStatus ? "Returned" : "Not Returned"}</Text>
                <br />
                {logInState.role !== "admin" && !car.returnStatus && (
                  <Button type="primary" danger onClick={() => handleReturnCar(car.orderId)}>
                    Return Car
                  </Button>
                )}
              </CarCard>
            ))}
          </Flex>
        )}
      </RentedCarsContent>
    </RentedCarsLayout>
  );
};

export default RentedCars;
