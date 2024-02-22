---
layout: post
title: "[데일리 백준] "
excerpt: "5 bronze, 1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-22
last_modified_at: 2024-02-23
---
## Bronze
### [10807][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_10807 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int testCase = Integer.parseInt(input.readLine());
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		int[] nums = new int[testCase];
		for(int i = 0 ; i < testCase ; i++)
			nums[i] = Integer.parseInt(tokenizer.nextToken());
		
		int finding = Integer.parseInt(input.readLine());
		
		int count = 0;
		for(int num : nums) 
			if(num == finding)
				count++;
		
		output.write(String.valueOf(count));
		
		output.flush();
		output.close();

	}

}
```

<br>

### [10871][def2]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class P_10817 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		StringTokenizer tokenizer;
		
		String line = input.readLine();
		tokenizer = new StringTokenizer(line);
		int testCase = Integer.parseInt(tokenizer.nextToken());
		int upto = Integer.parseInt(tokenizer.nextToken());
		
		String numLine = input.readLine();
		tokenizer = new StringTokenizer(numLine);
		
		List<Integer> list = new ArrayList<>();
		int next;
		for(int i = 0 ; i < testCase ; i++) {
			next = Integer.parseInt(tokenizer.nextToken());
			if(next < upto)
				list.add(next);
		}
		
		for(int num : list)
			output.write(num + " ");
		
		output.flush();
		output.close();

	}

}
```

<br>

### [10818][def3]

```java
import java.io.IOException;
import java.util.Scanner;

public class P_10818 {

	public static void main(String[] args) throws IOException {
		
		Scanner input = new Scanner(System.in);
		
		int testCase = input.nextInt();
		
		int next = input.nextInt();
		int max = next;
		int min = next;
		for(int i = 1 ; i < testCase ; i++) {
			next = input.nextInt();
			if(next > max)
				max = next;
			if(next < min)
				min = next;
		}
		
		System.out.println(min + " " + max);

        input.close();
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - `BufferedReader` / `BufferedWriter` 너무 불편하고  
  진짜 코드 쓸데없이 너무 길어져서 쉬운문제엔 걍 안씀  
  근데 좀 오래걸리긴 함

</div>
</details>

<br>

### [2562][def4]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_2562 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int maxIndex = 0;
		int max = 0;
		int next;
		for(int i = 1 ; i <= 9 ; i++) {
			next = Integer.parseInt(input.readLine());
			if(next > max) {
				max = next;
				maxIndex = i;
			}
		}
		
		output.write(max + "\n");
		output.write(String.valueOf(maxIndex));
		
		output.flush();
		output.close();

	}

}
```

<br>

### [10810][def5]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_10810 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		int numberOfBaskets = Integer.parseInt(tokenizer.nextToken());
		int[] baskets = new int[numberOfBaskets + 1];  // 0번 방은 버릴거임
		int times = Integer.parseInt(tokenizer.nextToken());
		
		int from;
		int to;
		int ballNumber;
		for(int i = 0 ; i < times ; i++) {
			line = input.readLine();
			tokenizer = new StringTokenizer(line);
			from = Integer.parseInt(tokenizer.nextToken());
			to = Integer.parseInt(tokenizer.nextToken());
			ballNumber = Integer.parseInt(tokenizer.nextToken());
			
			for(int index = from ; index <= to ; index++)
				baskets[index] = ballNumber;
		}
		
		for(int index = 1 ; index <= numberOfBaskets ; index++)
			output.write(baskets[index] + " ");
		
		output.flush();
		output.close();

	}

}
```

<br>

## Silver
### [??]()

```java
// 수강신청때매 일찍자야됨
// 내일 추가로 풀게요 ~
```

[def]: https://www.acmicpc.net/problem/10807
[def2]: https://www.acmicpc.net/problem/10871
[def3]: https://www.acmicpc.net/problem/10818
[def4]: https://www.acmicpc.net/problem/2562
[def5]: https://www.acmicpc.net/problem/10810