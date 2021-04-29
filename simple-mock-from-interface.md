인터페이스로부터 Mock객체를 간단하게 만드는 방법

```typescript
import { ISearchService, SearchService } from './SearchService';
import { ISearchRepository } from '../../../data/repositories/SearchRepository';

/**
 * 다음과 같이 {} as ISearchRepository와 같이 선언하여 간단하게 목객체를 만들 수 있다
 * 필요한 Mock Method는 각 테스트안에서 initialize해주면 된다
 */
const searchRepository: ISearchRepository = {} as ISearchRepository; 
const searchService: ISearchService = new SearchService(searchRepository);

describe('SearchService', () => {
  test('getPopularSearchWord', async () => {
    // given
    const EXPECT = {
      list: ['A.P.C', 'AMI', 'CELINE'],
    };
    const ACTUAL: { list: string[] } = {
      list: [],
    };

    // init
    searchRepository.getPopularSearchWord = () =>
      Promise.resolve({ data: { status: 200, message: '', data: EXPECT.list } });

    // when
    ACTUAL.list = await searchService.getPopularKeywords();

    // then
    expect(ACTUAL.list).toStrictEqual(EXPECT.list);
  });
});

```
