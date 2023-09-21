import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, SearchFilterAttribute } from 'src/app/interfaces';

export const initialState: {
  ids: number[];
  posts: Record<number, Post>;
} = { ids: [], posts: {} };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsFetched: (state, action: PayloadAction<Post[]>) => {
      console.log('postsFetched reducer is called');
      for (const post of action.payload) {
        state.posts[post.id] = post;
      }
      state.ids = [...action.payload.map((post) => post.id)];
    },
    postsFiltred: (state, action: PayloadAction <SearchFilterAttribute>)=>{
      const { source, keywords, dateStart, dateEnd, score } = action.payload;

      if (
        (!source?.length || !keywords?.length || !dateStart || !dateEnd || !score) &&
        (!source && !keywords && !dateStart && !dateEnd && !score)
      ) {
        // If all filter attributes are empty, reset the state to initial state
        state.ids = initialState.ids;
        state.posts = initialState.posts;
        return;
      }

      state.ids = Object.values(state.posts)
        .filter(post => {
          const sourceFilter = !source || !source.length || source.includes(post.source);
          const keywordsFilter = !keywords || !keywords.length || keywords.includes(post.key_word.key_word);
          const dateStartFilter = !dateStart || new Date(post.published) >= dateStart;
          const dateEndFilter = !dateEnd || new Date(post.published) <= dateEnd;
          const scoreFilter = !score || (post.score >= score[0] && post.score <= score[1]);

          return sourceFilter && keywordsFilter && dateStartFilter && dateEndFilter && scoreFilter;
        })
        .map(post => post.id);
    },
    selectedPostFiltred: (state, action: PayloadAction<number>)=>{
      const postIdToDelete = action.payload;

      // Create a new object excluding the post with the specified ID
      const newPosts = Object.fromEntries(
        Object.entries(state.posts).filter(([key, post]) => post.id !== postIdToDelete)
      );
    
      return {
        ...state,
        posts: newPosts,
        ids: state.ids.filter(id => id !== postIdToDelete)
      };
      
    }
  },
});
export const { postsFetched, postsFiltred,selectedPostFiltred} =
  postsSlice.actions;
export default postsSlice.reducer;