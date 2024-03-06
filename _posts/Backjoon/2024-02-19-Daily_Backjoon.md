---
layout: post
title: "[데일리 백준] 1330, 9498, 2753, 14681, 2884, 2525, 2480, 1010, 2448, 10993"
excerpt: "7 bronze, 1 silver, 2 gold"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-19
last_modified_at: 2024-02-20
---
## Bronze
### [1330][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_1330 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String[] line = input.readLine().split(" ");
		int a = Integer.parseInt(line[0]);
		int b = Integer.parseInt(line[1]);
		
		if(a > b) 
			output.write(">");
		else if(a < b)
			output.write("<");
		else
			output.write("==");	
		
		output.flush();
		output.close();
	}
	
}
```
<br>

### [9498][def2]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_1330 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int score = Integer.parseInt(input.readLine());
		
		if(score >= 90)
			output.write("A");
		else if(score >= 80)
			output.write("B");
		else if(score >= 70)
			output.write("C");
		else if(score >= 60)
			output.write("D");
		else
			output.write("F");
		
		output.flush();
		output.close();
	}
	
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - `switch-case` 문으로도 물론 가능하다.

</div>
</details>

<br>

### [2753][def3]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_2753 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int year = Integer.parseInt(input.readLine());
		
		if((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))
			output.write("1");
		else
			output.write("0");
		
		output.flush();
		output.close();
	}
	
}
```

<br>

### [14681][def4]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_14681 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int x = Integer.parseInt(input.readLine());
		int y = Integer.parseInt(input.readLine());
		
		if(x > 0)
			if(y > 0)
				output.write("1");
			else
				output.write("4");
		else
			if(y > 0)
				output.write("2");
			else
				output.write("3");
		
		output.flush();
		output.close();
	}
	
}
```

<br>

### [2884][def5]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_2884 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String[] time = input.readLine().split(" ");
		
		int h = Integer.parseInt(time[0]);
		int m = Integer.parseInt(time[1]);
		
		if(m >= 45)
			m -= 45;
		else {
			if(h == 0)
				h = 23;
			else
				h--;
			m += 15;
		}
		
		output.write(h + " " + m);
		
		output.flush();
		output.close();
	}
	
}
```

<br>

### [2525][def6]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_2525 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String[] time = input.readLine().split(" ");
		
		int h = Integer.parseInt(time[0]);
		int m = Integer.parseInt(time[1]);
		
		int cooking = Integer.parseInt(input.readLine());
		
		int afterHour = h + ((m + cooking) / 60);
		int afterMinute = (m + cooking) % 60;
		if(afterHour >= 24)
			afterHour -= 24;
		
		output.write(afterHour + " " + afterMinute);
		
		output.flush();
		output.close();
	}
	
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 바로 윗 문제([2884][def5])도 이런 형식으로 더 깔끔하게 풀 수도 있었을 듯.

</div>
</details>

<br>

### [2480][def7]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_2480 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String[] dice = input.readLine().split(" ");
		
		if(dice[0].equals(dice[1]) && dice[0].equals(dice[2]))
			output.write(String.valueOf(
					10000 + Integer.parseInt(dice[0]) * 1000));
		else if(dice[0].equals(dice[1]))
			output.write(String.valueOf(
					1000 + Integer.parseInt(dice[0]) * 100));
		else if(dice[1].equals(dice[2]))
			output.write(String.valueOf(
					1000 + Integer.parseInt(dice[1]) * 100));
		else if(dice[0].equals(dice[2]))
			output.write(String.valueOf(
					1000 + Integer.parseInt(dice[2]) * 100));
		else {
			int max = (Integer.parseInt(dice[0]) > Integer.parseInt(dice[1])) ? 
					((Integer.parseInt(dice[0]) > Integer.parseInt(dice[2])) ? Integer.parseInt(dice[0]) : Integer.parseInt(dice[2])) :
					((Integer.parseInt(dice[1]) > Integer.parseInt(dice[2])) ? Integer.parseInt(dice[1]) : Integer.parseInt(dice[2]));
			
			output.write(String.valueOf(
					max * 100));	
		}
			
		output.flush();
		output.close();
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 세 수 중 최댓값을 구할 때 외부 함수를 사용할 수도 있었지만,  
  삼항연산자 사용법을 다시 익히는 겸 직접 구해보았다.

