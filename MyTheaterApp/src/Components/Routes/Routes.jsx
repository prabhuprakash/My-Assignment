import { createBrowserRouter } from "react-router-dom";
import MovieSearch from "../NavigationBar/MovieSearch";
import NavigationBar from "../NavigationBar/NavigationBar";
import PopularMovies from "../NavigationBar/PopularMovies";
import TicketBooking from "../NavigationBar/TicketBooking";
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    children: [
      { index: true, element: <MovieSearch /> },
      { path: "PopularMovies", element: <PopularMovies /> },
      { path: "TicketBooking", element: <TicketBooking /> },
    ],
  },
]);
export default router;
