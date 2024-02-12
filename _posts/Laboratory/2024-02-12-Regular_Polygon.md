---
layout: post
title: "[연구실] 정다각형을 정확히 캔버스의 중앙에 그려보자"
excerpt: "정다각형의 중심이 캔버스 중앙에 오도록 그리는 방법에 대한 고찰"

tags:
  - [연구실, Java]

toc: true

date: 2024-02-12
last_modified_at: 2024-02-12
---
## Turtle 프로그램 실습
### 1. 사서 고생하기
- 캔버스 위에서 그림을 그릴 수 있는 거북이 객체를 다룬 Turtle 클래스가 있다.  
<sup> @author : Nicholas Seward (nicholas.seward@gmail.com)  
<br>

- 프로그래밍 기초 7주차 과제에서, 교수님께서 시험 전 주라는 명목으로  
학생들의 과제 부담을 덜어주기 위해, 아주 쉽고 재밌는  
Turtle 객체를 사용한 캔버스에 사각형 그리기 과제로 한 주 과제를 퉁치셨다.  
<br>

- 당시 과제에서 turtle 클래스와 test 클래스의 모든 코드를 제공했고,  
단지 test클래스의 불필요한 중복코드를 반복문으로 묶어주고  
실행 결과가 같은지만 판단하면 되는 아주 쉬운 과제였다.  

```java
public class TurtleDrive1 {

	public static void main(String[] args) {

		// 캔버스 크기 
		final int CANVAS_WIDTH = 400; // 픽셀 단위
		final int CANVAS_HEIGHT = 400; // 픽셀 단위

		// 이동 거리는 픽셀 단위로 표시한다.
		final double STEP = 200.0;	// 한 번 움직일 때의 이동 거리
		// 회전하는 정도는  각도 단위로 표시한다.
		final double ANGLE = 90.0;	// 한 번 회전할 때의 회전 각도

		// 캔버스 크기 설정
		Turtle.setCanvasSize(CANVAS_WIDTH,  CANVAS_HEIGHT);

		// 구성자를 실행하여 거북이 인스턴스를 하나 구성한다.
		// (-100, -100) 위치에 있는 Turtle 인스턴스 하나를 구성한다.
		// 캔버스 한 가운데 좌표가 (0, 0)이다. 
		// 오른쪽으로 갈 수록 x좌표가 증가하고, 아래로 내려올수록 y좌표가 증가한다.
		// Turtle 인스턴스는 처음 만들어지면 오른쪽을 바라보고 있는 상태로 만들어진다.
		Turtle turtle  = new Turtle(-100.0, -100.0);	

		// 아래에서 Turtle 타입 객체인 turtle에게 여러 가지 메소드를 호출한다(일을 시킨다).

		turtle.speed(500.0);	// 거북이가 움직이는 속력을 지정한다. (miliseconds 단위)

		for(int i = 0 ; i < 4 ; i++) {
			turtle.forward(STEP);
			turtle.left(ANGLE);
		}

	}

}
```

![turtle][def]

- 사실 Turtle 객체의 작동방법을 읽으려면 Turtle 클래스의 2500줄이 넘는 코드 때문에 너무나도 힘들겠지만,  
작동법이 너무 직관적이기에 그럴 필요는 없었다.  
그리고 교수님이 제공한 test클래스에 상세한 주석이 적혀있었기 때문이다.  
<br>

- 하지만 당시 갓 20살이 된 대학교 1학년의 나는 남들처럼 5분만에 과제 뚝딱하고 놀러나가기 싫었다.  
이제 막 첫 학기의 첫 중간고사를 치를 시기였기 때문에 프로그래밍 지식은 얕디 얕은 수준이었지만, 그 때까지 배운 것들을 활용하고 싶었다.  
<br>

### 2. 정사각형(X), 정다각형(O)
- 일단 나는 `STEP`-이동거리, `ANGLE`-각도 라는 두 변수가 단순 상수로 띡 정해진 것이 맘에 안들었다.  
그래서 우선 몇 다각형을 그릴 건지, 도형의 선분개수를 사용자로부터 입력 받을 수 있게 바꿨다.  

```java
Scanner input = new Scanner(System.in);
System.out.print("몇 다각형을 그리고 싶은가?: ");
final int NUMBER_OF_ANGLES = input.nextInt();
input.close();
```

- `NUMBER_OF_ANGLES`라는 final 변수를 새로 만들었고, 이에 따라 기존 정사각형에 맞춰져있던 `STEP`과 `ANGLE`도 새로 작성했다.

```java
// 이동 거리는 픽셀 단위로 표시한다.
final double STEP = CANVAS_WIDTH * 2 / NUMBER_OF_ANGLES;	// 한 번 움직일 때의 이동 거리
// 회전하는 정도는  각도 단위로 표시한다.
final double ANGLE = 360.0 / NUMBER_OF_ANGLES;	// 한 번 회전할 때의 회전 각도
```

- `STEP` final 변수의 값은 당시에 직감적으로 설정했는데, 지금은 왜 그렇게 했는지 추론이 잘 되지 않는다.  
이유는 잘 모르겠지만, 막 600~700각형 이상의 스케일이 아닌 이상  
아주 적당한 크기로 도형이 그려진다.  
무슨 근거로 저 값을 썼었을까?  

- 사실 `STEP` 값이 어떻든 별로 중요하지 않다.  
`ANGLE = 360 / NUMBER_OF_ANGLES`이기만 하면 정다각형을 그릴 준비는 끝났다.  
그런데 문제가 있다.  
기존처럼 turtle의 출발지점을 (-100, -100)으로 고정하면,  
내가 원하는 위치에 그림을 그리지 않는다. 도형이 캔버스 밖으로 넘치기도 한다.  
<br>

