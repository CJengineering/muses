import { Article, DashboardData } from 'src/app/interfaces';
import { RootState } from 'src/app/store';

export const createPresentation = (state: RootState) => {
  return { status: state.table.status };
};
export type PresentationArticles = {
  articles: Record<number, Article>;
  ids: number[];
};
export type PrsentationFilterToggle ={
  status: boolean;
}
export type PresentationDashboardData = {
  dashboard: DashboardData[];
};
export const createPresentationFilterToggle =(state: RootState): PrsentationFilterToggle =>{
   return {  status: state.filterToggle.status}
}
export const createPresentationArticles = (
  state: RootState
): PresentationArticles => {
  return { articles: state.articles.articles, ids: state.articles.ids };
};
export const createPresentationDashboardData = (
  state: RootState
): PresentationDashboardData => {
  return { dashboard: state.dashboard.dashboardData };
};
