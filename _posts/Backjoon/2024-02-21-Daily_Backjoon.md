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
추후 수정(02/22)
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