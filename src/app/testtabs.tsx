import React, { useState, ChangeEvent } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import StickyHeadTable from './stickyheadtable';
import { useMatch, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { TableStatus, selectedTableValue } from 'src/features/table/tableSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createPresentation } from 'src/presentation/createPresentation';

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
};
export const TestTabs = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  let urlKey = params.urlKey as string;

  let url = apiEndpoints[urlKey];

  const handleChange = (event: ChangeEvent<{}>, selectedValue: TableStatus) => {
    console.log("This is the event ",event, "this is the underscore",selectedValue);
   
    dispatch(selectedTableValue(selectedValue))
  };
  const presentation = useAppSelector(createPresentation);
  console.log("presentation mode:", presentation)

  return (
    <div style={{ backgroundColor: 'lightgray' }}>
      <div className="padding_vertical_small"></div>
      <Box sx={{ width: '80%', overflow: 'hidden', marginLeft: '0' }}>
        <Tabs value={presentation.status} onChange={handleChange} centered>
          <Tab label="Pending" value= "pending" />
          <Tab label="Published"value= "published" />
          <Tab label="Archived" value= "archived"/>
        </Tabs>

        <div className="padding_vertical_small"></div>
        <Typography>
          <StickyHeadTable key={url} status={presentation.status} url={url} />
        </Typography>
      </Box>
      <div className="padding_vertical_medium"></div>
    </div>
  );
};
