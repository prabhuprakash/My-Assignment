import {Header} from './Components/Header/Header.jsx';
import TaskHandler from './Components/TaskHandler/TaskHandler.jsx';
import { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-image: url('/image1.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 100vh; 
        overflow-y: auto;
        color: #333;
    }
`;

const queryClient = new QueryClient();

function App() {
    return (
    <>
        <GlobalStyle />
        <Header />
        <QueryClientProvider client={queryClient}>
            <TaskHandler />
        </QueryClientProvider>
    </>
  );
}

export default App;
