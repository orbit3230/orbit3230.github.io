---
layout: post
title: "[데일리 백준] 11650"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-01
last_modified_at: 2024-04-01
---
## Silver
### [11650][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;

public class P_11650 {

	public static void main(String[] args) throws IOException {

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));

		int n = Integer.parseInt(input.readLine());

		List<int[]> list = new ArrayList<>();
		int[] next = new int[2];
		String line;
		StringTokenizer tokenizer;
		for(int i = 0 ; i < n ; i++) {
			line = input.readLine();
			tokenizer = new StringTokenizer(line);
			next[0] = Integer.parseInt(tokenizer.nextToken());
			next[1] = Integer.parseInt(tokenizer.nextToken());
			list.add(Arrays.copyOf(next, 2));
		}
		list.sort((a, b) -> {
			if (a[0] == b[0])
				return Integer.compare(a[1], b[1]);
			else
				return Integer.compare(a[0], b[0]);
		});

		StringBuilder result = new StringBuilder();
		for(int[] coord : list)
			result.append(coord[0]).append(" ").append(coord[1]).append("\n");

		output.write(result.toString());

		output.flush();
		output.close();
	}

}
```

[def]: https://www.acmicpc.net/problem/11650