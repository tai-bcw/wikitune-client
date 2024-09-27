import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import wikituneLogo from './static/imgs/wikituneLogo_BLBL.svg';
import { Box, Stack } from '@mui/material';

const MobileCheck = () => {
  if (isMobile) {
    return (
      <div>
        This website is optimized for desktop. Please access from a computer for the best experience.
      </div>
    );
  }

  return null; // Or you can render your regular desktop content here
};


function UseDesktopView() {
  return (
    <Box style={{padding:'10px',paddingTop: '30vh', textAlign: "center", textAlign: 'justify', fontSize: '15px'}}>
      <Stack spacing={3}>
      <img src={wikituneLogo} style={{maxHeight: '30px'}}/>
      
      <Box>
        For the best experience using Wikitune Workbench, please use a desktop computer or switch your mobile device to desktop mode.
      </Box>

      <Box>
        We are working to create the best possible mobile experience in the future so please check back and bookmark our socials for up to date news.
      </Box>

      <Box>
        Many apologies for any inconvenience.
      </Box>
      </Stack>
    </Box>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    { !isMobile?
      <BrowserRouter>
        <App />
      </BrowserRouter>
      :
      <UseDesktopView/>
    }
  </React.StrictMode>
);
