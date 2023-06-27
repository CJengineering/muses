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
        const response = await fetch(`http://127.0.0.1:3000/key_words/${id}`);
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
    return <div>Loading...</div>;
  }
 
  const allArticles: AllArticles[] = [...(data?.articles || []), ...(data?.gosearts || []), ...(data?.bing_articles || [])];

  return  ( <div>
    <Paper sx={{ width: '80%', overflow: 'hidden', marginLeft: '18%' }}>
      <Typography variant="h4" component="h1">
        Keyword: {data?.key_word}
      </Typography>
      <Typography variant="h6" component="h2">
        RSS URL: {data?.rss_url}
      </Typography>
      <Typography variant="body1" component="p">
        Factiva: {data?.factiva ? 'Yes' : 'No'}
      </Typography>
      <Typography variant="h5" component="h3">
        Articles:
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
                  <Link href={article.url_link} target="_blank" rel="noopener noreferrer">
                    See the article
                  </Link>
                </TableCell>
                <TableCell>{article.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </div>
)
};

export default Keyword;
