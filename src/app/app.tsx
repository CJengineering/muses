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
import {
  Route,
  Routes,
  useNavigate,
  Navigate,
  useParams,
} from 'react-router-dom';
import AlertArticle from './alertArticle';

import SideNavBar from './sidenavbar';
import GoogleSearch from './googlesearch';
import BingNews from './bingnews';
import Home from './home';
import KeyWordTable from './keywordtab';
import Keyword from './keyword';
import GoogleSearchArticle from './googleSearchArticle';
import BingArticle from './bingNewsArticle';
import Main from './newComponents/Main';
import NavMenu from './newComponents/NavBar/NavMenu';
import TableKeyword from './newComponents/TabComponent/TableKeyword';
import { ToastContainer } from 'react-toastify';

export function App() {
  const { authenticated } = useContext(AuthContext);

  return (
    <>
      {authenticated ? (
        <>
          <div className='initial-full-screen-wrapper' >
            {/*<SideNavBar />*/}
            <NavMenu/>

            <Routes>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/keywords" element={<TableKeyword/>} />
              <Route path="/keywords-beta/:id" element={<Main />} />
              <Route path="/" element={<Main />} />
              <Route path="/news/:urlKey" element={<TestTabs />} />
              <Route path="/keywords" element={<KeyWordTable />} />
              <Route path="/google-alerts/:id" element={<AlertArticle />} />
              <Route path="/keyword/:id" element={<Keyword />} />
              <Route
                path="/google-search/:id"
                element={<GoogleSearchArticle />}
              />
              <Route path="/bing-news/:id" element={<BingArticle />} />
            </Routes>
            <ToastContainer position="bottom-left" autoClose={2000}
/>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      )}
    </>
  );
}

export default App;
