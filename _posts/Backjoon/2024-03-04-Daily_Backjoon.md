---
layout: post
title: "[데일리 백준] 15654, 15655, 15656"
excerpt: "3 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-04
last_modified_at: 2024-03-05
---
## Silver
### [15654][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P_15654 {

	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
	static int n;
	static int m;
	static int[] holding;

	public static void main(String[] args) throws IOException{

		input = new BufferedReader(new InputStreamReader(System.in));
		output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer;
		String line;

		line = input.readLine();
		tokenizer = new StringTokenizer(line);
		n = Integer.parseInt(tokenizer.nextToken());
		m = Integer.parseInt(tokenizer.nextToken());
		boolean[] used = new boolean[n + 1]; // 편의를 위해 첫 인덱스는 버린다.
		for(int i = 0 ; i < used.length ; i++)
			used[i] = false;  // 처음엔 모든 숫자가 unused.
		int[] array = new int[m];
		
		holding = new int[n+1]; // 0번 인덱스는 버림
		line = input.readLine();
		tokenizer = new StringTokenizer(line);
		for(int i = 1 ; i < holding.length ; i++)
			holding[i] = Integer.parseInt(tokenizer.nextToken());
		Arrays.sort(holding);

		permute(0, array, used);

		output.flush();
		output.close();

	}

	static void permute(int index, int[] array, boolean[] used) throws IOException{
		int[] nowArray = Arrays.copyOf(array, array.length);
		boolean[] nowUsed;
		for(int i = 1 ; i < used.length ; i++) {
			nowUsed = Arrays.copyOf(used, used.length);
			if(nowUsed[i] == false) {
				nowArray[index] = holding[i];
				nowUsed[i] = true;
				if(index == m-1)
					printArray(nowArray);
				else
					permute(index+1, nowArray, nowUsed);
			}
		}
		return;
	}
	static void printArray(int[] array) throws IOException{
		for(int i : array)
			output.write(i + " ");
		output.write("\n");
	}
}
```

<br>

### [15655][def2]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P_15655 {

	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
	static int n;
	static int m;
	static int[] holding;

	public static void main(String[] args) throws IOException{

		input = new BufferedReader(new InputStreamReader(System.in));
		output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer;
		String line;

		line = input.readLine();
		tokenizer = new StringTokenizer(line);
		n = Integer.parseInt(tokenizer.nextToken());
		m = Integer.parseInt(tokenizer.nextToken());
		boolean[] used = new boolean[n + 1]; // 편의를 위해 첫 인덱스는 버린다.
		for(int i = 0 ; i < used.length ; i++)
			used[i] = false;  // 처음엔 모든 숫자가 unused.
		int[] array = new int[m];
		
		holding = new int[n+1]; // 0번 인덱스는 버림
		line = input.readLine();
		tokenizer = new StringTokenizer(line);
		for(int i = 1 ; i < holding.length ; i++)
			holding[i] = Integer.parseInt(tokenizer.nextToken());
		Arrays.sort(holding);

		permute(0, array, used);

		output.flush();
		output.close();

	}

	static void permute(int index, int[] array, boolean[] used) throws IOException{
		int[] nowArray = Arrays.copyOf(array, array.length);
		boolean[] nowUsed;
		int[] isAsc;
		for(int i = 1 ; i < used.length ; i++) {
			nowUsed = Arrays.copyOf(used, used.length);
			if(nowUsed[i] == false) {
				nowArray[index] = holding[i];
				nowUsed[i] = true;
				if(index == m-1) {
					isAsc = Arrays.copyOf(nowArray, nowArray.length);
					Arrays.sort(isAsc);
					if(Arrays.equals(nowArray, isAsc))
						printArray(nowArray);
				}
				else
					permute(index+1, nowArray, nowUsed);
			}
		}
		return;
	}
	static void printArray(int[] array) throws IOException{
		for(int i : array)
			output.write(i + " ");
		output.write("\n");
	}
}
```

<br>

### [15656][def3]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P_15656 {

	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
	static int n;
	static int m;
	static int[] holding;

	public static void main(String[] args) throws IOException{

		input = new BufferedReader(new InputStreamReader(System.in));
		output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer;
		String line;

		line = input.readLine();
		tokenizer = new StringTokenizer(line);
		n = Integer.parseInt(tokenizer.nextToken());
		m = Integer.parseInt(tokenizer.nextToken());
		int[] array = new int[m];
		
		holding = new int[n+1]; // 0번 인덱스는 버림
		line = input.readLine();
		tokenizer = new StringTokenizer(line);
		for(int i = 1 ; i < holding.length ; i++)
			holding[i] = Integer.parseInt(tokenizer.nextToken());
		Arrays.sort(holding);
		
		permute(0, array);

		output.flush();
		output.close();

	}
	static void permute(int index, int[] array) throws IOException{
		int[] nowArray = Arrays.copyOf(array, array.length);
		for(int i = 1 ; i < n+1 ; i++) {
			nowArray[index] = holding[i];
			if(index == m-1)
				printArray(nowArray);
			else
				permute(index+1, nowArray);
		}
		return;
	}
	static void printArray(int[] array) throws IOException{
		for(int i : array)
			output.write(i + " ");
		output.write("\n");
	}
}
```

[def]: https://www.acmicpc.net/problem/15654
[def2]: https://www.acmicpc.net/problem/15655
[def3]: https://www.acmicpc.net/problem/15656