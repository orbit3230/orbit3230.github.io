---
layout: post
title: "[데일리 백준] 15649"
excerpt: "1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-02
last_modified_at: 2024-03-03
---

## Silver
### [15649][def]

```java
package silver;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P_15649 {

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
		for(int i = 1 ; i < used.length ; i++) {
			nowUsed = Arrays.copyOf(used, used.length);
			if(nowUsed[i] == false) {
				nowArray[index] = i;
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

<details>
<summary>코멘트</summary>
<div markdown="1">

- 백트래킹을 활용한 문제이다.  
백트래킹을 간략하게 설명하자면 경우의 수를 순서대로 탐색하면서 가능한 가짓수를 뻗어나가다가,  
더 이상 해당 경우의 수에서 찾을 내용이 없는 경우, 이전 스택으로 되돌아가 다음 경우의 수를 탐색하며 뻗어나가는 것을 말한다.  

- 백트래킹은 재귀함수로 깔끔하게 풀린다. 다만 내가 재귀함수에 취약해서 문제 해결에 많은 시간이 소요되었다.  

- 다음은 내가 마지막에 문제를 푸는데 성공하였을 때의 알고리즘 구상이다.  
이 그림의 알고리즘 구상도 대로 코드를 짰다.

![p_15649](https://i.imgur.com/d5xtM5X.png)  

- 재귀 함수 호출을 통해 가장 마지막 인덱스(가장 깊은 스택)까지 찾아 나가다가,  
사용 가능한 원소를 모두 사용하였을 경우 함수를 리턴함으로서 재귀함수 스택을 줄였다.  
이것이 백트래킹 기술이라고 할 수 있겠다.  
문제를 풀면서 맞이한 주의할 점 몇 가지를 적어보겠다.  

  - (1) 배열은 객체이기 때문에, 재귀적 호출로서 참조를 넘겨줄 경우  
  call stack 내에서 원본이 수정되고 유지된다. 따라서 재귀가 끝나고 리턴받았을 때에도 변경된 원본이 유지된다.  
  따라서 배열을 파라미터로 받으면, 재귀함수 내에서 따로 복사본을 만들어 사용해야 한다.  
  그렇지 않으면 재귀함수의 의미가 없어진다.  

</div>
</details> 

[def]: https://www.acmicpc.net/problem/15649