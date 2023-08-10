import { TableStatus } from "src/features/table/tableSlice";

export interface ArticleGateway {
    fetchArticles(status: TableStatus): Promise<Article[]>;
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
    articles: AllArticles[];
    gosearts: AllArticles[];
    bing_articles: AllArticles[];
  }
export   interface DataArticle {
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
    score_second: number | null;
    category_label: string | null;
  }
  export interface ApiTest {
    message: string;
}
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

export interface ArticleGateway {
    fetchArticles(status: TableStatus): Promise<Article[]>;
  }
  