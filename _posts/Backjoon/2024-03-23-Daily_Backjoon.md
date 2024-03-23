---
layout: post
title: "[데일리 백준] 10866"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-23
last_modified_at: 2024-03-23
---
## Silver
### [10866][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class P_10866 {
	
	public static void main(String[] args) throws IOException{

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer;
		
		int n = Integer.parseInt(input.readLine());
		
		String line;
		String command;
		int pushX;
		Deque deque = new Deque();
		for(int i = 0 ; i < n ; i++) {
			line = input.readLine();
			tokenizer = new StringTokenizer(line);
			command = tokenizer.nextToken();
			switch(command) {
				case "push_front" :
					pushX = Integer.parseInt(tokenizer.nextToken());
					deque.push_front(pushX);
					break;
				case "push_back" :
					pushX = Integer.parseInt(tokenizer.nextToken());
					deque.push_back(pushX);
					break;
				case "pop_front" :
					output.write(deque.pop_front() + "\n");
					break;
				case "pop_back" :
					output.write(deque.pop_back() + "\n");
					break;
				case "size" :
					output.write(deque.size() + "\n");
					break;
				case "empty" :
					output.write(deque.empty() + "\n");
					break;
				case "front" :
					output.write(deque.front() + "\n");
					break;
				default :
					output.write(deque.back() + "\n");
			}			
		}
		output.flush();
		output.close();
	}
}
class Deque {
	private List<Integer> deque;
	private int top;
	public Deque() {
		this.deque = new ArrayList<>();
		this.top = 0;
	}
	public void push_front(int x) {
		deque.add(0, x);
		top++;
	}
	public void push_back(int x) {
		deque.add(x);
		top++;
	}
	public int pop_front() {
		if(top == 0)
			return -1;
		else {
			top--;
			return deque.remove(0);
		}
	}
	public int pop_back() {
		if(top == 0)
			return -1;
		else 
			return deque.remove(--top);
	}
	public int size() {
		return top;
	}
	public int empty() {
		return (top == 0) ? 1 : 0;
	}
	public int front() {
		return (top == 0) ? -1 : deque.get(0);
	}
	public int back() {
		return (top == 0) ? -1 : deque.get(top-1);
	}
}
```

[def]: https://www.acmicpc.net/problem/10866