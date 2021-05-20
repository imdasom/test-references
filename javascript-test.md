# jest VS mocha

두 프레임워크는 장단점이 있습니다. jest는 test runner, matcher, assertion을 모두 내장하고 있습니다. jest를 설치하는 것만으로 바로 테스트코드를 작성할 수 있습니다. 다만 테스트코드 실행시간은 mocha보다 느리다고 합니다. mocha는 원하는 assertion, mocking, spy 라이브러리를 선택할 수 있게 되어 있어서 선택권이 많습니다. 

jest: 이럴 때 사용하세요:

- **특별한 설정 없이 빠르게 시작하고 싶다.** 여러 라이브러리를 설정하고 익히는 시간을 줄이고 싶다.
- **테스트코드를 작성하는 시간을 줄이는 것이 더 중요하다.** 테스트코드를 실행하는 시간이 느려도 작성하는 시간을 단축하고 싶다.

mocha: 이럴 때 사용하세요:

- **원하는 mock, spy, assertion 라이브러리를 꼭 사용하고 싶다.** 테스트환경을 세팅할 시간이 충분하고 사용하고 싶은 라이브러리가 있다. ****
- **테스트코드 실행시간이 무엇보다 중요하다.** 테스트코드를 돌리는데 많은 시간이 소요되면 테스트코드를 더 이상 돌리지 않을 것이다. 빠르게, 자주 테스트 코드를 돌리고 수정해야 한다.

앨리스 프로젝트 도입을 위해 mocha, jest 모두 세팅을 해보았습니다. 

처음에는 테스트 실행속도가 중요하다고 생각하여 mocha를 선택하였으나 의존라이브러리가 많이 필요하고 세팅이 복잡하였습니다. 특히 mock, spy를 위한 세팅이 어려웠습니다.

그래서 중간에 jest로 변경을 했는데, mock, spy 모두 내장하고 있어서 jest만 설치하면 금방 테스트코드를 작성할 수 있었습니다.

앨리스 프로젝트에서는 테스트코드 실행속도보다 작성 효율에 비중을 두고 jest를 사용하고자 합니다.

# 테스트작성할때

케이스를 먼저 쭉 나열하고, 하나씩 작업하면 좋습니다. given/when/then 구분도 꼭 해주세요.

```java
describe('login', () => {
	test('[PreCondition체크] 아이디 > EmptyText라면 > Exception 던져야 한다', () => {
	  //given
		//when
		//then
	});
  test('[PreCondition체크] 비밀번호 > EmptyText라면 > Exception 던져야 한다', () => {
		//given
		//when
		//then	
	});
  test('[로직체크] 로그인 성공시 > storage에 access_token을 저장해야 한다', () => {
		//given
		//when
		//then
	});
});
```

자바스크립트는 비동기작업이 많습니다. 필요한 경우 테스트코드에 꼭 async/await 명시해주세요

```tsx
describe('login', () => {
	test('getUserInfo', async () => {  // 여기 꼭 async 표기
		//given
		...

		//when
		const response = await service.getUserInfo(userNo);  // 여기 꼭 await로 흐름 제어하기

		//then
		expect(...).toBe(...);
	})
});
```

# jest

### assert

주로 사용하게 될 assertion들입니다

`toBe()` reference로 비교

`toStrictEqual()` 배열/객체 deep equality (깊은 비교)

### Spy

```tsx

test('repository를 호출해야 한다', async () => {
      //given
      const network = new AxiosNetwork();
      const productRepository: ProductRepository = new ProductRepository(network);
      const productService: ProductService = new ProductService(productRepository);
      const param: ProductListSearchEntity = new ProductListSearchEntity();
      
			const productRepositorySpy = jest
        .spyOn(productRepository, 'list')
        .mockImplementation(() => Promise.resolve(new ProductListWrapEntity()));

      //when
      await productService.getProductList(param);

      //then
      expect(productRepositorySpy).toBeCalledTimes(1);
    });
```

