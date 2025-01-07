import React, { useEffect, useReducer } from "react";
export const LogInContext = React.createContext();

function reducer(logInState, action) {
  switch (action.type) {
    case "LogIn":
      return { type: "LogIn", name: action.name,role:action.role };
    case "LogOut":
      return { type: "LogOut", name: "" ,role:""};
    default:
      return logInState;
  }
}
const LogInContextProvider = ({ children }) => {
  const [logInState, dispatchLogIn] = useReducer(reducer, {
    type: "LogOut",
    name: "",
    role:"",
  });
  useEffect(()=>{
    
  },[]);
  
  return (
    <LogInContext.Provider value={{ logInState, dispatchLogIn }}>
      {children}
    </LogInContext.Provider>
  );
};
export default LogInContextProvider;
