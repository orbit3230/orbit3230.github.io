---
layout: post
title: "[데일리 백준] 10813, 5597, 3052, 10811, 1546, 1074"
excerpt: "5 bronze, 1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-23
last_modified_at: 2024-02-24
---
## Bronze
### [10813][def2]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_10813 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer;
		
		String line = input.readLine();
		tokenizer = new StringTokenizer(line);
		
		int numberOfBaskets = Integer.parseInt(tokenizer.nextToken());
		int times = Integer.parseInt(tokenizer.nextToken());
		
		int[] baskets = new int[numberOfBaskets];
		for(int i = 0 ; i < numberOfBaskets ; i++)
			baskets[i] = i+1;
		
		int tmp;
		for(int t = 0 ; t < times ; t++) {
			line = input.readLine();
			tokenizer = new StringTokenizer(line);
			int from = Integer.parseInt(tokenizer.nextToken()) - 1;
			int to = Integer.parseInt(tokenizer.nextToken()) - 1;
			tmp = baskets[from];
			baskets[from] = baskets[to];
			baskets[to] = tmp;
		}
		
		for(int basket : baskets)
			output.write(basket + " ");
		
		output.flush();
		output.close();

	}

}
```

<br>

### [5597][def3]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_5597 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int[] students = new int[28];
		for(int i = 0 ; i < students.length ; i++)
			students[i] = Integer.parseInt(input.readLine());
		
		Finding :
		for(int i = 1 ; i <= 30 ; i++) {
			for(int j = 0 ; j < 28 ; j++)
				if(i == students[j])
					continue Finding;
			output.write(i + "\n");
		}
		
		output.flush();
		output.close();

	}

}
```

<br>

### [3052][def4]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.HashSet;
import java.util.Set;

public class P_3052 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		Set<Integer> remainders = new HashSet<>();
		for(int i = 0 ; i < 10 ; i++)
			remainders.add(Integer.parseInt(input.readLine()) % 42);
		
		output.write(String.valueOf(remainders.size()));
		
		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 중복 원소를 허용하지 않는 `Set` 인터페이스 객체의 성질을 이용했다.

</div>
</details>

<br>

