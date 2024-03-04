---
layout: post
title: "[데일리 백준] 2798, 15649"
excerpt: "1 bronze, 1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-01
last_modified_at: 2024-03-02
---
## Bronze
### [2798][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_2798 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer;
		String line;
		
		line = input.readLine();
		tokenizer = new StringTokenizer(line);
		
		int n = Integer.parseInt(tokenizer.nextToken());
		int m = Integer.parseInt(tokenizer.nextToken());
		
		int[] cards = new int[n];
		line = input.readLine();
		tokenizer = new StringTokenizer(line);
		for(int i = 0; i < cards.length ; i++)
			cards[i] = Integer.parseInt(tokenizer.nextToken());
		
		int sum;
		int minSum = 0; // 차이가 가장 적을 때의 세 카드의 합
		int gap;
		int minGap = Integer.MAX_VALUE;
		
		for(int i = 0 ; i < cards.length ; i++)
			for(int j = i+1 ; j < cards.length ; j++)
				for(int k = j+1 ; k < cards.length ; k++) {
					sum = cards[i] + cards[j] + cards[k];
					gap = m - sum;
					if(gap >= 0 && gap < minGap) {
						minGap = gap;
						minSum = sum;
					}
				}
		
		output.write(String.valueOf(minSum));
		
		output.flush();
		output.close();
	}

}
```

<br>

## Silver
### [15649][def2]

```java
// 풀 지 못하였다. 내일 중으로 풀도록 노력하겠다.
```

[def]: https://www.acmicpc.net/problem/2798
[def2]: https://www.acmicpc.net/problem/15649