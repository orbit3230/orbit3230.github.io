---
layout: post
title: "[데일리 백준] 15650, 15651, 15652"
excerpt: "3 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-03
last_modified_at: 2024-03-04
---

## Silver
### [15650][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P_15650 {

	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
	static int n;
	static int m;

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
				nowArray[index] = i;
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

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기존 순열을 구하던 프로그램 코드에서,  
출력 조건에 **오름차순** 일 때만 출력하도록 걸어  
중복을 없앰으로서 조합을 구하는 코드로 탈바꿈했다.  

[베이스가 된, 순열을 구하는 문제풀이에 대한 코멘트][def2]

</div>
</details> 

<br>

### [15651][def3]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P_15651 {

	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
	static int n;
	static int m;

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

		permute(0, array);

		output.flush();
		output.close();

	}

	static void permute(int index, int[] array) throws IOException{
		int[] nowArray = Arrays.copyOf(array, array.length);
		for(int i = 1 ; i < n+1 ; i++) {
			nowArray[index] = i;
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

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기존 순열을 구하던 프로그램 코드에서,  
중복은 추가하지 않던 조건과, 관련 데이터를 다루던 객체 및 코드를 지웠다. 

</div>
</details> 

<br>

### [15652][def4]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P_15652 {

	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
	static int n;
	static int m;

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

		permute(0, array);

		output.flush();
		output.close();

	}

	static void permute(int index, int[] array) throws IOException{
		int[] nowArray = Arrays.copyOf(array, array.length);
		int[] isAsc;
		for(int i = 1 ; i < n+1 ; i++) {
			nowArray[index] = i;
			if(index == m-1) {
				isAsc = Arrays.copyOf(nowArray, nowArray.length);
				Arrays.sort(isAsc);
				if(Arrays.equals(nowArray, isAsc))
					printArray(nowArray);
			}
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

<details>
<summary>코멘트</summary>
<div markdown="1">

- 기존 조합을 구하던 프로그램 코드에서,  
중복은 추가하지 않던 조건과, 관련 데이터를 다루던 객체 및 코드를 지웠다. 

</div>
</details> 

[def]: https://www.acmicpc.net/problem/15650
[def2]: https://orbit3230.github.io/2024/03/02/Daily_Backjoon/#silver
[def3]: https://www.acmicpc.net/problem/15651
[def4]: https://www.acmicpc.net/problem/15652