### [10811][def5]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_10811 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		int numberOfBaskets = Integer.parseInt(tokenizer.nextToken());
		int[] baskets = new int[numberOfBaskets + 1];  // 0번 방은 버릴거임
		int times = Integer.parseInt(tokenizer.nextToken());
		
		for(int i = 0 ; i < baskets.length ; i++)
			baskets[i] = i;		// 바구니에 이름 붙이기
		
		int from;
		int to;
		for(int i = 0 ; i < times ; i++) {
			line = input.readLine();
			tokenizer = new StringTokenizer(line);
			from = Integer.parseInt(tokenizer.nextToken());
			to = Integer.parseInt(tokenizer.nextToken());
			
			reverse(baskets, from, to);
		}
		
		for(int index = 1 ; index <= numberOfBaskets ; index++)
			output.write(baskets[index] + " ");
		
		output.flush();
		output.close();

	}
	static void reverse(int[] baskets, int from, int to) {
		for(int i = 0 ; i < (to-from)/2.0 ; i++)
			swap(baskets, from+i, to-i);
	}
	static void swap(int[] baskets, int i1, int i2) {
		int tmp;
		tmp = baskets[i1];
		baskets[i1] = baskets[i2];
		baskets[i2] = tmp;
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - ~~`Math.round`는 반올림 함수이다.  
  그런데 `1/2`와 같이 `.5`로 떨어지는 애매한 소수는 부동소수점 문제 때문에  
  반올림하여 올리고자 하였으나 제대로 안 올라갈 수가 있다. (ex. 0.4999999)~~
  
  - ~~그럴 땐 그냥 `Math.nextUp`이나 `Math.nextDown`으로 확실하게 오르내리자.~~

  - 아니다. 잘못 알았다.  
  올림 함수는 `Math.ceil()`이고,  
  내림 함수는 `Math.floor()`이다. 완전 기능이 다른 거였음.  

  - 그리고 애초에 이 문제에서 그거 쓸 일 없음.  
  - 위 `Math.nextUp()`을 썼는데 뽀록으로 맞았던 이유가,  
  내가 실수로 정수/정수 나눗셈을 하여 1.5가 나와야 할 게 1이 나와버림. 그런데 `Math.nextUp()`으로 1.000001이 되어 운좋게 반복문이 잘 맞게 돌아간거였음.

</div>
</details>

<br>

### [1546][def6]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_1546 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int n = Integer.parseInt(input.readLine());
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		double[] scores = new double[n];
		
		double max = 0.0;
		for(int i = 0 ; i < n ; i++) {
			double next = Double.parseDouble(tokenizer.nextToken());
			if(next > max)
				max = next;
			scores[i] = next;
		}
		
		double sum = 0.0;
		for(int i = 0 ; i < n ; i++) {
			scores[i] = scores[i]/max*100;
			sum += scores[i];
		}
		
		output.write(String.valueOf(sum/n));
		
		output.flush();
		output.close();

	}

}
```

## Silver
### [1074][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_1074 {

	static int findR;	// 찾는 행
	static int findC;	// 찾는 열
	static int count;	// 몇 번째 찾는 시도인지

	public static void main(String[] args) throws IOException {

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer;

		String line = input.readLine();
		tokenizer = new StringTokenizer(line);

		int n = Integer.parseInt(tokenizer.nextToken());	// 배열 크기(2^n)
		findR = Integer.parseInt(tokenizer.nextToken());
		findC = Integer.parseInt(tokenizer.nextToken());
		count = -1;

		output.write(String.valueOf(find(n, 0, 0)));

		output.flush();
		output.close();
	}

	static int find(int n, int startRow, int startColumn) {
		if(n == 1) {
			if(check(startRow, startColumn)) {
				return count;
			}
			if(check(startRow, startColumn + 1)) {
				return count;
			}
			if(check(startRow + 1, startColumn)) {
				return count;
			}
			if(check(startRow + 1, startColumn + 1)) {
				return count;
			}
			return -1;
		}
		else {
			int power = (int)Math.pow(2, n-1);
			int found;
			if(findR < startRow+power && findC < startColumn+power) {
				found = find(n-1, startRow, startColumn);
				if(found != -1)
					return found;
			}
			else
				count += power * power;
			if(findR < startRow+power && findC >= startColumn+power) {
				found = find(n-1, startRow, startColumn+power);
				if(found != -1)
					return found;
			}
			else
				count += power * power;
			if(findR >= startRow+power && findC < startColumn+power) {
				found = find(n-1, startRow+power, startColumn);
				if(found != -1)
					return found;
			}
			else
				count += power * power;
			if(findR >= startRow+power && findC >= startColumn+power) {
				found = find(n-1, startRow+power, startColumn+power);
				if(found != -1)
					return found;
			}
			else
				count += power * power;
		}
		return -1;	
	}
	static boolean check(int row, int col) {
		count++;
		if(row == findR && col == findC)
			return true;
		else
			return false;
	}
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 너무 힘들었다. 구상도 힘들었고 코드 짜기도 힘들었고 메모리 초과도 뜨고 시간 초과도 뜨고 자괴감드는데 일단 해결했으니까 풀이를 쓰겠다.  

  - 나의 생각

    - (1) 재귀를 사용해야 겠다는 생각은 드는데,  
    막막했다. 일단 작은 Z를 반복해서 큰 것을 만들어야 겠다는 편협한 생각 때문에  
    재귀함수 구성을 쉽사리 못하고 헛걸음만 하고  있었다.  

    - (2) 문득 이런 생각이 들었다.  
    내가 재귀함수를 배웠을 때 예제들을 생각해보면,  
    가장 큰 패턴을 먼저 호출하고,  
    그 함수 내에서 재귀적 호출을 통해  
    점진적으로 작은 패턴으로 쪼개지면서  
    마침내 더 이상 쪼갤 수 없는 조각이 되었을 때 재귀함수 호출이 끝이나는.  
    그런 구조였었다.  
    따라서 내가 너무 작은 조각을 모아 큰 조각을 만들어야 겠다는 생각에 사로잡혀서,  
    오히려 큰 것부터 시작해 작아지게 만드는 쪽으로 역 발상을 하니  
    재귀함수 사용에 감이 잡혔다.  

    - (3) 큰 배열을 4조각으로 나누고,  
    그리고 또 나눠진 배열을 4조각으로 나누고를 반복하여  
    마침내 2x2 배열이 되었을 때 네 번의 정답 체크를 통해 재귀 함수를 끝내는 알고리즘을 구상했다.  
    그런데 이렇게 하려다보니 함수를 호출할 때마다  
    작은 2차원 배열을 매번 4개씩 만들어야 했고,  
    또 배열에 내용을 채워넣고를 반복하니 코드도 길어졌고 너무 많은 공간을 소모하지 않을지 걱정되었다.  
    역시나 걱정대로 제출 결과 메모리 초과가 떴고,  
    질문게시판의 도움을 조금 받아 알게된 것은  
    **배열을 아예 쓰지 않는 것** 이었다.  

    - (4) 배열을 아예 쓰지 않고 풀라니, 막막했다.  
    결국 코드를 싹 갈아엎었고, 배열을 쓰지 않고 문제를 해결하는 방안에 대해 고민해보았다.  
    사실 **생각해보니 배열을 쓸 필요는 없었다.**  
    특정 행/열에 도달하는 때가 언제인지를 구하는 것이었으므로,  
    계속 탐색을 진행하면서 **현재가 몇 번째 행/열인지만 기억을 하면 됐다.**  
    그리하여 코드를 작성하였고,  
    재귀함수를 돌다가 정답에 도달했을 경우 재귀 루프를 끝냄으로서  
    재귀함수가 불필요하게 끝까지 호출되는 것도 막았다.  
    그런데 런타임 에러가 났다. 너무 오래걸린다는 것이었다.  

    - (5) 생각해보면 2차원 배열의 크기가 아주 커졌을 때,  
    재귀함수의 호출 횟수가 `4^(n-1)` 수준으로 너무 커졌다.  
    n이 최대 15일 때면 `int`타입 변수로도 담을 수 없는 수준의 무지막지한 호출 횟수였다.  
    따라서, 불필요한 경우 탐색을 skip하고 그 동안의 탐색 횟수만큼 임의로 더해주는 방식을 택했다.  
    예를들어, 찾고자하는 행/열 위치가 4사분면일 경우  
    1,2,3 사분면은 과감하게 skip하고 그만큼의 탐색 카운트는 증가시킨다.  
    또 4사분면 내에서도 4조각으로 나누었을 때  
    탐색이 불필요한 지역을 skip하는 것을 반복함으로서  
    런타임을 획기적으로 줄이는데 성공했다.  
    이렇게 함으로서 이번 문제를 해결했다. 

- 깨달은 것

  - [1] 재귀함수는 큰 것 -> 작은 것으로 분해하며 해결한다.  

  - [2] 불필요한 메모리 사용을 자제하자. 문제의 본질대로 풀 것

  - [3] 불필요한 연산을 자제하자. 특히나 재귀함수는 시간복잡도가 제곱으로 늘어나기 때문에 더더욱 그렇다.


</div>
</details>

[def]: https://www.acmicpc.net/problem/1074
[def2]: https://www.acmicpc.net/problem/10813
[def3]: https://www.acmicpc.net/problem/5597
[def4]: https://www.acmicpc.net/problem/3052
[def5]: https://www.acmicpc.net/problem/10811
[def6]: https://www.acmicpc.net/problem/1546