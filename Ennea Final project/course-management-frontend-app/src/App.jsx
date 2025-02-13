import "./App.css";
import styled from "styled-components";
import { Layout } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";

import TopBar from "./Components/TopBar";
import SignInContextProvider from "./Context/SignInContextProvider";

const { Header, Footer, Content } = Layout;

const AppLayout = styled(Layout)`
  min-height: 100vh;
  font-family: inherit;
`;

const AppHeader = styled(Header)`
  position: fixed;
  width: 100%;
  padding: 0 5% 0 3%;
  background-color: #194866;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;

  /* Responsive Font */
  font-size: clamp(14px, 1.2vw, 18px);

  @media (max-width: 768px) {
    padding: 0 2%;
    font-size: 14px;
  }
`;

const AppContent = styled(Content)`
  position: fixed;
  top: 64px;
  width:100%;
  background-color: aliceblue;
  
`;

const AppFooter = styled(Footer)`
  position: fixed;
  bottom: 0px;
  width: 100%;
  text-align: center;
  background-color: #194866;
  color: white;
  padding: 10px;

  /* Responsive Font */
  font-size: clamp(12px, 1vw, 16px);

  @media (max-width: 768px) {
    padding: 5px;
    font-size: 12px;
  }
`;

const queryClient = new QueryClient();

function App() {
  return (
    <SignInContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppLayout>
          <AppHeader>
            <TopBar />
          </AppHeader>
          <AppContent>
          <RouterProvider router={router} />
          </AppContent>
          <AppFooter>© 2025 Your Company</AppFooter>
        </AppLayout>
      </QueryClientProvider>
    </SignInContextProvider>
  );
}

export default App;
