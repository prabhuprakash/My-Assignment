import { useQuery } from "@tanstack/react-query";
import { Alert, Carousel, Layout, Spin } from "antd";
import styled from "styled-components";

const { Content } = Layout;

// Styled content for the layout
const StyledContent = styled(Content)`
  position: fixed;
  padding: 50px 20px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow-y: hidden;
  max-height: calc(100vh - 64px); // Ensure content area does not overlap with the fixed header
  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

// Styled Carousel component
const StyledCarousel = styled(Carousel)`
background-color:  #364d79;
  width: 100%;
  height:300px;
  max-width: 1200px;  // Limit the carousel width to 1200px
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  .slick-slide {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }

  .slick-prev, .slick-next {
    z-index: 1;  // Ensure arrows are visible on top of content
    color: #ffffff;
  }

  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: 10px;
  }
`;

// Styled div for carousel item (not a card, just a simple div styled)
const CarouselItem = styled.div`
  width: 100%;
  height: 100%;
  padding-top:125px;
  background-color: #364d79;
  color: white;
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin: 0;
  text-align: center;  // Centers the text horizontally
  font-size: 24px;     // Adjust the font size as per your preference
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
    queryKey: ['topcars'],
    queryFn: fetchTopCars,
    enabled: true,
  });

  if (isLoading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message="Error" description="Failed to load top cars." type="error" />;
  }

  // Ensure data is available before rendering the carousel
  if (!data || data.length === 0) {
    return <Alert message="No Data" description="No top cars available at the moment." type="warning" />;
  }

  return (
    <StyledContent>
      <StyledCarousel autoplay autoplaySpeed={3000} arrows infinite>
        {data?.map((car) => (
          <div key={`${car.brand}-${car.model}`}>
            <CarouselItem>
              
                {car.brand} - {car.model}
              
            </CarouselItem>
          </div>
        ))}
      </StyledCarousel>
    </StyledContent>
  );
}
