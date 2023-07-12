export interface Article {
  id: number;
  title: string;
  link: string;
  url_link: string | undefined;
  published: Date;
  posted: boolean;
  key_word: {
    key_word: string;
  };
  created_at: Date;
  updated_at: Date;
  key_word_id: number;
  score: number | undefined;
  score_second: number | undefined;
  category_label: string | undefined;
}
