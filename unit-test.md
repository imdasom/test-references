# What
![https://vuejsdevelopers.com/2019/04/01/vue-testing-unit-vs-e2e/](https://vuejsdevelopers.com/images/posts/versions/unit_vs_e2e_1200.webp)

## Unit Test
![https://martinfowler.com/bliki/UnitTest.html](https://martinfowler.com/bliki/images/unitTest/sketch.png)

유닛테스트는 소스코드의 특정 모듈이 의도된 대로 작동하는지 검증하는 절차이다. 즉, 모든 함수에 대해 테스트케이스를 작성하는 절차를 말한다. 넓은 범위의 의미로는 서비스를 구성하는 부분을 각각 테스트한다고 생각하면 될 것 같다.

이상적으로 각 테스트 케이스는 서로 분리되어야 한다. 테스트하려는 함수가 다른 모듈에 의존하고 있다면 Mock객체를 활용하여 테스트케이스를 작성한다. 예를 들어 API를 사용해 데이터를 가져온뒤 가공하는 함수를 테스트한다면 API로 데이터를 가져오는 부분을 Mock API로 만들어서 사용해야 한다.

## E2E Test
![https://medium.com/free-code-camp/why-end-to-end-testing-is-important-for-your-team-cb7eb0ec1504](https://miro.medium.com/max/1400/1*KMFrX776LOznXpsJSfQXVw.jpeg)

E2E테스트는 End-To-End의 약자로 종단(Endpoint) 간 사용자의 입장에서 테스트 하는 것을 의미한다. 일반적인 웹서비스를 예로 들면, 사이트에서 클릭 이벤트가 일어났을 때 프론트엔드, 백엔드, DB등 관련된 모든 모듈이 원하는 대로 동작하는지 확인하는 테스트이다. 유닛테스트가 서비스의 특정 범위만을 테스트하는 것과는 반대이다.

# Why

### 문제점 발견이 쉽다

프로그램을 작은 단위로 쪼개서 테스트하기 때문에 문제가 발생했을 때 어느 부분에서 잘못되었는지 파악하기 쉽다. 문제발생시 디버깅하는 시간을 줄임으로 여유로운 프로그래밍을 가능하게 하고 프로그램의 안정성을 높일 수 있다.

### 변경이 쉽다

언제라도 유닛테스트를 믿고 리팩토링 할 수 있다. 프로그램 유지보수에 있어 가장 두려운 것은 사이드이펙트이다.  소스코드 수정으로 인해 변경이 예상되는 부분을 모두 인지할 수 없다. 하지만 튼튼한 테스트케이스를 가지고 있다면 코드를 고치더라도 문제점을 금방 파악할 수 있고, 수정된 코드가 정확하게 동작하는지 쉽게 알 수 있다. 리팩토링의 두려움이 없다면 소스코드의 품질을 더 높일 수 있지 않을까.

# More

### 테스트 커버리지 측정

테스트케이스가 모든 런타임의 경우의 수에 정확하게 동작한다고 확신할 수 있는가? 결국 테스트 커버리지도 함께 측정이 되어야 한다. 테스트케이스의 개수보다 품질이 중요하다는 것을 인지하며 작성해야 한다.

가장 좋은 것은 소스코드 내부에서 경우의 수를 최소화해야 하도록 작성해야 하고, 발생할 수 있는 경우의 수는 파악하여 테스트케이스로 관리되어야 한다.

### 테스트케이스 관리

테스트케이스도 결국엔 유지보수의 대상이다. 소스코드 수정에 따라 테스트케이스도 함께 유지보수 되어야 함을 염두에 두고 작성해야 한다.

다른 코드와 마찬가지로 팀원들과 테스트케이스에 대한 규칙을 정하고 실행해야 의미있는 테스트코드로 관리가 될 수 있다. 

# How

### 프레임워크 선택

테스트를 위해서는 다음 3가지 기능이 필요하다. 각 플랫폼과 상황에 맞는 모듈을 선택하여 사용한다.

1. Test Runner

    작성한 테스트케이스를 실행해주는 역할을 한다. 테스트케이스가 브라우저환경을 대상으로 실행되어야 하는지, 노드환경을 기반으로 실행되어야 하는지 등 원하는 실행환경을 지원하는 러너를 사용하면 된다. 

2. Test Matcher

    테스트케이스 안에서 expect값과 actual값을 비교해주는 역할을 한다. 실제 테스트시에는 단순 값보다 Object의 비교가 많을텐데, matcher를 사용해주면 보다 안정적이고 가독성있게 테스트를 작성할 수 있다. 

    ```jsx
    test('1 + 1 should be 2', () => {

    	// 1+1은 2라는 것을 검증하고 싶을 때
    	const actual = sum(1, 1);
    	const expect = 2;
    	
    	// matcher를 사용하지 않는 경우 검증
    	if (actual !== expect) {
    	  throw new Exception('assert error');
    	} 
    	
    	// matcher를 사용한 경우 (should.js)
    	actual.should.equal(expect);

    });
    ```

3. Test Mock

    테스트 범위를 제한하고 싶을 때 Mock 객체를 사용할 수 있다. 테스트하려는 메서드가 다른 객체와 협력관계를 가지고 있다면 협력관계에 있는 객체도 같이 테스트하는 셈이 된다. 메서드의 로직만 테스트하고 싶다면 협력에 있는 객체들을 Mock으로 만들어서 테스트 범위에서 제한할 수 있다.

    ```java
    @Test
    public void mockTest() {

    	Ncode ncode = mock(Ncode.class);

      when(ncode.getTemperature()).thenReturn(10); //특정함수 호출시, 특정값을 반환하도록 설정

      assertTrue(ncode.getTemperature() == 10);

    }
    ```

4. Test Spy, Test Report Tool 등 

    테스트를 도와주는 여러 툴이 있으므로 필요에 맞게 사용하면 된다

### 테스트케이스 작성 요령

1. 공통적으로 테스트환경을 세팅하는 클래스(혹은 함수)를 작성해서 사용해야 한다.

    테스트케이스를 작성하다보면 중복코드가 많이 발생하므로 context를 설정하는 코드나 코드 전반에 걸친 중복코드를 잘 관리해야 한다. 

    ```java
    /**
     *  intergration 테스트컨텍스트 세팅하는 클래스
     */
    @RunWith(SpringRunner.class)
    @SpringBootTest(classes = ApiApp.class)
    @AutoConfigureMockMvc
    @ActiveProfile(TestProfile.TEST)
    @Transactional
    @Ignore
    public class IntergrationTest {

    	@Autowired protected MockMvc mvc;
      @Autowired protected ObjectMapper objectMapper;
      ...

    }
    ```

    ```java
    /**
     * repository 테스트컨텍스트 세팅하는 클래스
     */
    @RunWith(SpringRunner.class)
    @DataJpaTest
    @ActiveProfiles(TestProfile.TEST)
    @AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
    @Ignore
    public class RepositoryTest {
    	...
    }
    ```

    ```java
    /**
     *  실제 테스트코드 작성시에는 테스트관심사에 맞게 클래스를 상속받아서 일관되게 작성해야 한다
     */
    public class UserServiceTest extends IntergrationTest {

    	@Autowired private UserService userService;

    	@Test
    	public void 회원리스트_이름으로검색하는경우() throws Exception {
    		...
    	}

    	@Test
    	public void 회원리스트_회원번호로검색하는경우() throws Exception {
    		...
    	}

    	...
    } 
    ```

2. Test Suite로 케이스를 관리한다

    여러 개의 테스트케이스를 그룹화하여 작성한다. 하나의 메서드에서 여러개의 테스트케이스가 파생되므로 한 그룹으로 묶을 수 있다.

    ```jsx
    describe('ProductStore', () => {

    	describe('createProduct()', () => {
    		it('상품명을 입력하지 않은 경우', () => {
    			...
    		});
    		it('할인금액이 상품금액보다 큰 경우', () => {
    			...
    		});
    	});

    	describe('updateProduct()', () => {
    		it('새로운 이미지를 추가한 경우', () => {
    			...
    		});
    	});

    });
    ```

3. 테스트관심사에 맞게 Mock객체, 테스트데이터를 준비한다.

    백엔드의 경우 → 실제 데이터베이스에 테스트를 진행하게 되면 데이터베이스에 의존하는 코드가 되어 시간이 지날수록 실패할 확률이 높아진다. 테스트에 필요한 데이터를 insert해주어야 한다. 

    클라이언트의 경우 → 실제 API에 테스트를 진행하게 되면 실제 데이터에 의존하는 코드가 되므로, 필요한 API는 Mock API로 만든다. 

### 테스트케이스 작성 유의사항

1. Positive/Negetive 케이스 작성하기

    보통 사용자들은 소프트웨어를 정상적으로만 이용하지 않기 때문에 네거티브 테스트가 잘 되어 있는 제품의 품질이 더 높다.

    Positive Test → 정상적인 값을 입력했을 때를 테스트하는 것

    Negative Test → 비정상적인 값을 입력했을 때를 테스트하는 것

2. 제목과 설명을 간결하게 작성하기

    테스트케이스를 표현하는 제목과 설명은 간결하면서 핵심을 포함하도록 작성해야 한다

3. given/when/then을 명확하게 작성하기

    테스트내용은 `given사전조건` / `when테스트로직실행` / `then결과내용` 에 대한 내용을 명확하고 간결하게 표현해야 한다

4. 재사용에 용이하게 작성하기

    좋은 테스트케이스는 재사용이 가능하고 팀에게 장기적인 활용도를 제공한다. 테스트케이스를 매번 다시 작성하는 대신 재사용하는 것으로 차후에 시간을 절약할 것이다.
    
    
# References

- 유닛테스트란 [https://ko.wikipedia.org/wiki/유닛_테스트](https://ko.wikipedia.org/wiki/%EC%9C%A0%EB%8B%9B_%ED%85%8C%EC%8A%A4%ED%8A%B8)
- Mokito [https://www.crocus.co.kr/1556](https://www.crocus.co.kr/1556)
- 테스트의종류 [https://priceless.tistory.com/283](https://priceless.tistory.com/283)
- 테스트케이스 어떻게 작성하나? [http://koonhous.blogspot.com/2017/07/how-to-create-test-case.html](http://koonhous.blogspot.com/2017/07/how-to-create-test-case.html)
- Spring Guide 테스트전략 [https://cheese10yun.github.io/spring-guide-test-1/](https://cheese10yun.github.io/spring-guide-test-1/)
