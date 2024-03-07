---
layout: post
title: "[데일리 백준] 2752"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-07
last_modified_at: 2024-03-08
---
## Bronze
### [2752][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P_2752 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		int[] array = new int[3];
		for(int i = 0 ; i < 3 ; i++)
			array[i] = Integer.parseInt(tokenizer.nextToken());
		
		Arrays.sort(array);
		
		for(int e : array)
			output.write(e + " ");
		
		output.flush();
		output.close();

	}

}
```

[def]: https://www.acmicpc.net/problem/2752