import { dividerClasses } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
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
  summary: string;
}
interface PropsId {
  id: number;
}
export default function ArticleInfo({ id }: PropsId) {
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [summary, setSummary] = useState<string>('');
  const [dataApi, setDataApi] = useState<APIResponse | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedKeywords, setRelatedKeywords] =
    useState<RelatedKeywords | null>(null);
  const [arrayKeywords, setArrayKeywords] = useState<number>(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://new-alerts-e4f6j5kdsq-ew.a.run.app/posts/${id}`
        );
        const data: APIResponse = await response.json();
        setDataApi(data);
        setArticle(data.article);
        setRelatedKeywords(data.related_keywords);
        setArrayKeywords(data.array_keywords);
        setSummary(data.summary);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMessage(true);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <>
        <div className="container_loading">
          <div className="loading_text">
            <p>Analyzing the article ...</p>
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
            <p>Details not available ... Please try later </p>
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
 
 {relatedKeywords ? (
      Object.entries(relatedKeywords).map(([keyword, value]) => {
        if (value > 0) {
          return (
            <ul key={keyword}>
              <li>{keyword}</li>
              <li>{value}</li>
            </ul>
          );
        }
      })
    ) : (
      <div>
      If the score is more than 0, and you see this message, send this article to Slack Channel Muses Bug and ping kindly Tim
      </div>
    )}
    </div>
  );
}
