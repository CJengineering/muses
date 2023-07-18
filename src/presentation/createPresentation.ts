import { RootState } from "src/app/store";

export const createPresentation = (state: RootState) => {
    return { status: state.table.status };
  };

  export const createPresentationArticles = (state: RootState) => {
    return { data: state.articles };
  };

  export const createPresentationApi = (state: RootState) => {
    return { message: state.api };
  };