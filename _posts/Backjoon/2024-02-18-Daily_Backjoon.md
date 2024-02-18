---
layout: post
title: "[데일리 백준] 18108, 10430, 2588, 11382, 10171, 10172, 1004, 2447"
excerpt: "6 bronze, 1 silver, 1 gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-18
last_modified_at: 2024-02-19
---
## Bronze
### [18108][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_18108 {

	public static void main(String[] args) throws IOException{
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int y = Integer.parseInt(input.readLine());
		
		output.write(String.valueOf(y - 543));
		
		output.flush();
		output.close();

	}

}
```

<br>

### [10430][def2]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_10430 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String[] line = input.readLine().split(" ");
		int[] abc = new int[3];
		for(int i = 0 ; i < 3 ; i++) 
			abc[i] = Integer.parseInt(line[i]);
		
		output.write(((abc[0] + abc[1]) % abc[2]) + "\n");
		output.write((((abc[0] % abc[2]) + (abc[1] % abc[2])) % abc[2]) + "\n");
		output.write(((abc[0] * abc[1]) % abc[2]) + "\n");
		output.write((((abc[0] % abc[2]) * (abc[1] % abc[2])) % abc[2]) + "\n");

		output.flush();
		output.close();
	}

}
```

<br>

### [2588][def3]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_2588 {

	public static void main(String[] args) throws IOException{
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String[] element = new String[2];
		
		for(int i = 0 ; i < element.length ; i++)
			element[i] = input.readLine();
		
		output.write(Integer.parseInt(element[0]) 
				* Integer.parseInt(element[1].charAt(2) + "") + "\n");
		output.write(Integer.parseInt(element[0]) 
				* Integer.parseInt(element[1].charAt(1) + "") + "\n");
		output.write(Integer.parseInt(element[0]) 
				* Integer.parseInt(element[1].charAt(0) + "") + "\n");
		output.write(Integer.parseInt(element[0]) 
				* Integer.parseInt(element[1]) + "\n");
		
		output.flush();
		output.close();

	}

}
```

<br>

### [11382][def4]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_11382 {

	public static void main(String[] args) throws IOException{
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String[] line = input.readLine().split(" ");
		
		output.write(String.valueOf(
				Long.parseLong(line[0]) + 
				Long.parseLong(line[1]) + 
				Long.parseLong(line[2])));
		
		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 너무 큰 수를 다룰 때 `Long`을 사용하자.

</div>
</details>

<br>

### [10171][def5]

```java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

public class P_10171 {

	public static void main(String[] args) throws IOException{
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		output.write("\\    /\\" + "\n");
		output.write(" )  ( ')" + "\n");
		output.write("(  /  )" + "\n");
		output.write(" \\(__)|" + "\n");
		
		output.flush();
		output.close();

	}

}
```

<br>

### [10172][def6]

```java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

public class P_10172 {

