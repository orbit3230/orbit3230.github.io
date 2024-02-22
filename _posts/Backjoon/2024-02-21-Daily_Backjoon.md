---
layout: post
title: "[데일리 백준] 11021, 11022, 10951, 10952, 2438, 2439, 1654"
excerpt: "6 bronze, 1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-21
last_modified_at: 2024-02-22
---
## Bronze
### [11021][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_11021 {

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
			
			output.write("Case #" + (i+1) + ": " + (a + b) + "\n");
		}
		
		output.flush();
		output.close();

	}

}
```

<br>

### [11022][def2]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_11021 {

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
			
			output.write("Case #" + (i+1) + ": "+ a + " + " + b + " = "+ (a + b) + "\n");
		}
		
		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - `PrintWriter` 객체로 출력했다면 `printf()` 메소드를 사용했을 것이다.

</div>
</details>

<br>

### [10951][def3]

```java
import java.io.IOException;
import java.util.Scanner;

public class P_10951 {

	public static void main(String[] args) throws IOException{
		
		Scanner input = new Scanner(System.in);
		
		int a;
		int b;
		while(input.hasNextInt()) {
			a = input.nextInt();
			b = input.nextInt();
			
			System.out.println(a + b);
		}
		
		input.close();
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - `BufferedReader`를 사용하여 EOF를 구분하려면,  
  `BufferedReader.readline`이 `null`인지를 조건으로 걸면 된다.  
  <br>
  추가로 `StringTokenizer`를 사용한 다른 코드를 짜보았다.
  
```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_10951 {

public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line;
		StringTokenizer tokenizer;
		int a;
		int b;
		while((line = input.readLine()) != null) {
			tokenizer = new StringTokenizer(line);
			a = Integer.parseInt(tokenizer.nextToken());
			b = Integer.parseInt(tokenizer.nextToken());
			
			output.write(a + b + "\n");
		}
		
		output.flush();
		output.close();
		
	}

}
```

  - 참고로 이 코드는 IDE 에서 제대로 작동하지 않는다.  
  새 줄 문자도 읽어버리기 때문.

</div>
</details>

<br>

### [10952][def4]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_10952 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String[] line;
		int a;
		int b;
		while(true) {
			line = input.readLine().split(" ");
			a = Integer.parseInt(line[0]);
			b = Integer.parseInt(line[1]);
			
			if(a == 0 && b == 0)
				break;
			
			output.write(a + b + "\n");
		}
		
		output.flush();
		output.close();
		
	}

}
```

<br>

### [2438][def5]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_2438 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int n = Integer.parseInt(input.readLine());
		
		for(int i = 1 ; i <= n ; i++) {
			for(int j = 0 ; j < i ; j++)
				output.write("*");
			output.write("\n");
		}
		
		output.flush();
		output.close();

	}

}
```

<br>