`spyOn` : 대상 객체와 메서드를 명시하면 스파이객체가 리턴됩니다. 스파이객체는 assertion에서 다양하게 사용됩니다.

`toBeCalledTimes` : 해당 메서드가 몇 번 호출되었는지 검증할 수 있습니다.

`toBeCalledWith` : 해당 메서드가 어떤 argument로 호출되었는지도 검증할 수 있습니다.

그 밖에 많은 API가 제공되고 있어서 [jest문서](https://jestjs.io/docs/en/expect#tohavebeencalled)를 참고해주세요!

# Service Layer

서비스레이어는 Unit Test를 진행합니다. 의존객체는 모두 Mock처리합니다. 오직 서비스레이어의 로직만을 테스트합니다.

- 전체코드

    ```tsx
    class ProductService {
      /**
       * 이 메서드를 테스트합니다!
       * repository에서 null을 리턴하면 EMPTY객체를 반환합니다.
       * repository가 한번 호출되어야 합니다.
       */
    	getProductList(param: ProductListSearchEntity): Promise<ProductListWrapModel> {
        const productListWrapMapper = new ProductListWrapMapper();
        return this.productRepository.list(param).then((response) => {
          if (response == null) {
            return ProductListWrapModel.EMPTY;
          }
          return productListWrapMapper.map(response);
        });
      }
    }
    ```

    ```tsx
    describe('getProductList', () => {

        afterEach(() => {
          MockManager.clearMock(); // MockManager에게 Mock초기화를 요청합니다.
        });

        test('리스트결과가 없으면 EMPTY 객체가 반환되어야 한다', async () => {
          //given
          const network = new AxiosNetwork(null);
          const productRepository: ProductRepository = new ProductRepository(network);
          const productService: ProductService = new ProductService(productRepository);
          const param: ProductListSearchEntity = new ProductListSearchEntity();
          const productRepositorySpy = MockManager.mock(productRepository, 'list', () =>
            Promise.resolve(null) // repository에서 null을 리턴하는 상황을 가정합니다
          );

          //when
          const listWrapEntity = await productService.getProductList(param);

          //then
          expect(listWrapEntity).not.toBeNull();
        });

        test('repository를 1번 호출해야 한다', async () => {
          //given
          const network = new AxiosNetwork(null);
          const productRepository: ProductRepository = new ProductRepository(network);
          const productService: ProductService = new ProductService(productRepository);
          const param: ProductListSearchEntity = new ProductListSearchEntity();
          const productRepositorySpy = MockManager.mock(productRepository, 'list', () =>
            Promise.resolve(new ProductListWrapEntity()) // respository가 실제로 호출되지 않도록 특정값을 리턴합니다
          );

          //when
          await productService.getProductList(param);

          //then
          expect(productRepositorySpy).toBeCalledTimes(1);
        });

      });
    ```

### Repository에서 null을 반환한 경우 테스트

```tsx
test('리스트결과가 없으면 EMPTY 객체가 반환되어야 한다', async () => {
  //given
  const network = new AxiosNetwork(null);
  const productRepository: ProductRepository = new ProductRepository(network);
  const productService: ProductService = new ProductService(productRepository);
  const param: ProductListSearchEntity = new ProductListSearchEntity();

  /**
   * repository에서 null을 리턴하는 상황을 가정합니다
   */
  const productRepositorySpy = MockManager.mock(productRepository, 'list', () =>
    Promise.resolve(null) 
  );

  //when
  const listWrapEntity = await productService.getProductList(param);

  //then
	/**
   * EMPTY 객체가 리턴되었는지 체크합니다
   */
  expect(listWrapEntity).not.toBeNull();
});
```

### 메서드가 의도한대로 호출되었는지 테스트

```tsx
test('repository를 1번 호출해야 한다', async () => {
  //given
  const network = new AxiosNetwork(null);
  const productRepository: ProductRepository = new ProductRepository(network);
  const productService: ProductService = new ProductService(productRepository);
  const param: ProductListSearchEntity = new ProductListSearchEntity();

  /**
	 * repository가 실제로 잘 호출되는지는 중요하지 않습니다. 
	 * 호출되었는지 여부만 판단하기 위해 mock을 만듭니다.
   * repository가 실제로 호출되지 않도록 특정값을 리턴합니다
	 */
  const productRepositorySpy = MockManager.mock(productRepository, 'list', () =>
    Promise.resolve(new ProductListWrapEntity())
  );

  //when
  await productService.getProductList(param);

  //then
	/**
	 * 원하는대로 repository가 1번 호출되었는지 체크합니다.
   * 더 나아가, given에서 주어진 파라미터에 따라 호출결과가 달라지는 것도 체크할 수 있습니다.
   */
  expect(productRepositorySpy).toBeCalledTimes(1);
});
```

# Test Utils

## MockManager

```tsx
export default class MockManager {

  /**
   * MockInstance를 글로벌하게 관리합니다.
   */
  private static _mockInstance: jest.MockInstance<any, any>[] = [];

  /**
   * 타겟객체와 메서드명, mocking할 콜백을 입력하면 MockInstance를 반환해줍니다.
   * 타겟객체에서 특정 메서드만 mocking할 수 있습니다.
   */
  static mock(target: {}, method: string, mockFunction: any) {
    const mockInstance: jest.MockInstance<any, any> = jest
      // @ts-ignore
      .spyOn(target, method)
      .mockImplementation(mockFunction);
    this._mockInstance.push(mockInstance);
    return mockInstance;
  }

  /**
   * 현재 MockManager에 등록된 MockInstance를 원래 메서드로 되돌리고 인스턴스목록을 초기화합니다.
   */
  static clearMock() {
    this._mockInstance.forEach((mockInstance) => {
      mockInstance.mockRestore();
    });
    this._mockInstance = [];
  }
}
```

생성된 mock 인스턴스를 관리하는 글로벌객체입니다. jest 라이브러리를 한번 wrapping해주는 역할과 동시에 여러 테스트케이스에서 생성된 mock 인스턴스를 초기화하는 등의 관리를 해줍니다.

`clearMock` 은 mockImplementation한 메서드를 원래 메서드로 되돌려주는 역할을 합니다. 

### MockManager가 나온 배경

테스트가 끝날 때마다 mock객체를 초기화해주는 코드를 모든 테스트케이스에 삽입해야 했습니다. 추후 관리와 가독성을 위해 MockManager라는 글로벌 객체를 만들게 되었습니다.

```tsx
describe('getProductList', () => {
    afterEach(() => {
      // MockManager.clearMock();
    });
    test('리스트결과가 없으면 EMPTY 객체가 반환되어야 한다', async () => {
      //given
      const network = new AxiosNetwork(null);
      const productRepository: ProductRepository = new ProductRepository(network);
      const productService: ProductService = new ProductService(productRepository);
      const param: ProductListSearchEntity = new ProductListSearchEntity();
      const productRepositorySpy = jest
        .spyOn(productRepository, 'list')
        .mockImplementation(() => Promise.resolve(null));

      //when
      const listWrapEntity = await productService.getProductList(param);

      //then
      expect(listWrapEntity).not.toBeNull();

      //clear
      productRepositorySpy.mockRestore();  // mock이 여러개라면? 관리하기 어려워짐
    });
    test('repository를 1번 호출해야 한다', async () => {
      //given
      const network = new AxiosNetwork(null);
      const productRepository: ProductRepository = new ProductRepository(network);
      const productService: ProductService = new ProductService(productRepository);
      const param: ProductListSearchEntity = new ProductListSearchEntity();
      const productRepositorySpy = jest
        .spyOn(productRepository, 'list')
        .mockImplementation(() => Promise.resolve(new ProductListWrapEntity()));

      //when
      await productService.getProductList(param);

      //then
      expect(productRepositorySpy).toBeCalledTimes(1);
      
      //clear
      productRepositorySpy.mockRestore();   // mock이 여러개라면? 관리하기 어려워짐
    });
  });
```
