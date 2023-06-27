import React, { useState, ChangeEvent } from 'react';
import { Tab, Tabs, Typography } from '@mui/material';
import StickyHeadTable from './stickyheadtable';
import { useMatch, useParams } from 'react-router-dom';

interface itemProps{
  url: string;
}
interface ApiEndpoints {
  [key: string]: string;
}

interface ParamTypes {
  urlKey: string;
}

const apiEndpoints: ApiEndpoints = {
  "google-alerts": "articles",
  "google-search": "gosearts",
  "bing-news": "bing_articles",
};
export const TestTabs = () => {
  const [value, setValue] = useState(0);
  const params = useParams();
  React.useEffect(() => {
    console.log(params)

  }, []); 
  let urlKey = params.urlKey as string; 

  let url = apiEndpoints[urlKey];


  const handleChange = (
    event: ChangeEvent<{}>,
    newValue: React.SetStateAction<number>
  ) => {
    setValue(newValue);
  };

  

  return (
    <div>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Pending" />
        <Tab label="Published" />
        <Tab label="Archived" />
      </Tabs>
      <Typography>
        {value === 0 && <StickyHeadTable key = {url} status= "pending" url ={url} />}
        {value === 1 && <StickyHeadTable key = {url}  status="published"  url ={url} />}
        {value === 2 && <StickyHeadTable key = {url}  status="archived" url ={url}  />}
      </Typography>
    </div>
  );
};
