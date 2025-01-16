import { useQuery } from "@tanstack/react-query";
import { Alert, Card, Carousel, Layout, Spin } from "antd";
import styled from "styled-components";

const { Content } = Layout;

const HomeLayout = styled(Layout)`
  background-color: white;
  position: fixed;
  top: 64px;
  left: 200px;
  right: 0;
  bottom: 0;
`;

const HomeContent = styled(Content)`
  position: fixed;
  top: 70px;
  left: 200px;
  right: 0;
  bottom: 0;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 64px);
  overflow-y: auto;

  @media (max-width: 1024px) {
    margin-left: 80px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 16px;
  }
`;

const StyledCarousel = styled(Carousel)`
  background-color: #364d79;
  width: 100%;
  max-width: 1200px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  min-height: 300px;
  

  .slick-slide {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
    color: #ffffff;
  }
`;
const CarCard = styled(Card)`
  width: 100%;
  height: 100%;
  margin-top:10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;

  .ant-card-body {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0; /* Remove default padding */
  }
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image scales properly */
  border-radius: 8px;
`;

// Options for API fetch
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

// Fetch top cars from API
const fetchTopCars = async () => {
  const url = `http://localhost:5000/api/cars/top-ordered`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["topCars"],
    queryFn: fetchTopCars,
    enabled: true,
  });

  // Display loading spinner until data is fully loaded
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  // Display error message if API call fails
  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load top cars."
        type="error"
        showIcon
      />
    );
  }

  // Display warning if no data is returned
  if (!data || data.length === 0) {
    return (
      <Alert
        message="No Data"
        description="No top cars available at the moment."
        type="warning"
        showIcon
      />
    );
  }
  // Render the main content when data is available
  return (
    <HomeLayout>
      <HomeContent>
        <StyledCarousel autoplay autoplaySpeed={3000} arrows infinite>
          {data.map((car) => (
            <CarCard 
              key={`${car.brand}-${car.model}`}  
              cover={<CarImage src={`https://placehold.co/1100x280?text=${car.brand}-${car.model}`} />}>
            </CarCard>
          ))}
        </StyledCarousel>
      </HomeContent>
    </HomeLayout>
  );
}
