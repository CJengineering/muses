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
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { createPresentationNewTab } from 'src/presentation/createPresentation';
import {
  NewTableStatus,
  selectedNewTableValue,
} from 'src/features/new table selctor/newTableSlice';
import { fetchPosts } from 'src/features/posts/fetchPosts';
import { filterStateChanged } from 'src/features/filterState/filterStateSlice';
import { useLocation, useParams } from 'react-router-dom';

export default function TabSelctor() {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const presentationNewTab = useAppSelector(createPresentationNewTab);
  const fetchData = async (url: NewTableStatus, id?:number) => {
    if (location.pathname === `/keywords-beta/${id}`) {
        await dispatch<any>(fetchPosts(url,Number(id)));
        dispatch(filterStateChanged(false));
      }
      if(location.pathname==='/main'){
        await dispatch<any>(fetchPosts(url))
        dispatch(filterStateChanged(false));
      }

  };
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: NewTableStatus
  ) => {
    console.log('this is the new Value', newValue),
      dispatch(selectedNewTableValue(newValue)),
      fetchData(newValue, Number(id));
  };

  return (
    <Box sx={{ width: '100%', textTransform: 'none', marginBottom: '2rem' }}>
      <TabContext value={presentationNewTab.status}>
        <Box>
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
                  <span
                    style={{
                      textTransform: 'none',
                      fontFamily: 'IBM Plex Mono',
                      fontWeight: 'bold',
                    }}
                  >
                    Incoming
                  </span>
                </Box>
              }
              value="incoming"
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
                  <span
                    style={{
                      textTransform: 'none',
                      fontFamily: 'IBM Plex Mono',
                      fontWeight: 'bold',
                    }}
                  >
                    Shortlist
                  </span>
                </Box>
              }
              value="shortlist"
            />{' '}
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
                  <WebflowIcon />
                  <span
                    style={{
                      textTransform: 'none',
                      fontFamily: 'IBM Plex Mono',
                      fontWeight: 'bold',
                    }}
                  >
                    Published
                  </span>
                </Box>
              }
              value="published"
            />{' '}
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
                  <ArchiveIcon />
                  <span
                    style={{
                      textTransform: 'none',
                      fontFamily: 'IBM Plex Mono',
                      fontWeight: 'bold',
                    }}
                  >
                    Archive
                  </span>
                </Box>
              }
              value="archived"
            />
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
}
