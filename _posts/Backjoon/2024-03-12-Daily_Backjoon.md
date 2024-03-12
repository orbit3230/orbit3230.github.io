---
layout: post
title: "[데일리 백준] 1978"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-12
last_modified_at: 2024-03-12
---
## Bronze
### [1978][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_1978 {

	public static void main(String[] args) throws IOException {

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));

		int testCase = Integer.parseInt(input.readLine());

		int count = 0;
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);

		for(int i = 0 ; i < testCase ; i++)
			if(isPrime(Integer.parseInt(tokenizer.nextToken())))
				count++;

		output.write(String.valueOf(count));

		output.flush();
		output.close();

	}
	static boolean isPrime(int n) {
	if(n == 1) return false;
	for(int i = 2 ; i <= Math.sqrt(n) ; i++)
		if(n % i == 0)
			return false;
	return true;
	}
}
```

[def]: https://www.acmicpc.net/problem/1978