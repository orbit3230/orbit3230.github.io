---
layout: post
title: "[데일리 백준] 4153"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-29
last_modified_at: 2024-03-01
---
## Bronze
### [4153][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_4153 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int a; int b; int c; String line; StringTokenizer tokenizer;
		int max; double maxPow; double restPow;
		while(true) {
			line = input.readLine();
			tokenizer = new StringTokenizer(line);
			a = Integer.parseInt(tokenizer.nextToken());
			b = Integer.parseInt(tokenizer.nextToken());
			c = Integer.parseInt(tokenizer.nextToken());
			if(a == 0)
				break;
			max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
			maxPow = Math.pow(max, 2);
			restPow = (max == a) ? (Math.pow(b, 2) + Math.pow(c, 2)) 
							: (max == b) ? ((Math.pow(a, 2) + Math.pow(c, 2))) : (Math.pow(a, 2) + Math.pow(b, 2));
			if(maxPow == restPow)
				output.write("right\n");
			else
				output.write("wrong\n");
		}
		
		output.flush();
		output.close();

	}

}
```

[def]: https://www.acmicpc.net/problem/4153