import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import HomePage from './Components/Pages/homePage';
import theme from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <HomePage/>
        </ThemeProvider>
    );
}

export default App;
