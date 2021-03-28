# tdd
test references & examples
https://imdasom.github.io/tdd

# 기본개념
### assertion
### mock
### spy

# 테스트케이스 구성 이해하기

### given - init - when - then

일반적으로 테스트 케이스를 작성할 때 크게 `given-when-then` 단락 구성을 많이 사용합니다. 저는 mock/spy 세팅 등의 로직이 길어지면서 가독성이 떨어지는 것을 방지하기 위해 `init`단락을 추가하여 `given-init-when-then` 구조로 작성합니다.

```javascript
describe('AuthService', () => {
  test('login', () => {
    //given
    //init
    //when
    //then
  })
});
```
### given
테스트케이스 최상단에는 항상 `given`을 명시합니다. `given`에는 테스트의 목적을 한 눈에 파악할 수 있도록 정의해야 합니다. 저는 크게 `TARGET`, `EXPECT`, `ACTUAL`로 구분을 합니다. 해석하면 다음과 같습니다; `TARGET`을 대상으로 테스트를 작성했을 때 `EXPECT`값이 예상되고 `ACTUAL`은 실제 비교값이 된다.

```javascript
describe('AuthService', () => {
  test('login', async () => {
    // given
    const TARGET = {
      id: 'alice@itsdcode.com',
      password: '1234',
    };
    const EXPECT = {
      accessToken: 'ABCD1234',
    };
    const ACTUAL = {
      accessToken: null,
    };
    
    // init
    ...
      
    // when
    ...
    
    // then
    expect(ACTUAL.accessToken).toBe(EXPECT.accessToken);
  });
});
```

테스트하는 값을 `TARGET`, `EXPECT`, `ACTUAL`으로 구성하는 것은 필수가 아니지만 테스트를 한눈에 파악하기 쉽게 만들어주는 장점이 있습니다. 테스트케이스 코드가 조금이라도 길어지면 어떤 값이 대상이 되는지 파악하기 힘들어집니다!
```javascript
describe('login', () => {
  test('id로 로그인하면 > 예상한 accessToken이 저장되어 있어야 한다', async () => {
    // given
    const authRepository = new AuthRepository();
    const localStorageMock = new LocalStorageMock();
    const authService = new AuthService(authRepository, localStorageMock);
    const authRepositorySpy = MockManager.mock(
      authRepository,
      authRepository.logIn.name,
      () => {
        return Promise.resolve({data: {accessToken: 'ABCD1234'}});
      }
    );

    // when
    await authService.logIn('imdasom', '1234');
    const accessToken = ACTUAL.accessToken = localStorageMock.get('ACCESS_TOKEN');

    // then
    expect(accessToken).toBe('ABCD1234');
  });
});
```
```javascript
describe('login', () => {
  test('id로 로그인하면 > 예상한 accessToken이 저장되어 있어야 한다', async () => {
    // given
    const TARGET = {
      id: 'imdasom',
      password: '1234'
    };
    const EXPECT = {
      accessToken: 'ABCD1234'
    };
    const ACTUAL = {
      accessToken: null
    };

    // init
    const authRepository = new AuthRepository();
    const localStorageMock = new LocalStorageMock();
    const authService = new AuthService(authRepository, localStorageMock);
    const authRepositorySpy = MockManager.mock(
      authRepository,
      authRepository.logIn.name,
      () => {
        return Promise.resolve({data: {accessToken: EXPECT.accessToken}});
      }
    );

    // when
    await authService.logIn(TARGET.id, TARGET.password);
    ACTUAL.accessToken = localStorageMock.get('ACCESS_TOKEN');

    // then
    expect(ACTUAL.accessToken).toBe(EXPECT.accessToken);
  });
});
```

### init
`init`단락은 필요한 인스턴스를 생성하거나, `mock`,`spy` 객체의 초기화를 해주는 단락입니다. 필요하지 않다면 생략해도 되는 단락입니다. 초기화를 위해 `given`에 주어진 값을 사용하기도 합니다.

```javascript
describe('AuthService', () => {
  test('login', () => {
    // given
    ...
    
    // init
    const authRepository = new AuthRepository();
    const localStorageMock = new LocalStorageMock();
    const authService = new AuthService(authRepository, localStorageMock);
    const authServiceSpy = MockManager.mock(authRepository, authRepository.logIn.name, () => {
      return Promise.resolve({ data: { accessToken: EXPECT.accessToken } });
    });
    
    // when
    ...
    
    // then
    ...
  });
});
```

### when
테스트하려는 함수를 실행하고 `ACTUAL`값을 할당하는 단락입니다. 

```javascript
describe('AuthService', () => {
  test('login', async () => {
    // given
    ...
    
    // init
    ...
    
    // when
    await authService.logIn(TARGET.id, TARGET.password);
    ACTUAL.accessToken = localStorageMock.get('ACCESS_TOKEN');
    
    // then
    ...
  });
});
```

### then
`EXPECT`와 `ACTUAL`을 비교하는 단락입니다. 단순 값을 비교하거나, Exception을 체크하는 등 테스트의 목적에 맞게 `assert`문을 작성합니다. 기본적으로 테스트케이스를 명확하게 하기 위해, 하나의 테스트케이스는 하나의 `assert`문만 존재해야 합니다. `then`단락에는 하나의 `assert`문만 작성하도록 합니다.

