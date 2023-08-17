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
  CircularProgress,
  TableSortLabel,
  TextField,
} from '@mui/material';
import Row from './row';
import { Article } from './interfaces';
import KeyRow from './keyRow';
interface Column {
  id:
    | 'checkbox'
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
  { id: 'checkbox', label: 'Select', maxWidth: 20 },
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
  articles: Article[];
}

const TableKeyword: React.FC<statusProps> = ({ articles }) => {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState<Article[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [order, setOrder] = React.useState<'desc' | 'asc'>('asc');
  const [search, setSearch] = React.useState('');
  console.log('Let see the row', rows);
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

  const sortRowsByMainScore = () => {
    const sortedRows = [...rows].sort((a, b) => {
      if (a.score === null && b.score === null) {
        return 0;
      } else if (a.score === null) {
        return 1;
      } else if (b.score === null) {
        return -1;
      } else {
        return b.score - a.score;
      }
    });
    setRows(sortedRows);
  };

  React.useEffect(() => {
    // Update rows state when articles prop changes
    setRows(articles);
  }, [articles]);
  React.useEffect(() => {
    if (order === 'desc') {
      sortRowsByRelatedScore();
    } else {
      sortRowsByMainScore();
    }
  }, [order]);

  const handleSort = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const [loading, setLoading] = React.useState(false);

  if (loading) {
    return (
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
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <TextField
        id="search-bar"
        label="Search keyword or title "
        variant="standard"
        value={search}
        onChange={handleSearchChange}
        style={{
          marginBottom: '1rem',
          position: 'absolute',
          top: -50,
          right: 20,
        }}
      />

      <Box
        sx={{
          overflow: 'hidden',
          marginLeft: '0%',
          padding: '2rem',
          backgroundColor: 'white',
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
                    {column.id === 'related_score' && <TableSortLabel active />}
                    {column.id === 'main_score' && <TableSortLabel active />}
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
              <KeyRow
                rowsPerPage={rowsPerPage}
                rows={rows}
                page={page}
                setRows={setRows}
                url_item={''} // You need to provide the URL here
              />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 10, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) =>
            setRowsPerPage(parseInt(event.target.value, 10))
          }
        />
      </Box>
    </div>
  );
};

export default TableKeyword;
