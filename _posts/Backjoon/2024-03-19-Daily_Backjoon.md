---
layout: post
title: "[데일리 백준] 2743"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-19
last_modified_at: 2024-03-19
---
## Bronze
### [2743][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_2743 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = input.readLine();
		
		output.write(String.valueOf(line.length()));
		
		output.flush();
		output.close();

	}

}
```

[def]: https://www.acmicpc.net/problem/2743