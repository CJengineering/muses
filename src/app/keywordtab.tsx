import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CreateKeywordForm from './createKeywordForm';
import UpdateKeywordForm from './updtaeKeywordForm';


interface Data {
  id: number;
  key_word: string;
  rss_url: string;
  created_at: string;
  updated_at: string;
  factiva: boolean;
  combined: boolean;
}

export default function KeyWordTable() {
  const [rows, setRows] = useState<Data[]>([]);
  const [filteredRows, setFilteredRows] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 100;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const fetchRows = async () => {
    try {
      const response = await fetch(
        'https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words'
      );
      const data: Data[] = await response.json();
      setRows(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };
  useEffect(() => {
    const filteredData = rows.filter((row) =>
      row.key_word.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredRows(filteredData);
  }, [rows, searchInput]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
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
              <p></p>
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
    <Box sx={{ width: '50%', overflow: 'hidden', marginLeft: '2rem' }}>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
       <h1>Keywords</h1>

      <TextField
        label="Search Keyword"
        value={searchInput}
        onChange={handleSearchChange}
        margin="normal"
        variant="outlined"
      />
     </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Keyword</TableCell>
            
              {/* No article-related columns */}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <a
                    style={{
                      fontWeight: 'bold',
                      color: 'gray',
                      textDecoration: 'none',
                    }}
                    href={`/keyword/${row.id}`}
                  >
                    {row.key_word}
                  </a>
                </TableCell>
              
                {/* No article-related cells */}
                <TableCell align="right">
                  {' '}
                  <UpdateKeywordForm
                    factiva={row.factiva}
                    rss={row.rss_url}
                    keywordName={row.key_word}
                    keywordId={row.id}
                    combined = {row.combined}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </TableContainer>
    </Box>
  );
}
