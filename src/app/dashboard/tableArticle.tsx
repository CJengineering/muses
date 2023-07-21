import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  Link,
  TableSortLabel,
  TextField,
} from '@mui/material';

import Icon from '@mui/material/Icon';
import Row from '../row';
import { Route } from 'react-router-dom';
import AlertArticle from '../alertArticle';
import { Article, Data, DataArticle } from '../interfaces';
import TabRow from './tabRow';

interface Column {
  id:
    | 'title'
    | 'view'
    | 'related_to'
    | 'main_score'
    | 'related_score'
    | 'date'
    | 'actions';
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'title', label: 'Title', minWidth: 200, maxWidth: 200 },
  {
    id: 'view',
    label: '',
    minWidth: 50,
    maxWidth: 50,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'related_to',
    label: 'Related to ',
    minWidth: 70,
    maxWidth: 70,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'main_score',
    label: 'Main Score',
    minWidth: 70,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'related_score',
    label: ' Related Score',
    minWidth: 50,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
  
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
];
export type DashboardRowProps = {
  name: string;
  color: string;
}
const TableArticle = (props: DashboardRowProps ) => {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState<DataArticle[]>([
    // Replace this hard-coded data with your actual data
    {
      id: 1,
      title: 'Title 1',
      link: 'Link 1',
      url_link: 'URL Link 1',
      published: 'Published 1',
      posted: true,
      key_word: { key_word: 'Keyword 1' },
      created_at: '2023-07-01',
      updated_at: '2023-07-02',
      key_word_id: 1,
      score: 4.5,
      score_second: 3.2,
      category_label: 'Category 1',
    },
    {
      id: 2,
      title: 'Title 2',
      link: 'Link 2',
      url_link: 'URL Link 2',
      published: 'Published 2',
      posted: false,
      key_word: { key_word: 'Keyword 2' },
      created_at: '2023-07-02',
      updated_at: '2023-07-03',
      key_word_id: 2,
      score: 3.7,
      score_second: 2.8,
      category_label: 'Category 2',
    },
    // Add more data as needed
  ]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [relatedScoreSortDirection, setRelatedScoreSortDirection] =
    React.useState<OrderDirection>('asc');
  const drawerWidth = 240;
  type OrderDirection = 'desc' | 'asc';
  const [order, setOrder] = React.useState<OrderDirection>('asc');

  const handleSort = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [loading, setLoading] = React.useState(false);

  if (loading) {
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </div>
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          overflow: 'hidden',
          marginLeft: '0%',
          padding: '2rem',
          border: ' 1px gray solid'
        }}
      >
        
        <TableContainer sx={{}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                    {column.id === 'related_score' && (
                      <TableSortLabel
                        active={relatedScoreSortDirection === 'desc'}
                        direction={relatedScoreSortDirection}
                        onClick={() =>
                          setRelatedScoreSortDirection(
                            relatedScoreSortDirection === 'desc'
                              ? 'asc'
                              : 'desc'
                          )
                        }
                      />
                    )}
                    {column.id === 'date' && (
                      <TableSortLabel
                      
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
            
              <TabRow color={props.color} name={props.name} />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export default TableArticle;
