import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import InboxIcon from '../Icons/InboxIcon';
import { ThumbUp } from '@mui/icons-material';
import ThumbUpIcon from '../Icons/ThumbUpIcon';
import WebflowIcon from '../Icons/WebflowIcon';
import ArchiveIcon from '../Icons/ArchiveIcon';

export default function TabSelctor() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', textTransform: 'none', marginBottom:'2rem' }}>
      <TabContext value={value}>
        <Box >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'right',
                    gap: 1,
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: 'blue',
                    },
                  }}
                >
                  <InboxIcon />
                  <span style={{ textTransform: 'none', fontFamily: 'IBM Plex Mono', fontWeight:'bold' }}>Incoming</span>
                </Box>
              }
              value="1"
            />
            <Tab
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'right',
                    gap: 1,
                    transition: 'color 0.3s',
                    '&:hover': {
                      color: 'blue',
                    },
                  }}
                >
                  <ThumbUpIcon />
                  <span style={{ textTransform: 'none', fontFamily: 'IBM Plex Mono', fontWeight:'bold' }}>Shortlist</span>
                </Box>
              }
              value="2"
            />{' '}
            <Tab
              label={
                <Box sx={{
                    display: 'flex',
                    alignItems: 'right',
                    gap: 1,
                    transition: 'color 0.3s', 
                    '&:hover': {
                      color: 'blue',
                    },
                  }}>
                  <WebflowIcon/>
                  <span style={{ textTransform: 'none', fontFamily: 'IBM Plex Mono', fontWeight:'bold' }}>Published</span>
                </Box>
              }
              value="3"
            />{' '}
            <Tab
              label={
                <Box sx={{
                    display: 'flex',
                    alignItems: 'right',
                    gap: 1,
                    transition: 'color 0.3s', 
                    '&:hover': {
                      color: 'blue',
                    },
                  }}>
                  <ArchiveIcon/>
                  <span style={{ textTransform: 'none', fontFamily: 'IBM Plex Mono', fontWeight:'bold' }}>Archive</span>
                </Box>
              }
              value="4"
            />
          </TabList>
        </Box>

      </TabContext>
    </Box>
  );
}
