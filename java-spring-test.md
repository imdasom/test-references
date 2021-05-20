# junit VS spock

두 프레임워크 모두 많이 사용되고 있습니다. spock가 junit에 비해 편리한 기능을 많이 제공하고 있는 것은 사실이지만 junit도 다양한 테스트를 하기에 절대 부족함이 없습니다.

spock에는 mock, spy 기능을 내장하고 있지만, junit은 mock기능이 없어서 mock라이브러리를 별도로 설치해야 합니다. 테스트 파라미터 설정이나 에러 메세지도 spock가 더 편리한 기능을 제공합니다. 

junit: 이럴때 사용하세요:

- 별다른 설정 없이 테스트하고 싶다. 기본적인 테스트 기능만 있으면 된다.
- 테스트코드를 작성할 시간이 많지 않다. 빨리 작성해야 한다.

spock: 이럴때 사용하세요:

- 테스트케이스를 좀 더 간결하고 가독성있게 작성하고 싶다.
- 테스트케이스를 작성할 시간이 확보되어 있다.
- groovy 언어 장벽은 문제가 되지 않는다!

# spock (+ groovy) 테스트하기

[Spock](http://spockframework.org/)

## spock, groovy 의존 라이브러리 설치

```groovy
testCompile('org.spockframework:spock-core:1.1-groovy-2.4') // Spock 의존성 추가
testCompile('org.spockframework:spock-spring:1.1-groovy-2.4') // Spock 의존성 추가

apply plugin: 'groovy' // groovy 지원
```

## 테스트코드

```groovy
class ServiceTest extends Specification {
	
	def "495를 반올림하면 500이 된다"() {
    
    // given, when, then 키워드를 필수로 사용해야 합니다.

		given:
		BigDecimal 금액 = BigDecimal.valueOf(495);

		when:
		BigDecimal 반올림금액 = 금액.setScale(-1, RoundingMode.HALF_UP)

		then:
		반올림금액 == 500
	}

  def "숫자 2개가 입력되었을 때 둘 중 큰 값을 반환해야 한다"() {
		expect:
		Math.max(a, b) == c

		where:       // when+then의 역할을 한다. 개인적으로 이 기능이 참 편리했습니다.
		a | b | c
    5 | 1 | 5
    3 | 9 | 9
	}

}
```

# 참고

Spock소개 [https://jojoldu.tistory.com/228](https://jojoldu.tistory.com/228)

Junit-Spock비교 [https://d2.naver.com/helloworld/568425](https://d2.naver.com/helloworld/568425)
