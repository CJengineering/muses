import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Data, AllArticles } from './interfaces'; // Import the Data and AllArticles interfaces
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import AddTaskIcon from '@mui/icons-material/AddTask';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

interface Params {
  id: number;
}

const Keyword: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://new-alerts-e4f6j5kdsq-ew.a.run.app/key_words/${id}`
        );
        const keywordData: Data = await response.json();
        setData(keywordData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Paper
          sx={{
            width: '80%',
            backgroundColor: 'gray',
            overflow: 'hidden',
            marginLeft: '10%',
          }}
        >
          <div className="container_loading">
            <div className="loading_text">
              <p>Loading ...</p>
            </div>
            <div className="loading_indicator">
              <CircularProgress />
            </div>
          </div>
        </Paper>
      </>
    );
  }

  const allArticles: AllArticles[] = [
    ...(data?.articles || []),
    ...(data?.gosearts || []),
    ...(data?.bing_articles || []),
  ];

  return (
    <div>
      <Paper sx={{ width: '80%', overflow: 'hidden', marginLeft: '18%' }}>
        <Container style={{ backgroundColor: 'lightgray' }}>
          <div className="padding_vertical_medium"></div>
          <Typography variant="h4" component="h1">
            Keyword: {data?.key_word}
          </Typography>

          <Typography variant="body1" component="p">
            Factiva: {data?.factiva ? 'Yes' : 'No'}
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allArticles.map((article: AllArticles) => (
                  <TableRow key={article.id}>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>
                      <Link
                        href={article.url_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        See the article
                      </Link>
                    </TableCell>
                    <TableCell>{article.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="padding_vertical_big"></div>
        </Container>
        <div className="padding_vertical_big"></div>
      </Paper>
    </div>
  );
};

export default Keyword;
