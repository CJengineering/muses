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

interface AllArticles {
  id: number;
  key_word_id: number;
  title: string;
  url_link: string;
  score: number;
  score_second: number;
  created_at: string;
  updated_at: string;
}
interface Data {
  id: number;
  key_word: string;
  rss_url: string;
  created_at: string;
  updated_at: string;
  factiva: boolean;
  articles: AllArticles[];
  gosearts: AllArticles[];
  bing_articles: AllArticles[];
}

export default function KeyWordTable() {
  const [rows, setRows] = useState<Data[]>([]);
  const [filteredRows, setFilteredRows] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchRows = async () => {
    try {
      const response = await fetch('https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words');
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

  return (
    <Paper sx={{ width: '80%', overflow: 'hidden', marginLeft: '18%' }}>
      <TextField
        label="Search Keyword"
        value={searchInput}
        onChange={handleSearchChange}
    
        margin="normal"
        variant="outlined"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Keyword</TableCell>
              <TableCell align="right">Google Alerts</TableCell>
              <TableCell align="right">Google Search</TableCell>
              <TableCell align="right">Bing News</TableCell>
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
                <TableCell align="right">{row.articles.length}</TableCell>
                <TableCell align="right">{row.gosearts.length}</TableCell>
                <TableCell align="right">{row.bing_articles.length}</TableCell>
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
    </Paper>
  );
}
