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
import {
  createPresentationFilterState,
  createPresentationNewTab,
  createPresentationPosts,
  createPresentationSearchAttributes,
} from 'src/presentation/createPresentation';
import {
  NewTableStatus,
  selectedNewTableValue,
} from 'src/features/new table selctor/newTableSlice';
import { fetchPosts } from 'src/features/posts/fetchPosts';
import { filterStateChanged } from 'src/features/filterState/filterStateSlice';
import { useLocation, useParams } from 'react-router-dom';
import { postsFiltred } from 'src/features/posts/postsSlice';

export default function TabSelctor() {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const filterState = useAppSelector(createPresentationSearchAttributes);
  const filterStatus = useAppSelector(createPresentationFilterState);
  const presentationTable = useAppSelector(createPresentationPosts);

  const presentationNewTab = useAppSelector(createPresentationNewTab);

  const fetchData = async (url: NewTableStatus, id?: number) => {
    if (location.pathname === `/keywords-beta/${id}`) {
      try {
        await dispatch<any>(fetchPosts(url, Number(id)));
        if (filterStatus.status) {
          dispatch(postsFiltred(filterState.searchAttributes));
        }
      } catch (error) {
        // Handle any errors that may occur during the dispatch
        console.error('Error fetching data:', error);
      }
    }
    if (location.pathname === '/content') {
      try {
        await dispatch<any>(fetchPosts(url));
        console.log('DATA INSIDE ACTION', presentationTable.length)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };


  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: NewTableStatus
  ) => {
    console.log('this is the new Value', newValue);

   
      dispatch(selectedNewTableValue(newValue));
    
   
  };

  return (

    <Box sx={{ width: '600px', textTransform: 'none'}}>
      <TabContext value={presentationNewTab.status} >
        
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
                    lineHeight: '1.9',
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
              sx={{ paddingInline: '0' }}
            />
            <Tab
              label={
                <Box
                  sx={{
                    
                    display: 'flex',
                    alignItems: 'right',
                    lineHeight: '1.9',
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
              sx={{ marginLeft:'2rem',paddingInline: '0' }}
            />{' '}
            <Tab
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'right',
                    lineHeight: '1.9',
                    gap: 1,
                    alignContent: 'center',
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
              sx={{  marginLeft:'2rem',paddingInline: '0' }}
            />{' '}
            <Tab
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignContent: 'center',
                    lineHeight: '1.9',
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
              sx={{  marginLeft:'2rem',paddingInline: '0' }}
            />
          </TabList>
        </Box>
      </TabContext>
    </Box>

  );
}
