import * as React from 'react';
import Home from '../home';

import { Grid, Box, Stack,  } from '@mui/material';
const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

const Header = () => {
  
  return(
    <Stack sx={{    
      width:'60vh',
      boxShadow: '2px 2px 2px 1px rgb(0 0 0 / 20%)',
      borderRadius: '0 0 40px 0',
      height: '15vh',
      alignItems: 'center'
      }}>
      <Box
        component="img"
        sx={{
        padding: '10px',
        textAlign: 'center',
        width: '250px',
        height: 'auto',
        margin: 'auto',
        }}
        alt="logo"
        src="/img/logo.png"
      />
      
    </Stack>
    
  )
};

export default Header;