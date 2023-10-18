import { dividerClasses } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import CommentForm from '../Comments/CommentForm';
import { Flare } from '@mui/icons-material';
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
interface Comment {
  id: number;
  body: string;
  user_id: number;
  post_id: number;
  created_at: string;
  updated_at: string;
}

interface APIResponse {
  article: Article;
  related_keywords: RelatedKeywords;
  array_keywords: number;
  summary: string;
  comments: Comment[];
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
  const userId = Number(localStorage.getItem('id'));
  const [loading, setLoading] = useState(true);
  const [loadComments, setLoadComments] = useState(false);
  const userName = (id: number) => {
    switch (id) {
      case 1:
        return 'Nat';
      case 2:
        return 'Tim';
      case 3:
        return 'Sabrina';
      case 4:
        return 'Melissa';
      default:
        return ''; // Handle the case when id is not 1, 2, 3, or 4
    }
  };
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
  const fetchComments = async () => {
    setLoadComments(true);
    try {
      const response = await fetch(
        `https://new-alerts-e4f6j5kdsq-ew.a.run.app/posts/${id}`
      );
      const data: APIResponse = await response.json();
      setDataApi(data);

      setLoadComments(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(true);
      setLoading(false);
    }
  };
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
    <>
      <div>
        <div>
          {dataApi && dataApi.comments && (
            <div>
              <h2>Comments</h2>
              {loadComments ? <div style={{color:'green'}}>loading comments</div> : null }
              {dataApi.comments.map((comment) => (
                <div key={comment.id} style={{display:'flex', columnGap:'8px'}}>
                  <p> <strong>{userName(comment.user_id)}</strong>: </p>
                  <p>{comment.body}</p>
                  <p> commented on : { new Date(comment.created_at).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}</p>

                </div>
              ))}
            </div>
          )}
          <h2>Add Comment</h2>
        
          <CommentForm
            userId={userId}
            articleId={id}
            onCommentAdded={fetchComments}
          />
        </div>
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
            If the score is more than 0, and you see this message, send this
            article to Slack Channel Muses Bug and ping kindly Tim
          </div>
        )}
        {relatedKeywords &&
          Object.values(relatedKeywords).reduce(
            (acc, value) => acc + value,
            0
          ) === 0 && <div>No Keywords in this article</div>}
      </div>
    </>
  );
}
