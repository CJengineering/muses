import { createPresentationArticles } from './createPresentation';
import { fetchArticles } from './fetchArticles';

import { createStore } from 'src/app/store';
import { TableStatus } from 'src/features/table/tableSlice';
import { Article } from './article';

export interface ArticleGateway {
  fetchArticles(status: TableStatus): Promise<Article[]>;
}

export class ApiArticleGateway implements ArticleGateway {
  async fetchArticles(status: TableStatus): Promise<Article[]> {
    const response = await fetch(`http://127.0.0.1:3000/articles/${id}`);
    const data: any = await response.json();
    return data;
  }
}

export class InMemoryArticleGateway implements ArticleGateway {
  async fetchArticles(status: TableStatus): Promise<Article[]> {
    return [
      {
        id: 123,
        title: 'Vladimir is winning the war',
        link: 'russiatoday.fr',
        url_link: undefined,
        published: new Date('2021-01-01'),
        posted: true,
        key_word: {
          key_word: 'Vladimir',
        },
        created_at: new Date('2021-01-01'),
        updated_at: new Date('2021-01-01'),
        key_word_id: 100,
        score: 32,
        score_second: undefined,
        category_label: 'Politics',
      },
    ];
  }
}

it('should fetch articles from our api', async () => {
  const articleGateway = new InMemoryArticleGateway();
  const store = createStore({ articleGateway });
  const dispatch = store.dispatch;
  await dispatch(fetchArticles('published'));
  const presentation = createPresentationArticles(store.getState());
  expect(presentation).toEqual({
    articles: [
      {
        id: '123',
        title: 'Vladimir is winning the war',
        link: 'russiatoday.fr',
        url_link: undefined,
        published: new Date('2021-01-01'),
        posted: true,
        key_word: {
          key_word: 'Vladimir',
        },
        created_at: new Date('2021-01-01'),
        updated_at: new Date('2021-01-01'),
        key_word_id: 100,
        score: 32,
        score_second: undefined,
        category_label: 'Politics',
      },
    ],
  });
});
