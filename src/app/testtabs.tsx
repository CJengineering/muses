import React, { useState, ChangeEvent } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import StickyHeadTable from './stickyheadtable';
import { useMatch, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { TableStatus, selectedTableValue } from 'src/features/table/tableSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createPresentation } from 'src/presentation/createPresentation';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import RocketIcon from '@mui/icons-material/Rocket';
import ArchiveIcon from '@mui/icons-material/Archive';
interface itemProps {
  url: string;
}
interface ApiEndpoints {
  [key: string]: string;
}

interface ParamTypes {
  urlKey: string;
}

const apiEndpoints: ApiEndpoints = {
  'google-alerts': 'articles',
  'google-search': 'gosearts',
  'bing-news': 'bing_articles',
  'internal-articles':'articleinterns'
};
export const TestTabs = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  let urlKey = params.urlKey as string;

  let url = apiEndpoints[urlKey];

  const handleChange = (event: ChangeEvent<{}>, selectedValue: TableStatus) => {
    console.log(
      'This is the event ',
      event,
      'this is the underscore',
      selectedValue
    );

    dispatch(selectedTableValue(selectedValue));
  };
  const presentation = useAppSelector(createPresentation);
  console.log('presentation mode:', presentation);

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#F6F6F6' }}>
    
    <h1 style={{textAlign: 'center'}}>{urlKey == 'google-alerts'? 'Google Alerts' : urlKey == 'google-search'? 'Google Search ': urlKey == 'bing-news' ? 'Bing News': urlKey == 'internal-articles' ? "Internal Articles " :" New one" }</h1>

      <Tabs
        style={{ paddingTop: '2rem' }}
        value={presentation.status}
        onChange={handleChange}
      >
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'right', gap: 1 }}>
              <PendingActionsIcon />
              <span>Pending</span>
            </Box>
          }
          value="pending"
        />

        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'right', gap: 1 }}>
              <RocketIcon />
              <span>Published</span>
            </Box>
          }
          value="published"
        />
        <Tab
          label={
            <Box sx={{ display: 'flex', alignItems: 'right', gap: 1 }}>
              <ArchiveIcon />
              <span>Archived</span>
            </Box>
          }
          value="archived"
        />
      </Tabs>

      <StickyHeadTable key={url} status={presentation.status} url={url} />
    </Box>
  );
};
