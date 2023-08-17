import { useEffect, useState } from 'react';
import {
  TableRow,
  TableCell,
  Link,
  Button,
  Box,
  Fab,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  IconButton,
  Checkbox,
} from '@mui/material';
import RocketIcon from '@mui/icons-material/Rocket';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArchiveIcon from '@mui/icons-material/Archive';
import TagIcon from '@mui/icons-material/Tag';
import AlertArticle from './alertArticle';
import ToggleDiv from './toggleDiv';
import InfoRow from './infoRow';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Article } from './interfaces';
interface ApiEndpoints {
  [key: string]: string;
}

interface RowProps {
  page: number;

  rows: Article[];
  rowsPerPage: number;
  setRows: React.Dispatch<React.SetStateAction<Article[]>>;
}

const KeyRow: React.FC<RowProps> = ({ page, rows, rowsPerPage, setRows }) => {
  const apiEndpoints: ApiEndpoints = {
    articles: 'google-alerts',
    gosearts: 'google-search',
    bing_articles: 'bing-news',
  };

  const [upDown, setUpDown] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const handlePost = async (
    id: number,
    category_label: string,
    url_item: string
  ) => {
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
  const handleAnalyser = async (id: number, url_item: string) => {
    setIsProcessing(true);
    const url = `https://new-alerts-e4f6j5kdsq-ew.a.run.app/static/analyzer?id=${id}&type=${url_item}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
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
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleToggle = (rowId: number) => {
    if (expandedRow === rowId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(rowId);
    }
  };
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (event.target.checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, id]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((rowId) => rowId !== id)
      );
    }
  };

  //   const handlePostSelected = async () => {
  //     for (const id of selectedRows) {
  //       await handlePost(id, 'archived', );
  //     }
  //     setSelectedRows([]);
  //   };

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const sendSlackMessage = async (keyword: string, link: string) => {
    try {
      const response = await fetch(
        'https://hermes-e4f6j5kdsq-ew.a.run.app/static/article_slack',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ keyword, link }),
        }
      );

      if (response.ok) {
        console.log('Keyword and link sent successfully:', keyword, link);
      } else {
        console.error('Failed to send keyword and link:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending keyword and link:', error);
    }
  };

  return (
    <>
      {selectedRows.length > 0 && (
        <Box sx={{ marginTop: '1rem', textAlign: 'center' }}>
          <Button variant="contained" color="primary">
            Archive selected once
          </Button>
        </Box>
      )}
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => (
          <>
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              key={row.id}
              className="row"
              style={{
                backgroundColor:
                  expandedRow === row.id ? 'rgba(0, 123, 255, 0.1)' : '',
              }}
            >
              {' '}
              <TableCell
                style={{
                  width: 30,
                  color: 'gray',
                  fontWeight: 'bold',
                }}
              >
                <Checkbox
                  checked={selectedRows.includes(row.id)}
                  onChange={(event) => handleCheckboxChange(event, row.id)}
                />
              </TableCell>
              <TableCell
                style={{
                  minWidth: 300,
                  width: 300,
                  color: 'gray',
                  fontWeight: 'bold',
                }}
              >
                <IconButton onClick={() => handleToggle(row.id)}>
                  {expandedRow === row.id ? (
                    <KeyboardArrowUp />
                  ) : (
                    <KeyboardArrowDown />
                  )}
                </IconButton>
                {row.title}
              </TableCell>
              <TableCell style={{ width: 80 }}>
                <Link
                  href={row.link ? row.link : row.url_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outlined">read </Button>
                </Link>
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
                    <RocketIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        handlePost(row.id, 'published', row.source)
                      }
                    />
                    <SmartToyIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleAnalyser(row.id, row.source)}
                    />
                    <TagIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        sendSlackMessage(
                          row.key_word.key_word,
                          row.link ?? row.url_link ?? ''
                        )
                      }
                    />

                    {isProcessing && <CircularProgress size={24} />}
                    <ArchiveIcon
                      style={{ cursor: 'pointer' }}
                      onClick={() => handlePost(row.id, 'archived', row.source)}
                    />
                  </div>
                </Box>
              </TableCell>
            </TableRow>
            {expandedRow === row.id && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Divider />
                  <div>
                    <InfoRow id={row.id} url={row.source} />
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

export default KeyRow;
