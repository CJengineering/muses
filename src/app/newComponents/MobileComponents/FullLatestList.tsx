import { Box, Link, Table, TableBody, TableCell, TableRow, TablePagination, Pagination } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchPosts } from 'src/features/posts/fetchPosts';
import { createPresentationPosts } from 'src/presentation/createPresentation';
import styles from './mobileComponent.module.css';

export default function FullLatestList() {
  const data = useAppSelector(createPresentationPosts);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchData = async () => {
    await dispatch<any>(fetchPosts('incoming'));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
            <TableRow key={index}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  fontFamily: 'IBM Plex Mono',
                  height: '2rem',
                  overflow: 'hidden',
                  paddingLeft: '0rem',
                }}
              >
                <a href={post.link} target="_blank" className={styles.text_link}>
                  {post.title}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(data.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
     
    </div>
  );
}
