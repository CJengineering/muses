import { buildInitStore, createStore } from 'src/app/store';
import { InMemoryPostGateway } from '../features/posts/postsGateway';
import { fetchPosts } from '../features/posts/fetchPosts';
import { createPresentationPosts } from 'src/presentation/createPresentation';
import { Post, SearchFilterAttribute } from 'src/app/interfaces';
import { postsFiltred, selectedPostFiltred } from 'src/features/posts/postsSlice';
it('should fetch articles from our api', async () => {
  const postGateway = new InMemoryPostGateway();
  const store = createStore({ postGateway });
  await store.dispatch<any>(fetchPosts('archived'));
  const presentation = createPresentationPosts(store.getState());

  expect(presentation[0]).toEqual({
    id: 1,
    title:
      'Example Title 1Example Title 1Example Title 1Example Title 1Example Title 1Example Title 1Example Tit',
    link: 'https://example.com/link1',
    date: new Date('2023-09-18'),
    keyword: 'example keyword 1',
    score: 32,
    source: 'bing',
  });
});
const ids = [1, 2];
const articles: Record<number, Post> = {
  1: {
    id: 1,
    title: 'Article 1',
    link: 'News Paper',

    published: '2021-01-01',

    key_word: {
      key_word: 'Testing',
    },
    created_at: '2024-01-01',
    updated_at: '2021-01-01',
    key_word_id: 100,
    score: 32,
    score_second: 5,
    category_label: 'Cure Cancer',
    source: 'google',
  },
  2: {
    id: 2,
    title: 'Article 2',
    link: 'france.fr',

    published: '2021-01-01',
    key_word: {
      key_word: 'Community Jameel',
    },
    created_at: '2022-01-01',
    updated_at: '2022-01-01',
    key_word_id: 100,
    score: 20,
    score_second: 15,
    category_label: 'Politics',
    source: 'bing',
  },
};
it('should filter the state', async () => {
  const postGateway = new InMemoryPostGateway();
  const filterAtributes: SearchFilterAttribute = {
    source: ['bing','google'],
  };
  const store = createStore(
    { postGateway },
    {
      ...buildInitStore(),
      posts: { ids: ids, posts: articles },
    }
  );
  store.dispatch(postsFiltred(filterAtributes));
  
  const presentation = createPresentationPosts(store.getState());

  expect(presentation[0].source).toEqual('google');
  expect(presentation[0].keyword).toEqual('Testing')
});
it('should filter change the state', async () => {
    const postGateway = new InMemoryPostGateway();
    const filterAtributes: SearchFilterAttribute = {
      source: ['bing','google'],
    };
    const filterAtributesVOID :SearchFilterAttribute={
        source: [],
    }
    const store = createStore(
      { postGateway },
      {
        ...buildInitStore(),
        posts: { ids: ids, posts: articles },
      }
    );
    store.dispatch(postsFiltred(filterAtributes));
 
    store.dispatch(postsFiltred(filterAtributesVOID))
    
    const presentation = createPresentationPosts(store.getState());
  
    expect(presentation[0].source).toEqual('google');
    expect(presentation[0].keyword).toEqual('Testing')
  });
  it('should filter after fetch ', async () => {
    const postGateway = new InMemoryPostGateway();
    const filterAtributes: SearchFilterAttribute = {
      source: ['google'],
    };
    const filterAtributesVOID :SearchFilterAttribute={
        source: [],
    }
    const store = createStore(
      { postGateway },
      {
        ...buildInitStore(),
        posts: { ids: ids, posts: articles },
      }
    );
    store.dispatch(postsFiltred(filterAtributes));
    await store.dispatch<any>(fetchPosts('archived'));
    store.dispatch(postsFiltred(filterAtributes));
    
    const presentation = createPresentationPosts(store.getState());
  
    expect(presentation).toEqual([]);
    expect(presentation).toEqual([])
  });
  it('should filter the article on check ', async ()=>{
    const postGateway= new InMemoryPostGateway();
    const store = createStore(
        { postGateway },
        {
          ...buildInitStore(),
          posts: { ids: ids, posts: articles },
        }
      );
      store.dispatch(selectedPostFiltred(2))
      const presentation = createPresentationPosts(store.getState());
      expect(presentation[0].id).toEqual(1)


  })