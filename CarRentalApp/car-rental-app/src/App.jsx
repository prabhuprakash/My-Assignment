
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled, { createGlobalStyle } from "styled-components";

import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";

import TopBar from "./Components/TopBar/TopBar";

import { Layout } from "antd";
import LogInContextProvider from "./Context/LoginContextProvider";


const { Header, Footer, Content } = Layout;
const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  #root {
    height: 100%;
  }
`;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;
const StyledContent = styled(Content)`
position:fixed;
left:0;
right:0;
  top: 64px; /* Header height */
  bottom: 65px; /* Footer height */
  flex: 1; /* Makes content take the available space */
`;

const StyledFooter = styled(Footer)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #001529;
  color: white;
  text-align: center;
  height: 65px; /* Set footer height */
  line-height: 20px; /* Aligns text vertically */
`;


function App() {
  return (
    <>
      <GlobalStyle />
      <LogInContextProvider>
      <StyledLayout>
        <StyledHeader>
          <TopBar />
        </StyledHeader> 
        
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        </QueryClientProvider>
       
      
      </StyledLayout>
      </LogInContextProvider>
     
    </>
  );
}

export default App;
