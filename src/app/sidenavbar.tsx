import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240;

interface NavItem {
  text: string;
  icon: JSX.Element;
  link: string;
}

const navItems: NavItem[] = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    text: 'Google Alerts',
    icon: <NotificationsIcon />,
    link: '/google-alerts',
  },
  {
    text: 'Google Search',
    icon: <SearchIcon />,
    link: '/google-search',
  },
  {
    text: 'Bing News',
    icon: <NewReleasesIcon />,
    link: '/bing-news',
  },
];

const SideNavBar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.link}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNavBar;
