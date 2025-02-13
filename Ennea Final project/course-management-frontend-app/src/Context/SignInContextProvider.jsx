import React, { createContext, useState } from "react";
export const SignInContext = createContext();


const SignInContextProvider = ({ children }) => {
  const [SignInState, setSignInState] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  return (
    <SignInContext.Provider value={{ SignInState, setSignInState, enrolledCourses, setEnrolledCourses }}>
      {children}
    </SignInContext.Provider>
  );
};
export default SignInContextProvider;