	public static void main(String[] args) throws IOException{
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		output.write("|\\_/|" + "\n");
		output.write("|q p|   /}" + "\n");
		output.write("( 0 )\"\"\"\\" + "\n");
		output.write("|\"^\"`    |" + "\n");
		output.write("||_/=\\\\__|" + "\n");
		
		output.flush();
		output.close();

	}

}
```

<br>

## Silver
### [1004][def7]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_1004 {

	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
	
	public static void main(String[] args) throws IOException{
		
		// 깨달은 것 :
		// 무조건 거쳐야하는 행성은  
		// 출발점이나 도착점을 무조건 원 안에 완전히 감싸야함.
		// 이 말을 다르게하면,
		// 원의 중심으로부터 출발점 or 도착점 까지의 거리보다
		// 그 원의 반지름이 더 길어야함.
		// 다만, 원이 출발점과 도착점을 모두 품으면 안 됨.
		
		int testCase = Integer.parseInt(input.readLine());
		int[] counting = new int[testCase]; // 테스트케이스 별 진입/이탈 횟수 기록
		
		for(int times = 0 ; times < testCase ; times++) {
			calculate(counting, times);
		}
		
		for(int count : counting) 
			output.write(count + "\n");

		output.flush();
		output.close();
	}
	/**
	 * 최소 행성계 진입/이탈 횟수를 계산해
	 * 결과를 배열에 적어주는 메소드.
	 * @param counting 결과를 입력해 둘 배열
	 * @param times 지금이 몇 번째 회차인지
	 */
	public static void calculate(int[] counting, int times) throws IOException {
		String[] line = input.readLine().split(" ");
		int startX = Integer.parseInt(line[0]);  // 시작점 x좌표
		int startY = Integer.parseInt(line[1]);  // 시작점 y좌표
		int endX = Integer.parseInt(line[2]);	 // 도착점 x좌표
		int endY = Integer.parseInt(line[3]);	 // 도착점 y좌표
		
		int numberOfPlanet = Integer.parseInt(input.readLine());  
		
		int planetX;				// 행성 x좌표
		int planetY;				// 행성 y좌표
		int planetRadius;			// 행성 반지름
		double startToPlanetDistance;	// 시작점 ~ 행성 거리
		double endToPlanetDistance;	// 도착점 ~ 행성 거리
		for(int i = 0 ; i < numberOfPlanet ; i++) {
			
			String[] planet = input.readLine().split(" ");
			planetX = Integer.parseInt(planet[0]);
			planetY = Integer.parseInt(planet[1]);
			planetRadius = Integer.parseInt(planet[2]);
			
			startToPlanetDistance = 
					Math.sqrt(Math.pow(startX - planetX, 2)
							+ Math.pow(startY - planetY, 2));
			endToPlanetDistance = 
					Math.sqrt(Math.pow(endX - planetX, 2)
							+ Math.pow(endY - planetY, 2));
			
			if(startToPlanetDistance < planetRadius ^ endToPlanetDistance < planetRadius) {
				counting[times]++;
			}
			
		}
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 조금만 생각하면 할 만 하다.

</div>
</details>

<br>

## Gold
### [2447][def8]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;

public class P_2447 {

	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
	
	public static void main(String[] args) throws IOException{

		int antilogarithm = Integer.parseInt(input.readLine());
		
		// k는 log_3(입력값) = log(입력값)/log3
		int k = (int)Math.round(Math.log(antilogarithm) / Math.log(3));
		
		// 패턴의 기본 값
		List<String> pattern = new ArrayList<>();
		pattern.add("*");
		for(int times = 1 ; times <= k ; times++) {
			pattern = getPattern(pattern, times);
		}
		
		for(String draw : pattern)
			output.write(draw + "\n");
		
		output.flush();
		output.close();
		
	}
	/**
	 * n번째에 그릴 패턴을 일정한 규칙으로 구한다.
	 * OOO
	 * OXO
	 * OOO
	 * @param pattern 이번 회차에 그려질 패턴
	 * @param times 지금이 몇 회차?
	 * @return 다음 사이클을 위해 패턴 공유
	 * @throws IOException 예외처리
	 */
	public static List<String> getPattern(List<String> lastPattern, int times) throws IOException{
		
		List<String> pattern = new ArrayList<>();
		
		String nextPattern;
		StringBuilder next;
		for(int i = 0 ; i < Math.pow(3, times) ; i++) {
			nextPattern = lastPattern.get(i % lastPattern.size());
			next = new StringBuilder(nextPattern);
			// 퐁당 할 차례
			if(i >= Math.pow(3, times-1) && i <= Math.pow(3, times-1) + Math.pow(3, times-1) - 1) {
				for(int j = 0 ; j < Math.pow(3, times-1) ; j++)
					next.append(" ");
				next.append(nextPattern);
				pattern.add(next.toString());
			}
			// 연속 세번 그릴 차례
			else {
				next.append(nextPattern).append(nextPattern).toString();
				pattern.add(next.toString());
			}
		}
		
		return pattern;
		
	}
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 특정 패턴을 파악하여 문제를 해결했다.

    - 조금 창피하지만, 메모장에 이렇게 적어가며 패턴을 알아냈다.  

	<details>
	<summary>사진</summary>
	<div markdown="1">

    ![2447_notepad][def9] 

	</div>
	</details>  
	<br>

  - k 값에 따라 분명이 규칙이 있으면서도  
  이를 반복문으로 옮기는 과정이 많이 어려웠다.  
  막막했고, 다시 풀어보라 해도 오래 걸릴 것 같다.  
  코드를 적으면서도 약간 직감에 의존한 것 같다.

  - 겨우 코드를 완성하였으나, 오답처리가 되어 곰곰히 한참을 찾았다.  
  알고보니 입력값이 `81`, 즉 `k = 4`일 때와 입력값이 `243`, 즉 `k = 5`일 때의 출력이 같았다.  
  구글링 끝에 알게 된 것은,  
  **`log_3(81) = 4`이고 `log_3(243) = 4.999...`라서 소수점이 버려지며 같은 값이 되어버린 것이다.**  
  따라서 소수점을 버리지 않고 반올림으로 치켜올림으로서 해결했다.  

  - 사실 나는 문제를 다소 어렵게 빙빙돌아서 푼 듯한 느낌이 있다.  
  문제를 다 푼 후 다른 사람들의 코드와 후기를 보았는데,  
  무슨 분할탐색 어쩌고 하면서 재귀함수나 어떤 깔끔한 형식으로 문제를 풀던데,  
  나도 많이 알아가야 할 길이 멀다는 것을 느꼈다.  
  나중에 실력을 향상하고 나서 다른 깔끔한 방식으로 풀어볼 필요가 있겠다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/18108
[def2]: https://www.acmicpc.net/problem/10430
[def3]: https://www.acmicpc.net/problem/2588
[def4]: https://www.acmicpc.net/problem/11382
[def5]: https://www.acmicpc.net/problem/10171
[def6]: https://www.acmicpc.net/problem/10172
[def7]: https://www.acmicpc.net/problem/1004
[def8]: https://www.acmicpc.net/problem/2447
[def9]: https://i.imgur.com/dshlkOI.png