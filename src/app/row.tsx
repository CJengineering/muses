import { useEffect, useState } from 'react';
import {
  TableRow,
  TableCell,
  Link,
  Button,
  Box,
  Fab,
  CircularProgress,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import AlertArticle from './alertArticle';
interface ApiEndpoints {
  [key: string]: string;
}

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
interface RowProps {
  page: number;
  url_item : string;
  rows: Data[];
  rowsPerPage: number;
  setRows: React.Dispatch<React.SetStateAction<Data[]>>;
}


const Row: React.FC<RowProps> = ({ page, rows, rowsPerPage, setRows, url_item }) => {
  const apiEndpoints: ApiEndpoints = {
    "articles":"google-alerts" ,
    "gosearts":"google-search" ,
    "bing_articles":"bing-news",
  };
  const  linkitem = apiEndpoints[url_item]
  const handlePost = async (id: number, category_label: string) => {
    const url = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/${url_item}/${id}`;
    const body = JSON.stringify({ category_label });
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
      if (response.ok) {
        // Remove the item from the rows array
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
      }


    } catch (error) {
      // Handle error if needed
      console.error(error);
    }
  };
  const formatPublishedDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.id}
            className="row"
          >
            <TableCell style={{ minWidth: 300, width: 300, color: 'gray', fontWeight:'bold' }}>
            
                {row.title}
           
            </TableCell>
            <TableCell style={{ width: 50 }}>
              <Link href={row.link ? row.link : row.url_link} target="_blank" rel="noopener noreferrer">
                <Button variant="contained">View</Button>
              </Link>
            </TableCell>
            <TableCell style={{ width: 200 }} align="left">
              {row.key_word.key_word} {row.id}
            </TableCell>
            <TableCell style={{ maxWidth: 200 }} align="center">
              {row.score ? row.score : 0}
            </TableCell>
            <TableCell style={{ maxWidth: 200 }} align="center">
              {row.score_second ? row.score_second : 0}
            </TableCell>
            <TableCell style={{ maxWidth: 200 }} align="center">
              {formatPublishedDate(row.created_at)}
            </TableCell>
            <TableCell align="center">
              <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <div className="action-cell">
                  <Fab
                    color="primary"
                    className="action-button"
                    aria-label="add"
                    onClick={() => handlePost(row.id, 'published')}
                  >
                    <RocketLaunchIcon />
                  </Fab>
                  <Fab
                    color="secondary"
                    className="action-button"
                    aria-label="edit"
                    onClick={() => handlePost(row.id, 'archived')}
                  >
                    <FolderDeleteIcon />
                  </Fab>
                </div>
              </Box>
            </TableCell>
          </TableRow>
        ))}
    </>
  );
};

export default Row;
