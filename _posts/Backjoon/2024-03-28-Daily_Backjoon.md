---
layout: post
title: "[데일리 백준] 11866"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-28
last_modified_at: 2024-03-28
---
## Silver
### [11866][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class P_11866 {

	public static void main(String[] args) throws IOException{

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer = new StringTokenizer(input.readLine());
		int n = Integer.parseInt(tokenizer.nextToken());
		int k = Integer.parseInt(tokenizer.nextToken());
		
		List<Integer> people = new ArrayList<>();
		for(Integer i = 1 ; i <= n ; i++)
			people.add(i);
		
		output.write("<");
		int i = -1;
		while(people.size() != 1) {
			i = (i+k) % people.size();
			output.write(people.remove(i--) + ", ");
		}
		output.write(people.get(0) + ">");

		output.flush();
		output.close();

	}
}
```

[def]: https://www.acmicpc.net/problem/11866