```javascript
describe('AuthService', () => {
  test('login', async () => {
    // given
    ...
    
    // init
    ...
    
    // when
    ...
      
    // then
    await Assert.toThrowException(ACTUAL.logIn, EXPECT.exception); // exception 발생 체크
  });
});
```

# 테스트케이스 작성순서
아이디와 비밀번호로 로그인하는 함수를 테스트하는 예제를 통해 테스트케이스를 작성하는 순서를 알아보겠습니다. `login(id, password)` 함수는 로그인에 성공하면 `accessToken`이 `storage`에 저장되는 내부로직을 가지고 있습니다.

### given, then 먼저 정의하기
테스트케이스를 구현하기에 앞서 `given`과 `then`을 가장 먼저 작성하는 것이 좋습니다. 내가 이 테스트로 `expect`하는 것이 무엇인지 명확하게 정의를 해놓고 시작하는 것이 좋습니다. `ACTUAL`은 `when`단락에서 할당이 되므로 null으로 초기화해줍니다.

```javascript
describe('login', () => {
  test('로그인 성공하면 > 예상한 accessToken이 저장되어 있어야 한다', async () => {
    // given
    const TARGET = {
      id: 'imdasom',
      password: '1234'
    };
    const EXPECT = {
      accessToken: 'ABCD1234'
    };
    const ACTUAL = {
      accessToken: null
    };

    // init
    ...

    // when
    ...

    // then
    expect(ACTUAL.accessToken).toBe(EXPECT.accessToken);
  }); 
});
```

### init 작성하기
테스트의 목적을 명확하게 정의했다면, `login` 함수를 실행할 수 있는 환경을 만들어줍니다. `AuthService.login`함수는 실제로는 서버에 API를 호출하여 `accessToken`을 얻어옵니다. 하지만 단위 테스트에서는 실제 서버에 영향을 받지 않도록 해야 합니다. 

`AuthService.login()`에서 서버를 호출하는 함수는 `AuthRepository.login()`입니다. 서버를 호출하는 것처럼 보이게 하기 위해 `AuthRepository.login()`함수를 `mocking` 해줍니다.   
```javascript
describe('login', () => {
  test('id로 로그인하면 > 예상한 accessToken이 저장되어 있어야 한다', async () => {
    // given
    const TARGET = {
      id: 'imdasom',
      password: '1234'
    };
    const EXPECT = {
      accessToken: 'ABCD1234'
    };
    const ACTUAL = {
      accessToken: null
    };

    // init
    const authRepository = new AuthRepository();
    const localStorageMock = new LocalStorageMock();
    const authService = new AuthService(authRepository, localStorageMock);
    const authRepositorySpy = MockManager.mock(
      authRepository,             // authRepository의
      authRepository.logIn.name,  // logIn 함수가 호출되면
      () => {                     // 이 코드블록을 실행하도록 mocking합니다 (서버API를 호출하는 것이 아니라, 우리가 원하는 값이 리턴되도록)
        return Promise.resolve({data: {accessToken: EXPECT.accessToken}});
      }
    );

    // when
    ...

    // then
    expect(ACTUAL.accessToken).toBe(EXPECT.accessToken);
  });
});
```

### when 작성하기
`when`절에서는 테스트 대상이 되는 `AuthService.login` 함수를 실행시키고, `ACTUAL`에 값을 할당해줍니다. 함수를 실행할 때 대상이 되는 값은 `given`에 정의한 `TARGET`을 이용합니다.
```javascript
describe('login', () => {
  test('id로 로그인하면 > 예상한 accessToken이 저장되어 있어야 한다', async () => {
    // given
    const TARGET = {
      id: 'imdasom',
      password: '1234'
    };
    const EXPECT = {
      accessToken: 'ABCD1234'
    };
    const ACTUAL = {
      accessToken: null
    };

    // init
    const authRepository = new AuthRepository();
    const localStorageMock = new LocalStorageMock();
    const authService = new AuthService(authRepository, localStorageMock);
    const authRepositorySpy = MockManager.mock(
      authRepository,
      authRepository.logIn.name,
      () => {
        return Promise.resolve({data: {accessToken: EXPECT.accessToken}});
      }
    );

    // when
    await authService.logIn(TARGET.id, TARGET.password);
    ACTUAL.accessToken = localStorageMock.get('ACCESS_TOKEN');

    // then
    expect(ACTUAL.accessToken).toBe(EXPECT.accessToken);
  });
});
```

### then 작성하기
`then`절에서는 앞서 정했던 `EXPECT`과 `ACTUAL` 값을 비교합니다. 테스트가 성공했는지, 실패했는지 판단하는 부분입니다. 테스트케이스 하나 당 assert문을 한개만 작성하도록 합니다.
```javascript
describe('login', () => {
  test('id로 로그인하면 > 예상한 accessToken이 저장되어 있어야 한다', async () => {
    // given
    const TARGET = {
      id: 'imdasom',
      password: '1234'
    };
    const EXPECT = {
      accessToken: 'ABCD1234'
    };
    const ACTUAL = {
      accessToken: null
    };

    // init
    ...

    // when
    ...

    // then
    expect(ACTUAL.accessToken).toBe(EXPECT.accessToken);
  });
});
```
