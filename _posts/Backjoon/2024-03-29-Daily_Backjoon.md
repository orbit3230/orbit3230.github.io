---
layout: post
title: "[데일리 백준] 10816"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-29
last_modified_at: 2024-03-29
---
## Silver
### [10816][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P_10816 {

	public static void main(String[] args) throws IOException {

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));

		int n = Integer.parseInt(input.readLine());
		StringTokenizer tokenizer = new StringTokenizer(input.readLine());
		double[] having = new double[n];
		for(int i = 0 ; i < n ; i++)
			having[i] = Double.parseDouble(tokenizer.nextToken());
		Arrays.sort(having);

		int m = Integer.parseInt(input.readLine());
		tokenizer = new StringTokenizer(input.readLine());
		int count;
		double next;
		StringBuilder result = new StringBuilder();
		for(int i = 0 ; i < m ; i++) {
			count = 0;
			next = Double.parseDouble(tokenizer.nextToken());
			count = countRange(having, next);
			result.append(count).append(" ");
		}
		output.write(result.toString());

		output.flush();
		output.close();
	}
	static int countRange(double[] having, double find) {
		int lower = Arrays.binarySearch(having, find-0.1);
		int upper = Arrays.binarySearch(having, find+0.1);
		lower = ((lower*-1)-1)-1;
		upper = (upper*-1)-1;
		return upper - lower - 1;
	}
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 이진 탐색(binarySearch()) 시,  
만약 원소가 중복일 경우  
탐색의 결과가 중복된 원소들 중 첫 번째의 인덱스일 지 마지막 인덱스 일지는 모른다.  
그렇다면 찾고자하는 값에 -0.1, +0.1 등을 하여 바로 이전/이후 인덱스를 알아보는 것은 어떨까 ?

</div>
</details>

[def]: https://www.acmicpc.net/problem/10816