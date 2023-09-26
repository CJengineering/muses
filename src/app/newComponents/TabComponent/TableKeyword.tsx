import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './tabComponent.module.css'
import { Data } from 'src/app/interfaces';
import TabNav from './TabNav';
import MainPageNav from '../mainPageNav/mainPageNav';
export default function TableKeyword() {
  const [rows, setRows] = useState<Data[]>([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 100;
  const [open, setOpen] = useState(false);

  const fetchRows = async () => {
    try {
      const response = await fetch(
        'https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words'
      );
      const data = await response.json();
      setRows(data);
      console.log('this is  data to see for combined attribute :', data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);
  return (
    <div className='main-page-wrapper '>
         <MainPageNav/>
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
              }}
              align="left"
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
          {rows.map((keyword) => (
            <TableRow
            key={keyword.id}
          
            className={styles.tableRow}
          >
           
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
              <a href={`/keywords-beta/${keyword.id}`} target='_blank' className={styles.text_link}>
                {keyword.key_word}
              </a>
            </TableCell>
            <TableCell align="left"></TableCell>
      
           
           
        
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
  );
}
