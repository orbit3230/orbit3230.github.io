---
layout: post
title: "[데일리 백준] 15657"
excerpt: "1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-05
last_modified_at: 2024-03-06
---
## Silver
### [15657][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P_15657 {

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
		int[] isAsc;
		for(int i = 1 ; i < n+1 ; i++) {
			nowArray[index] = holding[i];
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

- 메모리랑 시간이 이상하리만큼 많이 들었는데, 왜인지 잘 모르겠다.  
이전 문제 코드랑 다를게 없는데,,  
어디서 시간적/공간적 비효율성이 생겼을까

</div>
</details> 

[def]: https://www.acmicpc.net/problem/15657