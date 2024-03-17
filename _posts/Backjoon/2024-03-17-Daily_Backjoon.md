---
layout: post
title: "[데일리 백준] 2775"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-17
last_modified_at: 2024-03-17
---
## Bronze
### [2775][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.stream.Stream;

public class P_2775 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int t = Integer.parseInt(input.readLine());
		
		int[][] apt = new int[15][14];  // k층 n호
		int[] firstFloor = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14};
		apt[0] = firstFloor;
		for(int k = 1 ; k < apt.length ; k++) {
			apt[k][0] = 1;
			for(int n = 1 ; n < apt[0].length ; n++) {
				apt[k][n] = apt[k][n-1] + apt[k-1][n];
			}
		}
		
		int k;
		int n;
		for(int i = 0 ; i < t ; i++) {
			k = Integer.parseInt(input.readLine());
			n = Integer.parseInt(input.readLine());
			output.write(apt[k][n-1] + "\n");
		}
		
		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 같은 연산의 중복은 자제하는게 포인트인 문제였다.

</div>
</details> 

[def]: https://www.acmicpc.net/problem/2775