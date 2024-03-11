---
layout: post
title: "[데일리 백준] 2231"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-11
last_modified_at: 2024-03-11
---
## Bronze
### [2231][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_2231 {
	
public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String num = input.readLine();
		
		int length = num.length();
		
		int result = 0;
		int splitSum;
		String next;
		int n;
		
		for(int i = length*9 ; i >= 0 ; i--) {
			n = Integer.parseInt(num);
			next = String.valueOf(n - i);
			if(Integer.parseInt(next) < 0) {
				next = "0";
			}
			splitSum = Integer.parseInt(next);
			for(int j = 0 ; j < next.length() ; j++) {
				splitSum += Integer.parseInt(String.valueOf(next.charAt(j)));
			}
			if(n == splitSum) {
				result = Integer.parseInt(next);
				break;
			}
		}
		
		output.write(String.valueOf(result));
		
		output.flush();
		output.close();
		
	}

}
```

[def]: https://www.acmicpc.net/problem/2231