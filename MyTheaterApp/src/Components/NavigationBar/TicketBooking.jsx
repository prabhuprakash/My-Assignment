import { useQuery } from "@tanstack/react-query";
import React, { useReducer } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Select = styled.select`
  display: block;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
`;

const Theater = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const Section = styled.div`
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 10px;
`;

const SectionTitle = styled.h4`
  text-align: center;
  margin-bottom: 10px;
`;

const Seats = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 5px;
`;

const SeatButton = styled.button`
  background-color: ${(props) =>
    props.purchased ? "#e74c3c" : props.selected ? "#2ecc71" : "#7f8c8d"};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: ${(props) => (props.purchased ? "not-allowed" : "pointer")};
  width: 50px;
  height: 50px;
  font-size: 14px;
  pointer-events: ${(props) => (props.purchased ? "none" : "auto")};

  &:hover {
    background-color: ${(props) =>
      props.purchased ? "#c0392b" : props.selected ? "#27ae60" : "#95a5a6"};
  }
`;

const SelectedSeatsContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const SelectedSeatsList = styled.div`
  margin-top: 10px;
  font-size: 16px;
`;

const BuyTicketsButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const seatReducer = (seatState, action) => {
  switch (action.type) {
    case "toggleOn":
      if (!seatState.selectedSeats.includes(action.value)) {
        return {
          ...seatState,
          selectedSeats: [...seatState.selectedSeats, action.value],
        };
      }
      return seatState;
    case "toggleOff":
      return {
        ...seatState,
        selectedSeats: seatState.selectedSeats.filter(
          (seat) => seat !== action.value
        )
      };
    case "purchase":
      return {
        ...seatState,
        purchasedSeats: [
          ...seatState.purchasedSeats,
          ...seatState.selectedSeats
        ],
        selectedSeats: [],
      };
    default:
      return seatState;
  }
};

const TicketBooking = () => {
  const [seatState, dispatchSeatState] = useReducer(seatReducer, {
    selectedSeats: [],
    purchasedSeats: [],
  });

  const sections = ["A", "B", "C", "D"];
  const seatsPerSection = 60;

  const fetchPopularMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTUyZWMyMGZlOWUxYTkzMzIzOTQwNzFmMzg2YTNmOCIsIm5iZiI6MTczNDc1MjI1Ny4xMzQsInN1YiI6IjY3NjYzODAxNmNlYmE4MjliOTc0YjQyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s8XtBP1-lD9E6BgnaruBBzKWU92bQI_weSQNhDvX7a8" // Replace 'YOUR_API_KEY' with your actual API key
      },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  };
  const movielist = useQuery({
    queryKey: ["movie"],
    queryFn: fetchPopularMovies,
    enabled: true,
  });

  return (
    <Container>
      {movielist.isLoading && <p>Loading Movies...</p>}
      {movielist.error && <p>Error: {movielist.error.message}</p>}
      {movielist.data &&
      movielist.data.results &&
      movielist.data.results.length > 0 ? (
        <Select name="movies">
          {movielist.data.results.map((movie) => (
            <Option value={movie.title}></Option>
          ))}
        </Select>
      ) : (
        !movielist.isLoading && <p>No movies found.</p>
      )}
      <Theater>
        {sections.map((section) => (
          <Section key={section}>
            <SectionTitle>Section {section}</SectionTitle>
            <Seats>
              {Array.from({ length: seatsPerSection }, (_, i) => i + 1).map(
                (seat) => {
                  const seatId = `${section}${seat}`;
                  return (
                    <SeatButton
                      key={seatId}
                      selected={seatState.selectedSeats.includes(seatId)}
                      purchased={seatState.purchasedSeats.includes(seatId)}
                      onClick={() =>
                        dispatchSeatState({
                          type: seatState.selectedSeats.includes(seatId)
                            ? "toggleOff"
                            : "toggleOn",
                          value: seatId,
                        })
                      }
                    >
                      {seatId}
                    </SeatButton>
                  );
                }
              )}
            </Seats>
          </Section>
        ))}
      </Theater>

      <SelectedSeatsContainer>
        <h3>Selected Seats:</h3>
        <SelectedSeatsList>
          {seatState.selectedSeats.length > 0
            ? seatState.selectedSeats.join(", ")
            : "None"}
        </SelectedSeatsList>
        <BuyTicketsButton
          onClick={() => dispatchSeatState({ type: "purchase" })}
          disabled={seatState.selectedSeats.length === 0}
        >
          Buy Tickets
        </BuyTicketsButton>
      </SelectedSeatsContainer>
    </Container>
  );
};

export default TicketBooking;