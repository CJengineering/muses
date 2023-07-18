import { RootState } from 'src/app/store';
import { Article } from './article';

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
