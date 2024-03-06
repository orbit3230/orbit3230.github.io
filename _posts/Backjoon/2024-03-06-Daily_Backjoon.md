---
layout: post
title: "[데일리 백준] 15663, 15664, 15665, 15666"
excerpt: "4 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-06
last_modified_at: 2024-03-07
---
## Silver
### [15663][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.StringTokenizer;
import java.util.TreeSet;

public class P_15663 {

	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
	static int n;
	static int m;
	static int[] holding;
	static SortedSet<int[]> noDupe = new TreeSet<>(new isArrayEquals());

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
		
		for(int[] next : noDupe)
			printArray(next);

		output.flush();
		output.close();

	}

	static void permute(int index, int[] array, boolean[] used) {
		int[] nowArray;
		boolean[] nowUsed;
		for(int i = 1 ; i < used.length ; i++) {
			nowArray = Arrays.copyOf(array, array.length);
			nowUsed = Arrays.copyOf(used, used.length);
			if(nowUsed[i] == false) {
				nowArray[index] = holding[i];
				nowUsed[i] = true;
				if(index == m-1) 
					noDupe.add(nowArray);
				else
					permute(index+1, nowArray, nowUsed);
			}
		}
		return;
	}
	static void printArray(int[] array) throws IOException {
		for(int i : array)
			output.write(i + " ");
		output.write("\n");
	}
}
class isArrayEquals implements Comparator<int[]> {
	public int compare(int[] a, int[] b) {
		for(int i = 0 ; i < a.length ; i++) {
			if(a[i] != b[i]) {
				return Integer.compare(a[i], b[i]);
			}
		}
		return 0;
	}
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 중복 결과를 없애기 위해 `SortedSet`을 사용했고,  
원소가 배열이기 때문에, 배열의 원소가 모두 같을 때만 같은 것으로 인식하도록
`Comparator`를 새로 정의했다.  
또한 구한 결과를 바로바로 출력하는 것이 아닌,  
담아두었다가 재귀가 끝나면 출력하는 방식이기에  
재귀가 돌면서 잘 못된 배열 원소를 가리키는 문제를 해결하기 위해 재귀 루프 속에서 배열을 Copy했다.  

</div>
</details> 

<br>

### [15664][def2]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.StringTokenizer;
import java.util.TreeSet;

public class P_15664 {

	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
	static int n;
	static int m;
	static int[] holding;
	static SortedSet<int[]> noDupe = new TreeSet<>(new isArrayEquals());

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
		
		for(int[] next : noDupe)
			printArray(next);

		output.flush();
		output.close();

	}

	static void permute(int index, int[] array, boolean[] used) {
		int[] nowArray;
		boolean[] nowUsed;
		int[] isAsc;
		for(int i = 1 ; i < used.length ; i++) {
			nowArray = Arrays.copyOf(array, array.length);
			nowUsed = Arrays.copyOf(used, used.length);
			if(nowUsed[i] == false) {
				nowArray[index] = holding[i];
				nowUsed[i] = true;
				if(index == m-1) {
					isAsc = Arrays.copyOf(nowArray, nowArray.length);
					Arrays.sort(isAsc);
					if(Arrays.equals(nowArray, isAsc))
						noDupe.add(nowArray);
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
class isArrayEquals implements Comparator<int[]> {
	public int compare(int[] a, int[] b) {
		for(int i = 0 ; i < a.length ; i++) {
			if(a[i] != b[i]) {
				return Integer.compare(a[i], b[i]);
			}
		}
		return 0;
	}
}
```

<br>

### [15665][def3]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.StringTokenizer;
import java.util.TreeSet;

public class P_15665 {

	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
	static int n;
	static int m;
	static int[] holding;
	static SortedSet<int[]> noDupe = new TreeSet<>(new isArrayEquals());

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
		
		for(int[] next : noDupe)
			printArray(next);

		output.flush();
		output.close();

	}
	static void permute(int index, int[] array) {
		int[] nowArray;
		for(int i = 1 ; i < n+1 ; i++) {
			nowArray = Arrays.copyOf(array, array.length);
			nowArray[index] = holding[i];
			if(index == m-1)
				noDupe.add(nowArray);
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
class isArrayEquals implements Comparator<int[]> {
	public int compare(int[] a, int[] b) {
		for(int i = 0 ; i < a.length ; i++) {
			if(a[i] != b[i]) {
				return Integer.compare(a[i], b[i]);
			}
		}
		return 0;
	}
}
```

<br>

### [15666][def4]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.StringTokenizer;
import java.util.TreeSet;

public class P_15666 {

	static BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
	static BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
	static int n;
	static int m;
	static int[] holding;
	static SortedSet<int[]> noDupe = new TreeSet<>(new isArrayEquals());

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
		
		for(int[] next : noDupe)
			printArray(next);

		output.flush();
		output.close();

	}

	static void permute(int index, int[] array) {
		int[] nowArray;
		int[] isAsc;
		for(int i = 1 ; i < n+1 ; i++) {
			nowArray = Arrays.copyOf(array, array.length);
			nowArray[index] = holding[i];
			if(index == m-1) {
				isAsc = Arrays.copyOf(nowArray, nowArray.length);
				Arrays.sort(isAsc);
				if(Arrays.equals(nowArray, isAsc))
					noDupe.add(nowArray);
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
class isArrayEquals implements Comparator<int[]> {
	public int compare(int[] a, int[] b) {
		for(int i = 0 ; i < a.length ; i++) {
			if(a[i] != b[i]) {
				return Integer.compare(a[i], b[i]);
			}
		}
		return 0;
	}
}
```

[def]: https://www.acmicpc.net/problem/15663
[def2]: https://www.acmicpc.net/problem/15664
[def3]: https://www.acmicpc.net/problem/15665
[def4]: https://www.acmicpc.net/problem/15666