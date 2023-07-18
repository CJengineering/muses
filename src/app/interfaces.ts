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
 export interface Data {
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
  export interface ApiTest {
    message: string;
}