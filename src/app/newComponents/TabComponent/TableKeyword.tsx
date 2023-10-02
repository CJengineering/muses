import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './tabComponent.module.css';
import stylesApp from 'src/app/app.module.css';
import JoinFullIcon from '@mui/icons-material/JoinFull';
import { Data } from 'src/app/interfaces';
import TabNav from './TabNav';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MainPageNav from '../mainPageNav/mainPageNav';
import UpdateKeywordForm from 'src/app/updtaeKeywordForm';
export default function TableKeyword() {
  const [rows, setRows] = useState<Data[]>([]);
  const [filteredRows, setFilteredRows] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState('');
  
  const [page, setPage] = useState(0);
  const rowsPerPage = 100;
  const [open, setOpen] = useState(false);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const fetchRows = async () => {
    try {
      const response = await fetch(
        'https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words'
      );
      const data = await response.json();
      setRows(data);
      setFilteredRows([...data])
      console.log('this is  data to see for combined attribute :', data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFilter = () => {
    let filteredData;

    if (searchInput === '') {
      // If search input is empty, show all rows
      filteredData = [...rows];
    } else {
      filteredData = rows.filter((keyword) => {
        const keyWordFilter = keyword.key_word.includes(searchInput);
        return keyWordFilter;
      });
    }

    setFilteredRows(filteredData);
  };

  useEffect(() => {
    fetchRows();
  }, []);
  useEffect(() => {
    handleFilter();
  }, [searchInput]);

  return (
    <>
      <div className={stylesApp.mobileViewWrapper}>
        <div className={stylesApp.mobilePageWrapper}>
          <div className={stylesApp.divider24}></div>
          <div className={stylesApp.mainTitle}>Keywords</div>
          <div className={stylesApp.divider24}></div>
          <div className={stylesApp.latestWrapper}>
            <div className={stylesApp.latestContainer}>
              <div className="table">
                <Table  >
              
                  <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((keyword) => (
                      <TableRow key={keyword.id} className={styles.tableRow}>
                        <TableCell
                        
                          scope="row"
                          sx={{
                            fontFamily: 'IBM Plex Mono',
                            height: '2rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-boxflex',
                            paddingLeft: '0rem',
                          }}
                        >
                      
                            {keyword.key_word}
                          
                        </TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <Pagination
        count={Math.ceil(rows.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
     
            </div>
          </div>
        </div>
      </div>
      <div className="main-page-wrapper ">
        <MainPageNav />
        <TextField
  label="Search"
  variant="outlined"
  value={searchInput}
  onChange={(e) => setSearchInput(e.target.value)}
/>
        <div className="table">
          <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: '100%',
                    fontWeight: 'bold',
                    fontFamily: 'IBM Plex Mono',
                  }}
                >
                  PAGE
                </TableCell>
                <TableCell
                  sx={{
                    width: 100,
                    fontWeight: 'bold',
                    fontFamily: 'IBM Plex Mono',
                    color: currentFilter === 'combined' ? 'blue' : 'black',
                  }}
                  align="left"
                  onClick={() => setCurrentFilter('rss_false')}
                >
                  RSS
                </TableCell>
                <TableCell
                  sx={{
                    width: 100,
                    fontWeight: 'bold',
                    fontFamily: 'IBM Plex Mono',
                    color: currentFilter === 'combined' ? 'blue' : 'black',
                  }}
                  align="left"
                  onClick={() => setCurrentFilter('combined')}
                >
                  combined
                </TableCell>

                <TableCell
                  sx={{
                    width: 400,
                    fontWeight: 'bold',
                    fontFamily: 'IBM Plex Mono',
                  }}
                  align="left"
                >
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((keyword) => (
                <TableRow key={keyword.id} className={styles.tableRow}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: 'IBM Plex Mono',
                      height: '3rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-boxflex',
                      alignItems: 'center',
                    }}
                  >
                    <a
                      href={`/keywords-beta/${keyword.id}`}
                      target="_blank"
                      className={styles.text_link}
                    >
                      {keyword.key_word}
                    </a>
                  </TableCell>
                  <TableCell align="left">{keyword.rss_url ?<CheckIcon sx={{color:'green'}} /> : < CloseIcon sx={{color:'red'}} />}</TableCell>
                  <TableCell align="left">{keyword.combined ?<JoinFullIcon sx={{color:'blue'}} /> : null}</TableCell>
                  <TableCell sx={{display:'felx'}}>
                  <UpdateKeywordForm
                    factiva={keyword.factiva}
                    rss={keyword.rss_url}
                    keywordName={keyword.key_word}
                    keywordId={keyword.id}
                    combined = {keyword.combined}
                  />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
