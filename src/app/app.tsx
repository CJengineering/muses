// eslint-disable-next-line @typescript-eslint/no-unused-vars
import BasicTable from './table/basictable';
import styles from './app.module.css';
import HelloButton from './hello-button/hello-button';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NxWelcome from './nx-welcome';
import SignIn from './sign-in/sign-in';
import { AuthContext, AuthProvider } from './AuthContext';
import { useContext } from 'react';
import StickyHeadTable from './stickyheadtable';
import { TestTabs } from './testtabs';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AlertArticle from './alertArticle';

import SideNavBar from './sidenavbar';
import GoogleSearch from './googlesearch';
import BingNews from './bingnews';
import Home from './home';

export function App() {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();



  return (
    <>
  
       <Routes>
            <Route path="/signin" element={<SignIn />} />
            </Routes>
      {authenticated ? 
          (<>
          <SideNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/google-alerts" element={<TestTabs />} />
            <Route path="/google-search" element={<GoogleSearch />} />
            <Route path="/bing-news" element={<BingNews />} />
            <Route path="/articles/:id" element={<AlertArticle />} />

          </Routes>
          </>
          )
        : navigate('/signin')  }
      
    </>
  );
}

export default App;
