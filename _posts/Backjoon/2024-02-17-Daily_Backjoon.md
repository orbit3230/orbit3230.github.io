---
layout: post
title: "[데일리 백준] 1001, 1008, 2557, 10869, 10926, 10998, 1003"
excerpt: "6 bronze, 1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-17
last_modified_at: 2024-02-18
---
## Bronze
### [1001][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_1001 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String inputLine = input.readLine();
		String[] lines = inputLine.split(" ");
		
		int a = Integer.parseInt(lines[0]);
		int b = Integer.parseInt(lines[1]);
		
		output.write(String.valueOf(a-b));
		
		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 입출력시 `Scanner`와 `System.out`을 쓰는 편보다,  
  **`BufferedReader`와 `BufferedWriter`를 쓰는 편이 런타임이 훨씬 줄어든다.**
    - 사실 `Scanner` -> `BufferedReader`로의 변경은 차이가 꽤나 크지만,
    `System.out` -> `BufferedReader`로의 변경은 차이가 그닥 크지 않다.  
  <br>
  - 사용법에 대해서는 위 코드를 살펴보며 익히자. 주의사항으로 다음과 같은 것들이 존재한다.  

    - (1) 예외처리가 필요하다. `throws IOException` 또는 직접 예외처리(`try-catch`)  

    - (2) `BufferedReader`의 `read()`는 정말 한 글자 한 글자 씩 읽는다.  
    새 줄 문자 `\n`도 하나의 글자로 인식해서, 자칫하면 입력을 받는 반복문을 탈출하지 못 할 수도 있다.  

    - (3) `BufferedReader`의 `readLine()`을 그래서 주로 쓰는데, 다만 `String` 문자열을 리턴하기 때문에 쪼개기 및 형변환이 필요할 수 있다.  

    - (4) `BufferedWriter`의 `write()` 메소드의 인자로는 `String` 문자열을 주어야 한다. 필요 시 또 형변환을 해줘야 하는 셈.

    - (5) `BufferedWriter` 객체는 마지막에 `flush()` 및 `close()` 해주어야 한다. 이것은 필수다.  
    <br>
  - 앞으로 백준 문제를 `java`로 풀 때 계속해서 등장할 것인데, 코멘트는 이번 한 번만 달도록 하겠다.

</div>
</details>

### [1008][def2]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_1008 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String inputLine = input.readLine();
		String[] lines = inputLine.split(" ");
		
		double a = Double.parseDouble(lines[0]);
		double b = Double.parseDouble(lines[1]);
		
		output.write(String.valueOf(a/b));
		
		output.flush();
		output.close();

	}

}
```

<br>

### [2557][def3]

```java
public class P_2557 {

	public static void main(String[] args) {
		
		System.out.println("Hello World!");

	}

}
```

<br>

### [10869](https://www.acmicpc.net/problem/10869)

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_10869 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String inputLine = input.readLine();
		String[] lines = inputLine.split(" ");
		
		int a = Integer.parseInt(lines[0]);
		int b = Integer.parseInt(lines[1]);
		
		output.write(String.valueOf(a+b) + "\n");
		output.write(String.valueOf(a-b) + "\n");
		output.write(String.valueOf(a*b) + "\n");
		output.write(String.valueOf(a/b) + "\n");
		output.write(String.valueOf(a%b) + "\n");
		
		output.flush();
		output.close();

	}

}
```

<br>

### [10926][def6]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_10926 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String inputLine = input.readLine();
		
		output.write(inputLine + "??!");
		
		output.flush();
		output.close();

	}

}
```

<br>

### [10998][def4]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_10998 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String inputLine = input.readLine();
		String[] lines = inputLine.split(" ");
		
		int a = Integer.parseInt(lines[0]);
		int b = Integer.parseInt(lines[1]);
		
		output.write(String.valueOf(a*b));
		
		output.flush();
		output.close();

	}

}
```

<br>

## Silver
### [1003][def5]

```java
public class P_1003 {

	static int[] fibonacci;
	
	public static void main(String[] args) throws IOException{

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int times = Integer.parseInt(input.readLine());
		
		int n;
		// 깨달았다.
		// 피보나치 함수에서 0을 리턴하는 횟수는 fibonacci(n-1)이고
		// 피보나치 함수에서 1을 리턴하는 횟수는 fibonacci(n)과 같구나
		for(int i = 0 ; i < times ; i++) {
			n = Integer.parseInt(input.readLine());
			// n == 0 과 n == 1인 경우는 특이 케이스이므로 예외처리.
			if(n == 0)
				output.write("1 0\n");
			else if(n == 1)
				output.write("0 1\n");
			else {
				fibonacci(n);	// 피보나치 수열을 배열에 채우자
				output.write(fibonacci[n-1] + " " + fibonacci[n] + "\n");
			}	
		}

		output.flush();
		output.close();
		
	}
	
	public static void fibonacci(int n) {
		fibonacci = new int[n + 1]; // 헷갈리니까 0번 방 버릴거임
		fibonacci[1] = 1;
		fibonacci[2] = 1;
		
		for(int index = 3 ; index <= n ; index++) {
			fibonacci[index] = fibonacci[index - 1] + fibonacci[index - 2];
		}
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 문제 해결 과정  

  - (1) 우선 우리에게 친숙한 피보나치 수열 문제 해결 방식인  
  재귀함수를 사용한 해결을 시도했다.  
  하지만 런타임 초과로 에러가 났다.  

    - 그도 그럴 것이, 재귀함수의 스택이 깊어지면 피보나치의 경우 재귀 표현이 2개씩 들어있기 때문에, 제곱 수준으로 기하 급수적으로 늘어난다.  
  
  - (2) 우선 재귀함수적 표현을 반복문으로 교체 했다.  
  모든 재귀함수는 반복문으로 표현할 수 있고, 그렇게 하는 것이 무조건 시간효율성 측면에서 유리하기 때문이다.  

  - (3) 피보나치 수열을 Tree 형태(가지를 뻗어나가는 형태)로 그려보다가,  
  0이 나오는 횟수와 1이 나오는 횟수의 규칙성을 파악했다.
  0이 나오는 횟수는 `fibonacci(n-1)`과 같았고, 1이 나오는 횟수는 `fibonacci(n)`과 같음을 깨달았다.  

  - (4) 결국 0과 1이 나온 횟수를 담아두던 배열을 없앴고,  
  대신 피보나치 수열을 n번째까지 담은 배열을 전역변수로 만들어  
  한 번의 계산 후 꺼내 쓰는 방식으로 문제를 해결했다.  

- 느낀점
  
  - 백준을 이제 풀기 시작했지만,  
  우리가 갖고있는 틀에 박힌 풀이 지식을 부정하는 새로운 풀이를 요구하는 듯 했다.  
  또한 문제를 일차원적으로 보고 판단하여 실행에 옮기기 보다는  
  문제의 본질을 꿰뚫어보고 속에 숨어있는 규칙성이나 그러한 것을 찾길 바라는 게 느껴졌다. 

</div>
</details> 

[def]: https://www.acmicpc.net/problem/1001
[def2]: https://www.acmicpc.net/problem/1008
[def3]: https://www.acmicpc.net/problem/2557
[def4]: https://www.acmicpc.net/problem/10998
[def5]: https://www.acmicpc.net/problem/1003
[def6]: https://www.acmicpc.net/problem/10926