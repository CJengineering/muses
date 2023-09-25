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
  createPresentationFilterState,
  createPresentationNewTab,
  createPresentationPosts,
  createPresentationSearchAttributes,
  createPresentationSearchBar,
  createPresentationSelectAll,
  createPresentationSelectedRows,
} from 'src/presentation/createPresentation';
import { fetchPosts } from 'src/features/posts/fetchPosts';
import { filterStateChanged } from 'src/features/filterState/filterStateSlice';
import { Pagination, TableSortLabel } from '@mui/material';
import { sortedByDate } from 'src/features/articles/articlesSlice';
import {
  postSortedByDate,
  postSortedByMainScore,
  postsFiltred,
} from 'src/features/posts/postsSlice';
import { allSelected } from 'src/features/SelectAll/selectAllSlice';
import { toggleSelectedRow } from 'src/features/rowSelection/rowSlice';
import { useLocation, useParams } from 'react-router-dom';
import NoItemPage from './NoItemPage';
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
  const [direction, setDirection] = useState(false);
  const search = useAppSelector(createPresentationSearchBar);
  const [scoreDirection, setScoreDirection] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const dispatch = useAppDispatch();
  const filterStatus = useAppSelector(createPresentationFilterState);

  const filterState = useAppSelector(createPresentationSearchAttributes);
  const presentationSelctAll = useAppSelector(createPresentationSelectAll);
  const tableStatus = useAppSelector(createPresentationNewTab);
  const presentationTable = useAppSelector(createPresentationPosts);
  const location = useLocation();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (location.pathname === `/keywords-beta/${id}`) {
        await dispatch<any>(fetchPosts(tableStatus.status, Number(id)));
        if (filterStatus.status) {
            dispatch(postsFiltred(filterState.searchAttributes));
          }
      }
      if (location.pathname === '/main') {
        await dispatch<any>(fetchPosts(tableStatus.status));
        if (filterStatus.status) {
            dispatch(postsFiltred(filterState.searchAttributes));
          }
      }
    };
    fetchData();
    console.log('useffect working');
   
  }, [location.pathname,tableStatus.status]);
 useEffect(()=>{
    console.log('useffect 2 working');
    if (filterStatus.status) {
        dispatch(postsFiltred(filterState.searchAttributes));
      }
 },[tableStatus.status])
 const renderedRows = presentationTable.filter((row) => {
  const titleMatch =
    search.status !== '' && row.title.toLowerCase().includes(search.status.toLowerCase());
  const keywordMatch = row.keyword
    .toLowerCase()
    .includes(search.status.toLowerCase());

  return titleMatch || keywordMatch;
});
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const filterDate = () => {
    dispatch(postSortedByDate(direction));
    setDirection(!direction);
  };
  const filterScore = () => {
    dispatch(postSortedByMainScore(scoreDirection));
    setScoreDirection(!scoreDirection);
  };
  const handleCheckboxChangeAll = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(allSelected(!presentationSelctAll.status));
  };
  const addToSelctAll = (id: number) => {
    dispatch(toggleSelectedRow(id));
  };
  const selectAllAfterSlice = () => {
    const rowsAfterSlice = presentationTable.slice(startIdx, endIdx);
    const idsAfterSlice = rowsAfterSlice.map((object) => object.id);
    idsAfterSlice.forEach((id) => {
      dispatch(toggleSelectedRow(id));
    });
  };
  const startIdx = (page - 1) * rowsPerPage;
  const endIdx = page * rowsPerPage;

  return (
    <div className="table">
     
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 10 }}>
              <Checkbox
                checked={presentationSelctAll.status}
                onChange={(event) => handleCheckboxChangeAll(event)}
                onClick={() => selectAllAfterSlice()}
              ></Checkbox>
            </TableCell>
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
              <TableSortLabel
                active={true}
                onClick={filterDate}
                direction={direction ? 'asc' : 'desc'}
              >
                DATE
              </TableSortLabel>
            </TableCell>
            <TableCell
              sx={{
                width: 400,
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
              <TableSortLabel
                active={true}
                onClick={filterScore}
                direction={scoreDirection ? 'asc' : 'desc'}
              >
                SCORE
              </TableSortLabel>
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
          { renderedRows.slice(startIdx, endIdx).map((object) => (
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
      <Pagination
        count={Math.ceil(presentationTable.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
      {presentationTable.length >0 ? '' : <NoItemPage />}    
    </div>
  );
}
