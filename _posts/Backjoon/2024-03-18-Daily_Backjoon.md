---
layout: post
title: "[데일리 백준] 11050"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-18
last_modified_at: 2024-03-18
---
## Bronze
### [11050][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_11050 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		
		int n = Integer.parseInt(tokenizer.nextToken());
		int r = Integer.parseInt(tokenizer.nextToken());
		
		int up = 1;
		int down = 1;
		for(int i = 1 ; i <= r ; i++) {
			up *= n-(i-1);
			down *= i;
		}
		output.write(String.valueOf(up/down));
		
		output.flush();
		output.close();

	}

}
```

[def]: https://www.acmicpc.net/problem/11050