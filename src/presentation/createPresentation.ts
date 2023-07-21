import { Article } from "src/app/interfaces";
import { RootState } from "src/app/store";

export const createPresentation = (state: RootState) => {
    return { status: state.table.status };
  };
  export type PresentationArticles = {
    articles: Record<number, Article>;
    ids: number[];
  };
  export const createPresentationArticles = (
    state: RootState
  ): PresentationArticles => {
    return { articles: state.articles.articles, ids: state.articles.ids };
  };
