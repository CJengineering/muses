import { Post, PostGateway } from 'src/app/interfaces';
import { NewTableStatus } from '../new table selctor/newTableSlice';

export class ApiPostGateway implements PostGateway {
  async fetchPosts(url: NewTableStatus): Promise<Post[]> {
    let id = 1;
    const response = await fetch(
      ` https://new-alerts-e4f6j5kdsq-ew.a.run.app/posts?status=${url}`
    );
    const data: any = await response.json();
    return data;
  }
}

export class InMemoryPostGateway implements PostGateway {
  async fetchPosts(): Promise<Post[]> {
    return [
      {
        id: 1,
        title: 'Example Title 1Example Title 1Example Title 1Example Title 1Example Title 1Example Title 1Example Tit',
        link: 'https://example.com/link1',

        published: '2023-09-18',

        key_word: {
          key_word: 'example keyword 1',
        },
        created_at: '2021-01-01',
        updated_at: '2021-01-01',
        key_word_id: 100,
        score: 32,
        score_second: 4,
        category_label: 'example keyword 1',
        source: 'bing',
      },
    ];
  }
}


