---
layout: post
title: "[데일리 백준] 2609"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-10
last_modified_at: 2024-03-10
---
## Bronze
### [2609][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_2609 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		int a = Integer.parseInt(tokenizer.nextToken());
		int b = Integer.parseInt(tokenizer.nextToken());
		
		if(b > a) {
			int tmp = b;
			b = a;
			a = tmp;
		}
		
		int x = a;
		int y = b;
		
		int tmp;
		while(y != 0) {
			tmp = y;
			y = x % y;
			x = tmp;
		}
		
		output.write(x + "\n");
		
		x = a;
		y = b;
		int remainder = x % y;
		while(remainder != 0) {
			x += a;
			remainder = x % y;
		}
		
		output.write(x + "\n");
		
		output.flush();
		output.close();

	}

}
```

[def]: https://www.acmicpc.net/problem/2609