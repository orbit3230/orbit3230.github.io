---
layout: post
title: "[데일리 백준] 10989"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-04
last_modified_at: 2024-04-04
---
## Bronze
### [10989][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;

public class P_10989 {

public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int n = Integer.parseInt(input.readLine());
		int[] list = new int[n];
		for(int i = 0 ; i < n ; i++)
			list[i] = Integer.parseInt(input.readLine());
		
		Arrays.sort(list);
		
		for(Integer next : list)
			output.write(next + "\n");
		
		output.flush();
		output.close();
		
	}

}
```

[def]: https://www.acmicpc.net/problem/10989