import InboxIcon from '../Icons/InboxIcon';
import styles from './navmenu.module.css';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import KeyIcon from '@mui/icons-material/Key';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  TableSortLabel,
  dividerClasses,
} from '@mui/material';
import { useState } from 'react';
import PageIcon from '../Icons/PageIcon';
import Dashboard from 'src/app/dashboard/dashboard';
import DashboardIcon from '../Icons/DashboardIcon';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ContentIcon from '../Icons/ContentIcon';
import BrainIcon from '../Icons/BrainIcon';
import { relative } from 'path';

interface NavItem {
  text: string;
  icon: JSX.Element;
  link: string;
}
interface NavItemLegacy   {
  text: string;

  link: string;
}

const navItems: NavItem[] = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/dashboard',
  },
  {
    text: 'Content',
    icon: <ContentIcon />,
    link: '/',
  },
  {
    text: 'Keywords ',
    icon: <BrainIcon />,
    link: '/keywords',
  },
];

const navItemsArchive:  NavItemLegacy[] = [
  {
    text: 'Google Alerts',

    link: '/news/google-alerts',
  },
  {
    text: 'Google Search',
   
    link: '/news/google-search',
  },
  {
    text: 'Bing News',

    link: '/news/bing-news',
  },
  {
    text: 'Internal Searches',

    link: '/news/internal-articles',
  },
  {
    text: 'Keywords',

    link: '/keywords',
  },
];

export default function NavMenu() {
  const [selectedItem, setSelectedItem] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const togleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleItemClick = (text: string) => {
    setSelectedItem(text === selectedItem ? '' : text);
  };
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className={styles.mediaQuery} >
      <div className={styles.navmenuLogoWrapper} >
        <div className={styles.logo}><img src="src/assets/MUSES_LOGO_SVG.svg"  height='24px'alt="muses Logo" /></div>
        {isMenuOpen ? (
          <CloseIcon onClick={togleMenu} />
        ) : (
          <MenuIcon onClick={togleMenu} sx={{ display: 'none',
            '@media (max-width: 600px)': {
              display:' block'
            }
          }}  />
        )}
      </div>
      {isMenuOpen ? (
        <div className={styles.mobileMenuWrapper} >
          <List className={styles.fontClass}>
            {navItems.map((item) => (
              <ListItemButton
                selected={item.text === selectedItem}
                onClick={() => {
                  handleItemClick(item.text);
                  togleMenu();
                }}
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
                <ListItemIcon >{item.icon}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ fontFamily: 'IBM Plex Mono' }}
                >
                  {item.text}
                </ListItemText>
              </ListItemButton>
            ))}
          </List>
        </div>
      ) :null}
    <div style={{position:'relative'}}>

   
      <div className={styles.navmenuWrapper}>
        <div className={styles.navmenuContainer}>
          <div className={styles.navLinkContainer}>
            <div className={styles.logoBigScreen}>MUSES</div>
            <List className={styles.fontClass}>
              {navItems.map((item) => (
                <ListItemButton
                  selected={item.text === selectedItem}
                  onClick={() => handleItemClick(item.text)}
                  key={item.text}
                  component={RouterLink}
                  to={item.link}
                  sx={{
                    padding:'8px 54px 8px 18px',
                

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
                  <ListItemIcon sx={{minWidth:'0px', marginRight:'9px'}}>{item.icon}</ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ fontFamily: 'IBM Plex Mono' }}
                  >
                    {item.text}
                  </ListItemText>
                </ListItemButton>
              ))}
            </List>
            <List sx={{ marginLeft: '18px' }}>
              <ListItemText>
                <TableSortLabel
                  active={true}
                  onClick={() => {
                    setIsChecked(!isChecked);
                  }}
                  IconComponent={
                    isChecked ? KeyboardArrowUpIcon : KeyboardArrowDownIcon
                  }
                >
                  <ListItemIcon sx={{minWidth:'0px', marginRight:'9px'}}>
                    <HourglassEmptyIcon />
                  </ListItemIcon>
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
                    paddingLeft: '18px',
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
    </div>
    </div>
  );
}
