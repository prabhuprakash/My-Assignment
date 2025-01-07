import { createBrowserRouter } from "react-router-dom";
import Contents from "../Components/Contents/Contents";
import CarRents from "../Pages/CarRents";
import Home from "../Pages/Home";
import RentedCars from "../Pages/RentedCars";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Contents />,
    children: [
      { index: true, element: <Home /> }, // Default route (renders for "/")
      { path: "carRents", element: <CarRents /> },
      { path: "rentedCars", element: <RentedCars /> }, // Updated to lowercase and kebab-case
    ],
  },
]);

export default router;
