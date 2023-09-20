import { NewTableStatus } from 'src/features/new table selctor/newTableSlice';
import { TableStatus } from 'src/features/table/tableSlice';
export type IconType = "bing" | "google" | "google_alert" | "custom";

export interface ArticleGateway {
  fetchArticles(): Promise<Article[]>;
}
export interface SearchFilterAttribute {
  source?: IconType[];
  keywords?: string[];
  dateStart?: Date;
  dateEnd?: Date;
  score?:[number, number]
}
export interface PostGateway{
  fetchPosts(url: NewTableStatus):Promise<Post[]>;
}
export type RowNewProps = {
  id: number;
  title: string;
  link: string;
  date: Date;
  keyword: string;
  score: number;
  source: IconType;
};
export interface Post {
  id: number;
  key_word_id: number;
  title: string;
  published: string;
  link: string;
  category_label: string | null;
  score: number;
  score_second: number;
  source: IconType;
  created_at: string;
  updated_at: string;
  key_word: {
      key_word: string;
  };
}

export interface DashBoardGateway {
  fetchDashboard(): Promise<DashboardData[]>;
}
export interface AllArticles extends Iterable<AllArticles> {
  id: number;
  key_word_id: number;
  title: string;
  url_link: string;
  score: number;
  score_second: number;
  created_at: string;
  updated_at: string;
}
export interface DashboardData {
  name: string;
  count: number;
}
export interface Data {
  title: any;
  id: number;
  key_word: string;
  rss_url: string;
  created_at: string;
  updated_at: string;
  factiva: boolean;
  articles: Article[];
  gosearts: Article[];
  bing_articles: Article[];
}
export interface DataArticle {
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
  score_second: number;
  category_label: string;
}
export interface ApiTest {
  message: string;
}
export interface Article {
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
  score: number;
  score_second: number;
  category_label: string;
  source: "articles" | "gosearts" | "bing_articles";// Add this attribute
}


