import React from "react";
import { Container } from '@mui/material';
import  Home  from './components/home'
import  Header  from './components/header'
const App = () => {
  return(
    <React.Fragment>
        {/* <div>Soy un platzinauta</div> */}
        <Header />
        <Home />
    </React.Fragment>
    
  )
};

export default App;