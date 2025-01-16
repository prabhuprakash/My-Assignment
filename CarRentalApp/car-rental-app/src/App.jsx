
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled, { createGlobalStyle } from "styled-components";

import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";

import TopBar from "./Components/TopBar/TopBar";

import { Layout } from "antd";
import LogInContextProvider from "./Context/LoginContextProvider";


const { Header,  Content } = Layout;
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

const AppLayout = styled(Layout)`
  
`;

const AppHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const AppLayout2 = styled(Layout)`
  position:fixed;
  top:64px;
  left:0;
  right:0;
`

function App() {
  return (
    <>
      <GlobalStyle />
      <LogInContextProvider>
      <AppLayout>
        <AppHeader>
          <TopBar />
        </AppHeader> 
        <AppLayout2>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        </QueryClientProvider>
        </AppLayout2>
      
      </AppLayout>
      </LogInContextProvider>
     
    </>
  );
}

export default App;
