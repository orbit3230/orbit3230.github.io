---
layout: post
title: "[데일리 백준] 2869"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-16
last_modified_at: 2024-03-16
---
## Bronze
### [2869][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_2869 {
	
public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		int up = Integer.parseInt(tokenizer.nextToken());
		int down = Integer.parseInt(tokenizer.nextToken());
		int summit = Integer.parseInt(tokenizer.nextToken());
		
		int days = (int)Math.ceil(1.0*(summit-up)/(up-down))+1;
		
		output.write(String.valueOf(days));
		
		output.flush();
		output.close();

	}

}
```

[def]: https://www.acmicpc.net/problem/2869