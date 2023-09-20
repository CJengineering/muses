import InboxIcon from '../Icons/InboxIcon';
import styles from './navmenu.module.css';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { Link as RouterLink } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

interface NavItem {
  text: string;
  icon: JSX.Element;
  link: string;
}

const navItems: NavItem[] = [
  { text: 'Beta Version', icon: <InboxIcon />, link: '/main' },
  {
    text: 'Home',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    text: 'Google Alerts',
    icon: <NotificationsIcon />,
    link: '/news/google-alerts',
  },
  {
    text: 'Google Search',
    icon: <SearchIcon />,
    link: '/news/google-search',
  },
  {
    text: 'Bing News',
    icon: <NewReleasesIcon />,
    link: '/news/bing-news',
  },
  {
    text: 'Internal Searches',
    icon: <NewReleasesIcon />,
    link: '/news/internal-articles',
  },
  {
    text: 'Keywords',
    icon: <KeyIcon />,
    link: '/keywords',
  },
];

export default function NavMenu() {
  const [selectedItem, setSelectedItem] = useState('');

  const handleItemClick = (text: string) => {
    setSelectedItem(text === selectedItem ? '' : text);
  };

  return (
    <div className={styles.navmenuWrapper}>
      <div className={styles.navmenuContainer}>
        <div className={styles.logo}>Muses</div>
        <div className={styles.navLinkContainer}>
          <List className={styles.fontClass}>
            {navItems.map((item) => (
              <ListItemButton
              selected={item.text === selectedItem}
              onClick={() => handleItemClick(item.text)}
                key={item.text}
                component={RouterLink}
                to={item.link}
                sx={{
                  '&.Mui-selected': {
                   
                    color: 'blue',
                    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                      color: 'blue',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'lightblue',
                    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                      color: 'blue',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontFamily: 'IBM Plex Mono' }}
                >
                  {item.text}
                </ListItemText>
              </ListItemButton>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}
