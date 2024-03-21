---
layout: post
title: "[데일리 백준] 10828"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-21
last_modified_at: 2024-03-21
---
## Silver
### [10828][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class P_10828 {
    
    public static void main(String[] args) throws IOException{

        BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer tokenizer;
        
        int n = Integer.parseInt(input.readLine());
        
        String line;
        String command;
        int pushX;
        Stack stack = new Stack();
        for(int i = 0 ; i < n ; i++) {
            line = input.readLine();
            tokenizer = new StringTokenizer(line);
            command = tokenizer.nextToken();
            switch(command) {
                case "push" :
                    pushX = Integer.parseInt(tokenizer.nextToken());
                    stack.push(pushX);
                    break;
                case "pop" :
                    output.write(stack.pop() + "\n");
                    break;
                case "size" :
                    output.write(stack.size() + "\n");
                    break;
                case "empty" :
                    output.write(stack.empty() + "\n");
                    break;
                default :
                    output.write(stack.top() + "\n");
            }            
        }
        output.flush();
        output.close();
    }
}
class Stack {
    private List<Integer> stack;
    private int top;
    public Stack() {
        this.stack = new ArrayList<>();
        this.top = 0;
    }
    public void push(int x) {
        stack.add(x);
        top++;
    }
    public int pop() {
        return (top == 0) ? -1 : stack.remove(--top);
    }
    public int size() {
        return top;
    }
    public int empty() {
        return (top == 0) ? 1 : 0;
    }
    public int top() {
        return (top == 0) ? -1 : stack.get(top-1);
    }
}
```

[def]: https://www.acmicpc.net/problem/10828