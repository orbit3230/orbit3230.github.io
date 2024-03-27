---
layout: post
title: "[데일리 백준] 1181"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-27
last_modified_at: 2024-03-27
---
## Silver
### [1181][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Comparator;
import java.util.SortedSet;
import java.util.TreeSet;

public class P_1181 {

	public static void main(String[] args) throws IOException{

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int n = Integer.parseInt(input.readLine());
		
		SortedSet<String> words = new TreeSet<>(Comparator.comparing(String::length)
				.thenComparing(Comparator.naturalOrder()));
		
		for(int i = 0 ; i < n ; i++)
			words.add(input.readLine());
		
		StringBuilder result = new StringBuilder();
		for(String word : words)
			result.append(word).append('\n');
		
		output.write(result.toString());
		
		output.flush();
		output.close();
	}

}
```

[def]: https://www.acmicpc.net/problem/1181