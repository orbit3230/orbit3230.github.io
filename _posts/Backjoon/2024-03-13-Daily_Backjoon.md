---
layout: post
title: "[데일리 백준] 7568"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-13
last_modified_at: 2024-03-13
---
## Silver
### [7568][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class P_7568 {

public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int testCase = Integer.parseInt(input.readLine());
		List<Human> people = new ArrayList<Human>();
		String line;
		StringTokenizer tokenizer;
		for(int i = 0 ; i < testCase ; i++) {
			line = input.readLine();
			tokenizer = new StringTokenizer(line);
			people.add(new Human(Integer.parseInt(tokenizer.nextToken()), Integer.parseInt(tokenizer.nextToken())));
		}
		
		for(Human next : people) {
			long stronger = people.stream().filter(a -> {
				if(a.weight > next.weight && a.height > next.height)
					return true;
				else
					return false;
			}).count();
			output.write((stronger + 1) + " ");
		}
		
		output.flush();
		output.close();
	}
	
}
class Human{
	int weight;
	int height;
	public Human(int weight, int height) {
		this.weight = weight;
		this.height = height;
	}
}
```

[def]: https://www.acmicpc.net/problem/7568