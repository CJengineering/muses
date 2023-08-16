import React, { useEffect, useState,ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import { Data, AllArticles, Article } from './interfaces'; // Import the Data and AllArticles interfaces
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import RocketIcon from '@mui/icons-material/Rocket';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useMatch, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { TableStatus, selectedTableValue } from 'src/features/table/tableSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createPresentation } from 'src/presentation/createPresentation';
import TableKeyword from './TableKeyword';

interface Params {
  id: number;
}

const Keyword: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [keyword, setKeyword] = useState<string>('')
  const [data, setData] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const dispatch = useAppDispatch();

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

 
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words/${id}`
        );
        const keywordData: Data = await response.json();

        // Combine data from different arrays
        const combinedData: Article[] = [
          ...(keywordData?.articles || []),
          ...(keywordData?.gosearts || []),
          ...(keywordData?.bing_articles || []),
        ];
        setKeyword(keywordData.key_word)
        setData(combinedData); // Update data state with combined data
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Box
          sx={{
            width: '80%',
          
            overflow: 'hidden',
            marginLeft: '10%',
          }}
        >
          <div className="container_loading">
            <div className="loading_text">
              <p>Loading ...</p>
            </div>
            <div className="loading_indicator">
              <CircularProgress />
            </div>
          </div>
        </Box>
      </>
    );
  }


  return (
    <>
     <Box sx={{ width: '100%', overflow: 'hidden' }}>
     <h1 style={{marginLeft:'2rem'}}>{keyword}</h1>

      <Tabs
        style={{ paddingTop: '2rem', marginLeft:'2rem' }}
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

    {data !== null && <TableKeyword articles={data}  />}
    </Box>
    </>
  );
};

export default Keyword;
