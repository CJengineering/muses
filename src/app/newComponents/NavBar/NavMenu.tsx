import InboxIcon from '../Icons/InboxIcon';
import styles from './navmenu.module.css';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { Link as RouterLink } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  TableSortLabel,
} from '@mui/material';
import { useState } from 'react';
import PageIcon from '../Icons/PageIcon';
import Dashboard from 'src/app/dashboard/dashboard';
import DashboardIcon from '../TabComponent/DashboardIcon';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
interface NavItem {
  text: string;
  icon: JSX.Element;
  link: string;
}

const navItems: NavItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/',
  },
  {
    text: 'Page',
    icon: <PageIcon />,
    link: '/main',
  },
  {
    text: 'Keywords ',
    icon: <PageIcon />,
    link: '/keywords-list',
  },
];

const navItemsArchive: NavItem[] = [
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
  const [isChecked, setIsChecked] = useState(false);

  const handleItemClick = (text: string) => {
    setSelectedItem(text === selectedItem ? '' : text);
  };
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
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
          <List sx={{marginLeft:'1rem'}}>
            <ListItemText>
              <TableSortLabel
                active={true}
              
                onClick={()=>{setIsChecked(!isChecked)}}
                IconComponent={isChecked ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
              >
                    <ListItemIcon>< HourglassEmptyIcon/></ListItemIcon>
                Legacy
              </TableSortLabel>
            </ListItemText>
          </List>
          <List
            className={styles.fontClass}
            sx={{ display: isChecked ? 'block' : 'none' }}
          >
            {navItemsArchive.map((item) => (
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
