import { Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Article {
  id: number;
  key_word_id: number;
  title: string;
  published: string;
  link: string;
  posted: boolean;
  created_at: string;
  updated_at: string;
  category_label: string;
  score: number;
  score_second: null | number;
  key_word: {
    key_word: string;
  };
}

interface RelatedKeywords {
  [key: string]: number;
}

interface APIResponse {
  article: Article;
  related_keywords: RelatedKeywords;
  array_keywords: number;

}
interface PropsInfoRow {
    id: number;
    url: string
}
const InfoRow: React.FC<PropsInfoRow> = ({id, url}) => {

  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const [article, setArticle] = useState<Article | null>(null);
  const [relatedKeywords, setRelatedKeywords] =
    useState<RelatedKeywords | null>(null);
  const [arrayKeywords, setArrayKeywords] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://new-alerts-e4f6j5kdsq-ew.a.run.app/${url}/${id}`
        );
        const data: APIResponse = await response.json();
        setArticle(data.article);
        setRelatedKeywords(data.related_keywords);
        setArrayKeywords(data.array_keywords);
      
        setLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMessage(true);
        setLoading(false)
      }
    };

    fetchArticle();
  }, [id]);
  if (loading) {
    return (
      <>

          <div className="container_loading">
            <div className="loading_text">
              <p>
               Imagine a nice joke
              </p>
            </div>
            <div className="loading_indicator">
              <CircularProgress />
            </div>
          </div>
     
      </>
    );
  }
  if (errorMessage) {
    return (
      <>
     
          <div className="container_loading">
            <div className="loading_text">
              <p>I forgot to implement something to make it work :/</p>
            </div>
          </div>
      
      </>
    );
  }

  return (
    <div>
    
      
        <Container sx={{ backgroundColor: 'lightblue' }}>
          {relatedKeywords && (
            <div style={{ padding: '1rem' }}>
        
              {Object.entries(relatedKeywords).map(([keyword, value]) => {
                if (value > 0) {
                  return (
                    <Typography key={keyword}>
                      <strong>Keyword: </strong>
                      {keyword} <br />
                      <strong>number of key words:</strong> {value}
                    </Typography>
                  );
                }
                return null;
              })}
     
             
            
            </div>
          )}
        </Container>
       
   
    </div>
  );
};

export default InfoRow;
