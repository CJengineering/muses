import { ReactElement } from 'react';
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
  return (
    <div className="table">
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 10 }}>
              <Checkbox></Checkbox>
            </TableCell>
            <TableCell sx={{ width: 400 , fontWeight:'bold', fontFamily:'IBM Plex Mono'}}>PAGE</TableCell>
            <TableCell sx={{ width: 100 , fontWeight:'bold', fontFamily:'IBM Plex Mono'}} align="left">SOURCE</TableCell>
            <TableCell sx={{ width: 100 , fontWeight:'bold', fontFamily:'IBM Plex Mono'}} align="left">DATE</TableCell>
            <TableCell sx={{ width: 300 , fontWeight:'bold', fontFamily:'IBM Plex Mono'}} align="left">KEYWORD</TableCell>
            <TableCell sx={{ width: 100 , fontWeight:'bold', fontFamily:'IBM Plex Mono'}} align="left">SCORE</TableCell>
            <TableCell sx={{ width: 400 , fontWeight:'bold', fontFamily:'IBM Plex Mono'}} align="left">ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <RowNew />    <RowNew />
        </TableBody>
      </Table>
    </div>
  );
}
