import {Header} from './Components/Header/Header.jsx';
import TaskHandler from './Components/TaskHandler/TaskHandler.jsx';
import TaskNamesContextProvider from './Context/TaskNamesProvider.jsx';
import { createGlobalStyle } from 'styled-components';

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
function App() {
    return (
    <TaskNamesContextProvider>
        <GlobalStyle />
        <Header />
        <TaskHandler />
    </TaskNamesContextProvider>
  );
}

export default App;
