import { Box, Link, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchPosts } from 'src/features/posts/fetchPosts';
import { createPresentationPosts } from 'src/presentation/createPresentation';
import styles from './mobileComponent.module.css';
export default function LatestLIst() {
  const data = useAppSelector(createPresentationPosts);
  const dispatch = useAppDispatch();
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
          {data.slice(0, 5).map((post) => (
            <TableRow>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  fontFamily: 'IBM Plex Mono',
                  height: '2rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  paddingLeft: '0rem'

                }}
              >
                <a href={post.link} target="_blank" className={styles.text_link}>
                  {post.title}
                </a>
              </TableCell>{' '}
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
      <Box sx={{display:'flex', justifyContent:'center',marginTop:'1rem'}}>
        <Link sx={{fontWeight:'bold'}} href='/main'>See all articles </Link>
      </Box>
       
    </div>
  );
}
