import { ReactElement, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import RowNew from './RowNew';
import styles from './tabComponent.module.css';
import { RowNewProps } from 'src/app/interfaces';
import {
  useAppDispatch,
  useAppSelector,
  useUpdateArchive,
} from 'src/app/hooks';
import {
  createPresentationNewTab,
  createPresentationPosts,
  createPresentationSelectedRows,
} from 'src/presentation/createPresentation';
import { fetchPosts } from 'src/features/posts/fetchPosts';
import { filterStateChanged } from 'src/features/filterState/filterStateSlice';
const exampleObjects: RowNewProps[] = [
  {
    id: 1,
    title:
      'Example Title 1Example Title 1Example Title 1Example Title 1Example Title 1Example Title 1Example Tit',
    link: 'https://example.com/link1',
    date: new Date('2023-09-18'),
    keyword: 'example keyword 1',
    score: 85,
    source: 'bing',
  },
  {
    id: 2,
    title: 'Example Title 2',
    link: 'https://example.com/link2',
    date: new Date('2023-09-19'),
    keyword: 'example keyword 2',
    score: 92,
    source: 'google',
  },
  {
    id: 3,
    title: 'Example Title 3',
    link: 'https://example.com/link3',
    date: new Date('2023-09-20'),
    keyword: 'example keyword 3',
    score: 78,
    source: 'google_alert',
  },
];

function createData(
  checkbox: ReactElement,
  page: string,
  source: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { checkbox, page, source, fat, carbs, protein };
}

export default function TableNew() {

  const dispatch = useAppDispatch();
  const tableStatus = useAppSelector(createPresentationNewTab)
  const presentationTable = useAppSelector(createPresentationPosts);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch<any>(fetchPosts(tableStatus.status));
    };
    fetchData();
    console.log('useffect working');
  }, []);


  return (
    <div className="table">
    
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 10 }}>
              <Checkbox></Checkbox>
            </TableCell>
            <TableCell
              sx={{
                width: 400,
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
              SOURCE
            </TableCell>
            <TableCell
              sx={{
                width: 100,
                fontWeight: 'bold',
                fontFamily: 'IBM Plex Mono',
              }}
              align="left"
            >
              DATE
            </TableCell>
            <TableCell
              sx={{
                width: 300,
                fontWeight: 'bold',
                fontFamily: 'IBM Plex Mono',
              }}
              align="left"
            >
              KEYWORD
            </TableCell>
            <TableCell
              sx={{
                width: 100,
                fontWeight: 'bold',
                fontFamily: 'IBM Plex Mono',
              }}
              align="left"
            >
              SCORE
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
          {presentationTable.map((object) => (
            <RowNew
              key={object.id}
              title={object.title}
              date={object.date}
              keyword={object.keyword}
              source={object.source}
              score={object.score}
              link={object.link}
              id={object.id}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}