### 3. 정다각형을 캔버스의 중앙에 그려보자

- 몇 다각형을 그릴지는 변수다. 바뀌는 값이고,  
얼마나 이동할 지를 말하는 `STEP`과,  
얼마나 회전할 지(각)를 말하는 `ANGLE`역시  
`NUMBER_OF_ANGLES`에 따라 다르게 설정된다.  

- 정다각형이 몇다각형이든, 캔버스의 중앙에 그리려면  
turtle의 출발지점 또한 `NUMBER_OF_ANGLES`의 영향을 받아야 한다.  
정다각형을 이리저리 그려보고, 쪼개보면서 생각해보자.  
가장 쉬운 정삼각형부터 보자.  
![triangle_1][def2]

- 일단 출발지점의 x값은 쉽게 구한 듯 하다.  
단순 이동거리 `STEP`의 절반인 `STEP / 2`,  
시작지점은 3사분면이므로 음수인 `-(STEP / 2)`로 구해졌다.

- 이제 이를 바탕으로 출발지점의 y값을 구해보자.
![triangle_2][def3]

- 이런 식으로 출발지점의 y값 또한 구하였다. 이를 코드로 작성해보자.

```java
// 구성자를 실행하여 거북이 인스턴스를 하나 구성한다.
// 그림을 정 가운데 위치에 그릴 수 있는 Turtle 인스턴스 하나를 구성한다.
// 캔버스 한 가운데 좌표가 (0, 0)이다. 
// 오른쪽으로 갈 수록 x좌표가 증가하고, 아래로 내려올수록 y좌표가 증가한다.
// Turtle 인스턴스는 처음 만들어지면 오른쪽을 바라보고 있는 상태로 만들어진다.
Turtle turtle  = new Turtle(-(STEP/2), -((STEP/2)*Math.tan((180-ANGLE)/2)));
```
- <span style = "color: crimson"> 그런데 이건 틀렸다.</span>  
[java.lang.math][def4] api 문서의 `Math.tan(a)` 함수 설명을 잘 보면 이렇게 되어있다.
![tangent][def5]
- `tan(a)` 함수의 인자로는 ***degree*** 가 아닌, ***radian*** 값을 주어야 한다.  

- 따라서 다음과 같이 작성해야한다.

```java
// 구성자를 실행하여 거북이 인스턴스를 하나 구성한다.
// 그림을 정 가운데 위치에 그릴 수 있는 Turtle 인스턴스 하나를 구성한다.
// 캔버스 한 가운데 좌표가 (0, 0)이다. 
// 오른쪽으로 갈 수록 x좌표가 증가하고, 아래로 내려올수록 y좌표가 증가한다.
// Turtle 인스턴스는 처음 만들어지면 오른쪽을 바라보고 있는 상태로 만들어진다.
Turtle turtle  = new Turtle(-(STEP/2), -((STEP/2)*Math.tan((180-ANGLE)/2*(Math.PI/180))));
```

- 코드 전체는 이러하다.

```java
import java.util.Scanner;

// sample client for testing

public class TurtleDrive2 {

	public static void main(String[] args) {

		// 캔버스 크기 
		final int CANVAS_WIDTH = 400; // 픽셀 단위
		final int CANVAS_HEIGHT = 400; // 픽셀 단위
		
		Scanner input = new Scanner(System.in);
		System.out.print("몇 다각형을 그리고 싶은가?: ");
		final int NUMBER_OF_ANGLES = input.nextInt();
		input.close();
		// 이동 거리는 픽셀 단위로 표시한다.
		final double STEP = CANVAS_WIDTH * 2 / NUMBER_OF_ANGLES;	// 한 번 움직일 때의 이동 거리
		// 회전하는 정도는  각도 단위로 표시한다.
		final double ANGLE = 360.0 / NUMBER_OF_ANGLES;	// 한 번 회전할 때의 회전 각도

		// 캔버스 크기 설정
		Turtle.setCanvasSize(CANVAS_WIDTH,  CANVAS_HEIGHT);

		// 구성자를 실행하여 거북이 인스턴스를 하나 구성한다.
		// 그림을 정 가운데 위치에 그릴 수 있는 Turtle 인스턴스 하나를 구성한다.
		// 캔버스 한 가운데 좌표가 (0, 0)이다. 
		// 오른쪽으로 갈 수록 x좌표가 증가하고, 아래로 내려올수록 y좌표가 증가한다.
		// Turtle 인스턴스는 처음 만들어지면 오른쪽을 바라보고 있는 상태로 만들어진다.
		Turtle turtle  = new Turtle(-(STEP/2), -((STEP/2)*Math.tan((180-ANGLE)/2*(Math.PI/180))));	

		// 아래에서 Turtle 타입 객체인 turtle에게 여러 가지 메소드를 호출한다(일을 시킨다).

		turtle.speed(500.0);	// 거북이가 움직이는 속력을 지정한다. (miliseconds 단위)

		for(int i = 0 ; i < NUMBER_OF_ANGLES ; i++) {
			turtle.forward(STEP);
			turtle.left(ANGLE);
		}

	}

}
```

## 마치며
- 사실 단순한 내용인데,  
대학교 입학한 지 얼마 되지않았던 2021년 4월의 내가 삼각함수라는 개념을 되새기면서  
과제를 스스로 심화ver 으로 풀었다는 사실이 새삼 대단했던 것 같아서  
그 때의 문제풀이를 글로 남기기 위해 작성했다.


[def]: https://i.imgur.com/G1YwhIr.png
[def2]: https://i.imgur.com/TXkUBnj.png
[def3]: https://i.imgur.com/KuNyf9s.png
[def4]: https://download.java.net/java/GA/jdk14/docs/api/java.base/java/lang/Math.html
[def5]: https://i.imgur.com/xYZ3gPk.png