### [2439][def6]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_2439 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int n = Integer.parseInt(input.readLine());
		
		for(int i = 1 ; i <= n ; i++) {
			for(int j = 0 ; j < n-i ; j++)
				output.write(" ");
			for(int k = 0 ; k < i ; k++)
				output.write("*");
			output.write("\n");
		}
		
		output.flush();
		output.close();

	}

}
```

<br>

## Silver
### [1654][def7]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_1654 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		int having = Integer.parseInt(tokenizer.nextToken());	// 가진 랜선 개수
		int need = Integer.parseInt(tokenizer.nextToken());		// 필요한 분할 랜선 개수
		
		int[] havingLength = new int[having];
		
		for(int i = 0 ; i < having ; i++)
			havingLength[i] = Integer.parseInt(input.readLine());
		
		long min = 1;
		long max = Integer.MAX_VALUE - 1;
		// 우리가 결국 구하려는 조각의 크기. 이것의 가능한 최대값을 찾을 것이다
		long pieceSize = 0;
		// 해당 크기로 만들 수 있는 조각의 총 개수
		long pieces;
		while(min <= max) {
			pieceSize = (min + max) / 2;
			pieces = 0;
			for(int length : havingLength)
				pieces += length / pieceSize; // 각 랜선 별 해당 길이로 만들 수 있는 조각 개수
			if(pieces < need)  // 너무 크게 잘라서 조각이 덜 나왔음
				max = pieceSize - 1;
			else  			   // 너무 작게 잘라서 조각이 너무 나왔거나, 좀 더 크게 잘라도 될 듯 
				min = pieceSize + 1;
		}
		
		// 탐색 도중 정답을 찾았었던 경우
		// 즉, 더 크게 만들 수 있는 경우의수를 찾다가 결국 실패한 경우
		// 정답을 찾았을 때 min = pieceSize + 1 이 추가로 실행되기 때문에
		// 이를 별도로 빼주어야 한다.
		// 아래와 같은 조건이 참일 때가 그 경우에 해당한다.
		if(min == pieceSize)
			pieceSize--;
		output.write(String.valueOf(pieceSize));
		// 또는 이 작업을 생략하고 
		// output.writ(String.valueOf(max)); 라고 해도 된다.
		
		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 처음의 나는 이렇게 생각했다. 그러나 반례를 쉽게 찾을 수 있었고, 오답으로 이어졌다.  

  ![p1654][def8]

  - 이것이 해당 방법으로 짠 코드이다. 물론 이것도 특수한 경우에는 정답이 될 수 있다.

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_1654 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		int having = Integer.parseInt(tokenizer.nextToken());	// 가진 랜선 개수
		int need = Integer.parseInt(tokenizer.nextToken());		// 필요한 분할 랜선 개수
		
		int[] havingLength = new int[having];
		
		for(int i = 0 ; i < having ; i++)
			havingLength[i] = Integer.parseInt(input.readLine());
		
		// 가장 긴 것의 길이 구하기
		int longest = 0;
		for(int length : havingLength)
			if(length > longest)
				longest = length;
		
		// 가진 랜선의 총 길이
		double sum = 0.0;
		for(int length : havingLength) {
			double l = length * 1.0;
			sum += l;
		}
		
		// 가장 긴 랜선의 전체 중 비율
		double ratio = longest / sum;
		
		// 가장 긴 랜선에서 나와야하는 랜선 조각 개수
		int longestPieces = (int)(ratio * need) + 1;  // 올림
		
		// 가장 긴 랜선에서 뽑아낸 조각의 길이(몫)
		output.write(String.valueOf(longest / longestPieces));
		
		output.flush();
		output.close();

	}

}
```

- 그러나 생각을 달리 하여 다음과 같은 결론을 지어냈다.

![p1654_c][def9]

- 그래서 다음과 같이 코드를 짰으나, 세 가지 문제를 맞이했고 이를 해결하였다.  

  - (1) 특정 경우에서 `pieceSize`가 정답보다 `+1` 더 많게 나온다.  
  이는 사이클이 의도치않게 더 돌아갔다는 뜻이다.
    - 이 특정 경우를 파악한 결과, `while`문은 중간에 정답(key)을 찾던 말던 무조건 탐색범위가 음수가 될 때까지 돌아간다는 점에서  
	만약 중간에 정답이 찾아졌었으나 더 큰 수의 정답이 있을지 탐색하기 위해 `low = pieceSize + 1` 하는 과정에서  
	`low = 정답 + 1`, `max = 정답`, `pieceSize = 정답 + 1`이란 최종 값을 가지게 된다는 것을 깨달았다.  

	- 따라서 이를 해결하기 위해 최종적으로 `max`를 출력하는 방법을 채택하거나,  
	`low = 정답 + 1` 일 때, 즉 중간에 정답을 찾았던 적이 있었을 때를 조건으로 걸어  
	해당 경우에서 `pieceSize -= 1`을 걸어 해결하는 방법을 채택할 수 있다.  
	나는 후자를 선택하였다.  

  - (2) 탐색 과정에서 `int` 변수들이 Overflow 난다.  
  만약 찾아야할 값이 `Integer.MAX_VALUE / 2`보다 큰 경우,  
  `min`이 `Integer.MAX_VALUE / 2`로 대체되면서  
  `min + max` 연산 도중 Overflow 된다.  
  따라서 관련 변수들을 모두 `long`으로 선언해주었다.  

  - (3) `Integer.MAX_VALUE`는 `2^31`이 아니라 `2^31 - 1` 이다.  
  이는 당연히 숫자를 0부터 세기 위함이고,  
  잠시 내가 착오가 있었다.  
  따라서 문제의 조건에서 랜선의 최대 길이가 `2^31 - 1`이라고 했으므로,  
  탐색 시 `max`는 `Integer.MAX_VALUE - 1`가 아닌 `Integer.MAX_VALUE`를 초기 값으로 설정해야 한다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/11021
[def2]: https://www.acmicpc.net/problem/11022
[def3]: https://www.acmicpc.net/problem/10951
[def4]: https://www.acmicpc.net/problem/10952
[def5]: https://www.acmicpc.net/problem/2438
[def6]: https://www.acmicpc.net/problem/2439
[def7]: https://www.acmicpc.net/problem/1654
[def8]: https://i.imgur.com/bahO3QL.png
[def9]: https://i.imgur.com/2vY0gKS.png