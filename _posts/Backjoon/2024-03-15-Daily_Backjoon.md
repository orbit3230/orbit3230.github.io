---
layout: post
title: "[데일리 백준] 1259"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-15
last_modified_at: 2024-03-15
---
## Bronze
### [1259][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_1259 {
	
	public static void main(String[] args) throws IOException {

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));

		String next;
		while(true) {
			next = input.readLine();
			if(next.equals("0"))
				break;
			output.write(palinCheck(next) ? "yes\n" : "no\n");
		}
		
		output.flush();
		output.close();
	}
	static boolean palinCheck(String s) {
		int length = s.length();
		for(int i = 0 ; i < length ; i++) {
			if(s.charAt(i) != s.charAt(length-1-i))
				return false;
		}
		return true;
	}
}
```

[def]: https://www.acmicpc.net/problem/1259