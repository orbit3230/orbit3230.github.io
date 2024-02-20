---
layout: post
title: "[데일리 백준] 2739, 10950, 8393, 25304, 25314, 15552, 1026"
excerpt: "6 bronze, 1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-20
last_modified_at: 2024-02-21
---
## Bronze
### [2739][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_2739 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int n = Integer.parseInt(input.readLine());
		
		for(int i = 1 ; i <= 9 ; i++)
			output.write(n + " * " + i + " = " + n*i + "\n");
		
		output.flush();
		output.close();

	}

}
```

<br>

### [10950][def2]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_10950 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int testCase = Integer.parseInt(input.readLine());
		
		String[] line;
		int a;
		int b;
		for(int i = 0 ; i < testCase ; i++) {
			line = input.readLine().split(" ");
			a = Integer.parseInt(line[0]);
			b = Integer.parseInt(line[1]);
			
			output.write(a + b + "\n");
		}
		
		output.flush();
		output.close();

	}

}
```

<br>

### [8393][def3]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_8393 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int upto = Integer.parseInt(input.readLine());
		
		int sum = 0;
		for(int i = 1 ; i <= upto ; i++) 
			sum += i;
		
		output.write(String.valueOf(sum));
		
		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 반복문 대신 `n(n + 1)/2` 로 구해도 상관없을 것 같다.

</div>
</details>

<br>

### [25304][def4]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_25304 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int bill = Integer.parseInt(input.readLine());
		
		int numberOf = Integer.parseInt(input.readLine());
		
		int sum = 0;
		String[] line;
		int current;
		int multiple;
		for(int i = 0 ; i < numberOf ; i++) {
			line = input.readLine().split(" ");
			current = Integer.parseInt(line[0]);
			multiple = Integer.parseInt(line[1]);
			
			sum += current * multiple;
		}
		
		if(sum == bill)
			output.write("Yes");
		else
			output.write("No");
		
		output.flush();
		output.close();

	}

}
```

<br>

### [25314][def5]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_25314 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int num = Integer.parseInt(input.readLine());
		
		int n = Math.round(num / 4);
		
		for(int i = 0 ; i < n ; i++) 
			output.write("long ");
		
		output.write("int");
		
		output.flush();
		output.close();
		
	}

}
```

<br>

### [15552][def6]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_15552 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int testCase = Integer.parseInt(input.readLine());
		
		String[] line;
		int a;
		int b;
		for(int i = 0 ; i < testCase ; i++) {
			line = input.readLine().split(" ");
			a = Integer.parseInt(line[0]);
			b = Integer.parseInt(line[1]);
			
			output.write(a + b + "\n");
		}
		
		output.flush();
		output.close();
		
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 나는 기존부터 `BufferedReader`, `BufferedWriter`를 이용하고 있었기 때문에,  
  사실 [10950][def2] 와 다를게 없었다.

</div>
</details>

<br>

## Silver
### [1026][def7]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;

public class P_1026 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int size = Integer.parseInt(input.readLine());
		
		String[] aString = input.readLine().split(" ");
		Integer[] a = new Integer[size];
		for(int i = 0 ; i < size ; i++)
			a[i] = Integer.parseInt(aString[i]);
		
		String[] bString = input.readLine().split(" ");
		Integer[] b = new Integer[size];
		for(int i = 0 ; i < size ; i++)
			b[i] = Integer.parseInt(bString[i]);
		
		// 두 배열을 하나는 내림차순, 하나는 오름차순으로 정렬하고
		// 배열 간 원소를 순서대로 곱하면
		// 그것이 두 배열의 원소 간 곱의 합의 최솟값이다.
		Arrays.sort(a);						// 오름차순(기본)
		Arrays.sort(b, (n1, n2) -> n2-n1);  // 내림차순
		
		int sum = 0;
		for(int i = 0 ; i < size ; i++)
			sum += a[i] * b[i];
		
		output.write(String.valueOf(sum));
		
		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 문제에서 `S = A[0] × B[0] + ... + A[N-1] × B[N-1]` 일 때  
  `A` 배열의 수를 재배열 함으로서 `S` 값이 가장 작아지도록 하라고 하였다.  
  여기서 `B` 배열을 재배열하지 말라고 하였으나,  
  출력으로 `S`의 최솟값, 즉 **결과만 요구**하였기 때문에,  
  **과정은 중요하지 않다.** 따라서 `B` 배열을 내 맘대로 다뤄도 상관없다.  

  - 두 배열 간 원소간 곱을 모두 더했을 때 최솟값을 만드려면  
  `A`의 가장 큰 원소는 `B`의 가장 작은 원소와 매칭시키고,
  `A`의 가장 작은 원소는 `B`의 가장 큰 원소와 매칭시키면 된다.  

  - 다시말해, 한 배열은 오름차순, 한 배열은 내림차순 이런 식으로  
  서로 반대로 정렬시킨 후, 원소 순서대로 곱하여 더해주면 된다.  

  <br>

  - 만약 배열의 원소를 출력값으로 요구했다면, (= 과정을 제출해야 했다면)  
  원본 배열의 복사본을 만들어 컨트롤하는 등의 추가 작업이 필요할 것이다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/2739
[def2]: https://www.acmicpc.net/problem/10950
[def3]: https://www.acmicpc.net/problem/8393
[def4]: https://www.acmicpc.net/problem/25304
[def5]: https://www.acmicpc.net/problem/25314
[def6]: https://www.acmicpc.net/problem/15552
[def7]: https://www.acmicpc.net/problem/1026