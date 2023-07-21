import React, { useState } from 'react';
import { TableRow, TableCell, Link, Button, Box, IconButton, Divider } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import RocketIcon from '@mui/icons-material/Rocket';
import ArchiveIcon from '@mui/icons-material/Archive';
import InfoRow from '../infoRow';
import { DashboardRowProps } from './tableArticle';

interface Data {
  id: number;
  title: string;
  link: string;
  url_link: string | undefined;
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

const hardCodedData: Data[] = [
  {
    id: 1,
    title: 'Title 1',
    link: 'https://www.example.com/article1',
    url_link: undefined,
    published: '2023-07-19',
    posted: true,
    key_word: {
      key_word: 'Keyword 1',
    },
    created_at: '2023-07-19T12:34:56Z',
    updated_at: '2023-07-19T12:34:56Z',
    key_word_id: 1,
    score: 4.2,
    score_second: 3.8,
    category_label: 'Category 1',
  },
  {
    id: 2,
    title: 'Title 2',
    link: 'https://www.example.com/article2',
    url_link: undefined,
    published: '2023-07-18',
    posted: false,
    key_word: {
      key_word: 'Keyword 2',
    },
    created_at: '2023-07-18T12:34:56Z',
    updated_at: '2023-07-18T12:34:56Z',
    key_word_id: 2,
    score: 4.5,
    score_second: 3.5,
    category_label: 'Category 2',
  },

];

const TabRow = (props:DashboardRowProps) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleToggle = (rowId: number) => {
    if (expandedRow === rowId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(rowId);
    }
  };

  return (
    <>
      {hardCodedData.map((row) => (
        <>
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            className="row"
            style={{
              backgroundColor: expandedRow === row.id ? 'rgba(0, 123, 255, 0.1)' : props.color,
            }}
          >
            <TableCell
              style={{
                minWidth: 300,
                width: 300,
                color: 'gray',
                fontWeight: 'bold',

              }}
            >
              <IconButton onClick={() => handleToggle(row.id)}>
                {expandedRow === row.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
              {row.title}
            </TableCell>
            <TableCell style={{ width: 80 }}>
              <Link href={row.link ? row.link : row.url_link} target="_blank" rel="noopener noreferrer">
                <Button variant="outlined">read</Button>
              </Link>
            </TableCell>
            <TableCell style={{ width: 100 }} align="left">
              {row.key_word.key_word}
            </TableCell>
            <TableCell style={{ maxWidth: 200 }} align="center">
              {row.score ? row.score : 0}
            </TableCell>
            <TableCell style={{ maxWidth: 200 }} align="center">
              {row.score_second ? row.score_second : 0}
            </TableCell>
        
            <TableCell align="center">
              <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <div className="action-cell">
                  <RocketIcon style={{ cursor: 'pointer' }} />
                  <ArchiveIcon style={{ cursor: 'pointer' }}  />
                </div>
              </Box>
            </TableCell>
          </TableRow>
          {expandedRow === row.id && (
            <TableRow>
              <TableCell colSpan={4}>
                <Divider />
                <div>
                  <InfoRow id={row.id} url={props.name} />
                </div>
                <Divider />
              </TableCell>
            </TableRow>
          )}
        </>
      ))}
    </>
  );
};

export default TabRow;