</div>
</details>

<br>

## Silver
### [1010][def8]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_1010 {

	public static void main(String[] args) throws IOException {

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));

		int testCase = Integer.parseInt(input.readLine());
		
		String[] line;
		// nCr
		int n;
		int r;
		for(int i = 0 ; i < testCase ; i++) {
			line = input.readLine().split(" ");
			n = Integer.parseInt(line[1]);
			r = Integer.parseInt(line[0]);
			// nCr 출력
			output.write(Math.round(combination(n, r)) + "\n");
		}
		
		output.flush();
		output.close();
	}
	/**
	 * 조합 nCr의 결과를 구하는 메소드.
	 * @param n = n
	 * @param r = r
	 * @return nCr
	 */
	public static Double combination(int n, int r) {
		Double upper = 1.0;	// 분자
		Double lower = 1.0;  // 분모
		int nMinusR = n-r; // n 값이 변할거라서 미리 저장
		
		for(; n > nMinusR ; n--)
			upper *= n;
		for(; r >= 1 ; r--)
			lower *= r;
		
		return upper / lower;
	}
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 우선 문제에 접근한 방법
    
    ![backjoon_1010](https://i.imgur.com/CUCbt8J.png)  

    - 문제에서 왼쪽 -> 오른쪽으로 다리를 연결한다고 해서  
    왼쪽의 각각에 대한 경우의 수를 따지려면 너무 복잡해진다.  
    고등학생 때 순열과 조합 파트 문제를 풀 때처럼, 역으로 생각해본다면  
    다리가 엇갈리고 자시고를 따질 필요가 없이  
    오른쪽의 r개 중에서 단순히 n개를 순서 상관없이 뽑으면 각각이 자동으로 왼쪽의 1,2,3,4에 순서대로 매치될 것이기 때문에  
    이 문제의 정답은 `nCr`을 구하는 것과 완전히 같다.  
    <br>

  - 문제를 계속 틀린 이유
    - 예제와 여러 테스트들을 거쳤으나  
    맞다고 생각 됨에도 불구하고 계속해서 틀리는 문제가 발생했다.  
    이전에도 많이 발생하여 나를 괴롭혔던,  
    부동소수점 오류로 인한 미세한 차이가 특정 경우에서 결과를 다르게 함을 의심해보았다.  
    <br>
    결국 그게 맞았고,  
    수 차례 곱셈과 대입을 계속하며 커질대로 커진 `long` 타입 값 두 개를 서로 나누었을 때 미세한 오차가 발생하였던 것으로 확인되었다.  
    <br>

  - 해결방법
    - 크기가 아주 큰 `long` 타입 변수 간의 곱/나눗셈 연산을 피하기 위해,  
    이들을 `double` 타입으로 바꾸었고  
    모든 연산을 마친 후 마지막에 형변환으로 소수점을 버리는 게 아닌, 반올림을 함으로서 원하는 결과가 나오도록 도출했다.  
    <br>

  - 참고자료
    - [해당 페이지를 잘 읽어보고 기억하자.][def9]

</div>
</details>

<br>

## Gold
### [2448][def10]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;

public class P_2448 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int n = Integer.parseInt(input.readLine());
		int k = (int)Math.round(Math.log(n/3) / Math.log(2));
		
		List<String> pattern = List.of("  *  ", " * * ", "*****");
		
		for(int i = 1 ; i <= k ; i++)
			pattern = makeNextPattern(pattern, i);
		
		for(String line : pattern)
			output.write(line + "\n");
		
		output.flush();
		output.close();

	}
	/**
	 * 다음 번째 패턴을 도출하는 메소드.
	 * @param pattern 현 패턴
	 * @param i 이번이 몇 번째인지(until k..)
	 * @return 새로 만든 패턴을 담아서 보내기
	 */
	public static List<String> makeNextPattern(List<String> pattern, int i) {
		List<String> newPattern = new ArrayList<>();
		StringBuilder making;
		// 공백 -> 패턴 - > 공백
		for(int j = 0 ; j < pattern.size() ; j++) {
			making = new StringBuilder("");
			for(int blank = 0 ; blank < 3 * Math.pow(2, i-1) ; blank++) 
				making.append(" ");
			making.append(pattern.get(j));
			for(int blank = 0 ; blank < 3 * Math.pow(2, i-1) ; blank++) 
				making.append(" ");
			// 새 패턴에 쓰기
			newPattern.add(making.toString());
		}
		// 패턴 -> 띄고 -> 패턴
		for(int k = 0 ; k < pattern.size() ; k++) {
			making = new StringBuilder("");
			making.append(pattern.get(k));
			making.append(" ");
			making.append(pattern.get(k));
			newPattern.add(making.toString());
		}
		
		return newPattern;
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 문제를 단계별로 잘 나누어서 생각해보니 규칙이 생각보다 명확했고,  
  한글로 작성한 풀이 단계를 그대로 코드로 옮김으로서 해결에 성공했다.  
  메모장으로 작성했던 문제 해결 단계 알고리즘은 이러했다.  

  ![backjoon_2448][def11]

</div>
</details>

### [10993][def12]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;

public class P_10993 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));

		int n = Integer.parseInt(input.readLine());
		
		List<String> pattern = List.of("*");
		for(int i = 2 ; i <= n ; i++) {
			if(i % 2 == 0)
				pattern = patternIfEven(pattern);
			else
				pattern = patternIfOdd(pattern);
		}
		
		for(String line : pattern)
			output.write(line + "\n");
		
		output.flush();
		output.close();
	}
	/**
	 * 홀수 번째 차례에서 다음 패턴을 구하는 메소드.
	 * @param pattern 이전 패턴
	 * @return 다음 패턴을 담은 List
	 */
	public static List<String> patternIfOdd(List<String> pattern) {
		List<String> newPattern = new ArrayList<String>();
		StringBuilder next;
		
		int lastLength = pattern.get(0).length();
		int newLength = (lastLength + 1) + (lastLength + 2);
		int height = lastLength + 2;
		int blank = 1;
		int fill = 0;
		for(int i = 1 ; i <= height ; i++) {
			next = new StringBuilder("");
			// 처음과 마지막 처리
			if(i == 1) {
				for(int times = 0 ; times < newLength / 2 ; times++)
					next.append(" ");
				next.append("*");
			}
			else if(i == height) 
				for(int times = 0 ; times < newLength ; times++)
					next.append("*");
			// 가운데 처리
			else if(i < height/2 + 1) {  // 이전 패턴이 들어가지 않는 부분
				// (1) 공백 삽입
				for(int times = 0 ; times < (newLength - blank) / 2 ; times++)
					next.append(" ");
				// (2) * 하나 삽입
				next.append("*");
				// (3) 삼각형 내 공백과 * 추가 삽입
				for(int times = 0 ; times < blank - 2 ; times++)
					next.append(" ");
				if(blank - 2 > 0) 
					next.append("*");
			}
			else {  // 이전 패턴이 들어가는 부분
				// (1) 공백 삽입
				for(int times = 0 ; times < (newLength - blank) / 2 ; times++)
					next.append(" ");
				// (2) * 하나 삽입
				next.append("*");
				// (6) 삼각형 내 공백을 채우고, 이전 패턴 삽입, *으로 마무리
				for(int times = 0 ; times < fill ; times++)
					next.append(" ");
				next.append(pattern.get(fill));
				for(int times = 0 ; times < fill*2 ; times++)
					next.append(" ");
				next.append("*");
				fill++;
			}
			newPattern.add(next.toString());
			blank += 2;
		}
		return newPattern;
	}
	/**
	 * 짝수 번째 차례에서 다음 패턴을 구하는 메소드.
	 * 홀수 메소드와 완전히 역순이다.
	 * @param pattern 이전 패턴
	 * @return 다음 패턴을 담은 List
	 */
	public static List<String> patternIfEven(List<String> pattern) {
		List<String> newPattern = new ArrayList<String>();
		StringBuilder next;
		
		int lastLength = pattern.get(pattern.size()-1).length();
		int newLength = (lastLength + 1) + (lastLength + 2);
		int height = lastLength + 2;
		int blank = 0;
		int fill = lastLength / 2;
		int patternIndex = 0;
		for(int i = 1 ; i <= height ; i++) {
			next = new StringBuilder("");
			// 처음과 마지막 처리
			if(i == 1)
				for(int times = 0 ; times < newLength ; times++)
					next.append("*");
			else if(i == height) {
				for(int times = 0 ; times < newLength / 2 ; times++)
					next.append(" ");
				next.append("*");
			}
			// 가운데 처리
			else if(i <= height/2 + 1) {  // 이전 패턴이 들어가는 부분
				// (1) 공백 삽입
				for(int times = 0 ; times < blank ; times++)
					next.append(" ");
				// (2) * 하나 삽입
				next.append("*");
				// (6) 삼각형 내 공백을 채우고, 이전 패턴 삽입
				for(int times = 0 ; times < fill ; times++)
					next.append(" ");
				next.append(pattern.get(patternIndex++));
				for(int times = 0 ; times < fill*2 ; times++)
					next.append(" ");
				next.append("*");
				fill--;
			}
			else {  // 이전 패턴이 들어가지 않는 부분
				// (1) 공백 삽입
				for(int times = 0 ; times < blank ; times++)
					next.append(" ");
				// (2) * 하나 삽입
				next.append("*");
				// (3) 삼각형 내 공백과 * 추가 삽입
				for(int times = 0 ; times < newLength - blank * 2 - 2 ; times++)
					next.append(" ");
				if(newLength - blank * 2 - 2 > 0) 
					next.append("*");
			}
			newPattern.add(next.toString());
			blank++;
		}
		return newPattern;
	}

}
```
<details>
<summary>코멘트</summary>
<div markdown="1">

  - 수가 증가하는 패턴을 찾는 데에 굉장히 애먹었다.  
  다만 패턴을 찾은 후로는,  
  해당 패턴을 이용하였을 때 문제가 직관적으로 바뀌었으며,  
  그 즉시 한글로 문제 해결 순서를 작성하고 그것을 코드로 작성함으로서 깔끔하게 해결했다.

  ![backjoon_10993][def13]

  - 처음 문제를 제출했을 때  
  `출력 형식이 잘못되었습니다` 라는 오답 메세지를 맞이하였는데,  
  이는 정답과 매우 유사하나, 공백이나 새 줄문자 등으로 인해  
  눈에는 보이지 않는 정답과의 차이점이 있음을 뜻하는 것임을 알게되었다.  
  실제로 예제의 출력결과에서는 삼각형의 오른편 공백이 없었고 내 코드에는 그것(공백)을 구현해버렸기 때문에, 오류가 발생했다.  
  빠르게 해결할 수 있었다.

  - 무언가 잘못된 출력이 나왔을 때 문제가 되는 부분을 눈으로 디버깅하고 재빨리 찾아내는 능력이 상당히 좋아진 것 같다고 느낀다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/1330
[def2]: https://www.acmicpc.net/problem/9498
[def3]: https://www.acmicpc.net/problem/2753
[def4]: https://www.acmicpc.net/problem/14681
[def5]: https://www.acmicpc.net/problem/2884
[def6]: https://www.acmicpc.net/problem/2525
[def7]: https://www.acmicpc.net/problem/2480
[def8]: https://www.acmicpc.net/problem/1010
[def9]: https://www.acmicpc.net/blog/view/37
[def10]: https://www.acmicpc.net/problem/2448
[def11]: https://i.imgur.com/wXUeCOh.png
[def12]: https://www.acmicpc.net/problem/10993
[def13]: https://i.imgur.com/M0JPSjM.png