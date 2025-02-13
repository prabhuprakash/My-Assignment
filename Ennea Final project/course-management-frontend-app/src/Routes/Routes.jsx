import { createBrowserRouter } from "react-router-dom";
import ContentBody from "../Components/ContentBody";
import Courses from "../Pages/Content/Courses";
import UserProfile from "../Pages/Content/UserProfile";
import ProfilesManager from "../Pages/Content/ProfilesManager";
import CoursesManagement from "../Pages/Content/CoursesManagement";
import CoursesEnrollment from "../Pages/Content/CoursesEnrollment";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ContentBody />,
    children: [
      { index: true, element: <Courses />},
      { path: "coursesmanagement", element: <CoursesManagement/>},
      { path: "coursesenrollment", element: <CoursesEnrollment/> },
      { path: "userprofile", element: <UserProfile /> },
      { path: "profilesmanager", element: <ProfilesManager/>}
    ],
  },
]);

export default router;
