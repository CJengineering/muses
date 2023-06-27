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
  status: string | undefined;
  url: string;
}
interface Data {
  id: number;
  title: string;
  link: string;
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

  const drawerWidth = 240;
  type OrderDirection = 'desc' | 'asc';
  const [order, setOrder] = React.useState<OrderDirection>('asc');

  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    fetchRows();
  }, [status]);

  React.useEffect(() => {
    const sortedRows = [...rows].sort((a, b) => {
      const dateA = new Date(a.published);
      const dateB = new Date(b.published);

      return order === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

    setRows(sortedRows);
  }, [order]);

  const fetchRows = async () => {
    try {
      const response = await fetch(
        `https://new-alerts-e4f6j5kdsq-ew.a.run.app/${url}?status=${status}`
      );
      const data: Data[] = await response.json();

      setRows(data);
      setLoading(false)
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
      <Paper sx={{ width: '80%', overflow: 'hidden', marginLeft: '18%' }}>
        <TextField
          id="search-bar"
          label="Search title"
          variant="standard"
          value={search}
          onChange={handleSearchChange}
          style={{ marginBottom: '1rem' }}
        />
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
                url_item = {url}
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
      </Paper>
    </>
  );
};
export default StickyHeadTable;
