---
layout: post
title: "[데일리 백준] 2751"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-09
last_modified_at: 2024-03-09
---
## Silver
### [2751][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.SortedSet;
import java.util.TreeSet;

public class P_2751 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int n = Integer.parseInt(input.readLine());
		
		SortedSet<Integer> s = new TreeSet<Integer>(); 
		for(int i = 0 ; i < n ; i++)
			s.add(Integer.parseInt(input.readLine()));
		
		for(Integer e : s) {
			output.write(String.valueOf(e));
			output.write("\n");
		}
		
		output.flush();
		output.close();
	}

}
```

[def]: https://www.acmicpc.net/problem/2751