
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
  text: string;
}

const AlertArticle: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedKeywords, setRelatedKeywords] = useState<RelatedKeywords | null>(null);
  const [arrayKeywords, setArrayKeywords] = useState<number>(0);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://new-alerts-e4f6j5kdsq-ew.a.run.app/articles/${id}`);
        const data: APIResponse = await response.json();
        setArticle(data.article);
        setRelatedKeywords(data.related_keywords);
        setArrayKeywords(data.array_keywords);
        setText(data.text);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div>
         <Paper sx={{ width: '80%', overflow: 'hidden', marginLeft: '18%' }}>



        <div>
          {text ?   <Typography variant="body1">{text}</Typography> :<CircularProgress color="secondary" />}
        
        </div>
      

      {relatedKeywords && (
        <div>
          <Typography variant="h2">Related Keywords:</Typography>
          {Object.entries(relatedKeywords).map(([keyword, value]) => {
            if (value > 0) {
              return (
                <Typography key={keyword}>
                  Keyword: {keyword}, Value: {value}
                </Typography>
              );
            }
            return null;
          })}
          <Typography>Array Keywords Score: {arrayKeywords}</Typography>
        </div>
      )}
      </Paper>
    </div>
  );
};

export default AlertArticle;
