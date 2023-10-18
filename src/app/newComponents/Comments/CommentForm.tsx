import {FormEvent, useState} from 'react'
interface CommentFormProps {
    userId: number;  
    articleId: number; 
    onCommentAdded: () => void;
  }
export default function CommentForm({userId, articleId, onCommentAdded}: CommentFormProps) {
    const [body, setBody] = useState('');
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        try {
          const response = await fetch('https://new-alerts-e4f6j5kdsq-ew.a.run.app/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              body: body,
              user_id: userId,
              post_id: articleId,
            }),
          });
    
          if (response.ok) {
            // Comment created successfully
            console.log('Comment created!');
            setBody('');
            onCommentAdded()
          } else {
            // Handle error if needed
            console.error('Error creating comment:', response.statusText);
          }
        } catch (error) {
          console.error('Error creating comment:', error);
        }
      };
  return (
    <form onSubmit={handleSubmit}>
    <div>
   
      <textarea
        id="body"
        name="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
    </div>
    <div>
      <input type="hidden" name="user_id" value={userId} />
      <input type="hidden" name="post_id" value={articleId} />
    </div>
    <div>
      <button type="submit">comment</button>
    </div>
  </form>
  )
}
