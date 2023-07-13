import * as React from 'react';
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
import Row from './row';
import { Route } from 'react-router-dom';
import AlertArticle from './alertArticle';

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
    id: 'date',
    label: 'Date',
    minWidth: 70,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
];

interface statusProps {
  status: string ;
  url: string;
}
interface Data {
  id: number;
  title: string;
  link: string;
  url_link: string | undefined;
  published: string;
  posted: boolean;
  key_word: {
    key_word: string;
  };
  created_at: string;
  updated_at: string;
  key_word_id: number;
  score: number | null;
  score_second: number | null;
  category_label: string | null;
}

const StickyHeadTable: React.FC<statusProps> = ({ status, url }) => {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState<Data[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [relatedScoreSortDirection, setRelatedScoreSortDirection] =
    React.useState<OrderDirection>('asc');
  const drawerWidth = 240;
  type OrderDirection = 'desc' | 'asc';
  const [order, setOrder] = React.useState<OrderDirection>('asc');
  console.log('this is the url :', url);
  const [search, setSearch] = React.useState('');

  const sortRowsByRelatedScore = () => {
    const sortedRows = [...rows].sort((a, b) => {
      if (a.score_second === null && b.score_second === null) {
        return 0;
      } else if (a.score_second === null) {
        return 1;
      } else if (b.score_second === null) {
        return -1;
      } else {
        return b.score_second - a.score_second;
      }
    });
    setRows(sortedRows);
  };
  React.useEffect(() => {
    fetchRows();
  }, [status]);

  React.useEffect(() => {
    if (relatedScoreSortDirection === 'desc') {
      sortRowsByRelatedScore();
    } else {
      const sortedRows = [...rows].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);

        return order === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      });

      setRows(sortedRows);
    }
  }, [order, relatedScoreSortDirection]);

  const fetchRows = async () => {
    try {
      const response = await fetch(
        `https://new-alerts-e4f6j5kdsq-ew.a.run.app/${url}?status=${status}`
      );
      const data: Data[] = await response.json();

      setRows(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

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
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const renderedRows = rows.filter((row) =>
    row.title.toLowerCase().includes(search.toLowerCase())
  );

  const [loading, setLoading] = React.useState(true);

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
          width: '80%',
          overflow: 'hidden',
        
          backgroundColor: 'white',
        }}
      >
        <TextField
          id="search-bar"
          label="Search title"
          variant="standard"
          value={search}
          onChange={handleSearchChange}
          style={{ marginBottom: '1rem', marginLeft: '2rem' }}
        />

        <TableContainer sx={{ padding: '2rem' }}>
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
                        active
                        direction={order}
                        onClick={handleSort}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <Row
                rowsPerPage={rowsPerPage}
                rows={renderedRows}
                page={page}
                setRows={setRows}
                url_item={url}
              />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};
export default StickyHeadTable;
