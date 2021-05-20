# unittest VS pytest

두 프레임워크는 모두 권위 있는 프로젝트에서 사용되고, pytest가 더 널리 쓰이는 것으로 보입니다. pytest의 독특하고 확장된 테스트방식이 별로라면 unittest를, 간결하고 아름다운 테스트가 중요하다면 pytest를 사용하세요.

unittest: 이럴 때 사용하세요:

- **pytest의 독특한 테스트 방식이 정말 생산성을 향상시킬 수 있는지 의심스럽다.** 다른 언어의 테스팅 프레임워크와 비슷한 정도만으로도 충분하다.
- **픽스처 주입이나 assert 문 재작성으로 인한 잠재적인 문제를 떠안고 싶지 않다.** 예기치 못한 동작으로 인해 고생을 하느니 차라리 코드 몇 줄 더 치는 게 현명한 선택이라 생각한다.

pytest: 이럴 때 사용하세요:

- **간결하고 아름다운 코드가 무엇보다 중요하다.** 테스트 코드를 작성하기 위해 클래스를 사용하는 건 파이썬스럽지 못하다.
- **매개변수화된 픽스처나 병렬 테스트와 같은 고급 기능이 필요하다.**

# 참고

[https://www.bangseongbeom.com/unittest-vs-pytest.html](https://www.bangseongbeom.com/unittest-vs-pytest.html)
