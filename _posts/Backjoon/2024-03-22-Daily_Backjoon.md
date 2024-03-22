---
layout: post
title: "[데일리 백준] 10845"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-22
last_modified_at: 2024-03-22
---
## Silver
### [10845][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class P_10845 {
	
	public static void main(String[] args) throws IOException{

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer;
		
		int n = Integer.parseInt(input.readLine());
		
		String line;
		String command;
		int pushX;
		Queue queue = new Queue();
		for(int i = 0 ; i < n ; i++) {
			line = input.readLine();
			tokenizer = new StringTokenizer(line);
			command = tokenizer.nextToken();
			switch(command) {
				case "push" :
					pushX = Integer.parseInt(tokenizer.nextToken());
					queue.push(pushX);
					break;
				case "pop" :
					output.write(queue.pop() + "\n");
					break;
				case "size" :
					output.write(queue.size() + "\n");
					break;
				case "empty" :
					output.write(queue.empty() + "\n");
					break;
				case "front" :
					output.write(queue.front() + "\n");
					break;
				default :
					output.write(queue.back() + "\n");
			}			
		}
		output.flush();
		output.close();
	}
}
class Queue {
	private List<Integer> queue;
	private int top;
	public Queue() {
		this.queue = new ArrayList<>();
		this.top = 0;
	}
	public void push(int x) {
		queue.add(x);
		top++;
	}
	public int pop() {
		if(top == 0)
			return -1;
		else {
			top--;
			return queue.remove(0);
		}
	}
	public int size() {
		return top;
	}
	public int empty() {
		return (top == 0) ? 1 : 0;
	}
	public int front() {
		return (top == 0) ? -1 : queue.get(0);
	}
	public int back() {
		return (top == 0) ? -1 : queue.get(top-1);
	}
}
```

[def]: https://www.acmicpc.net/problem/10845