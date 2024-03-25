---
layout: post
title: "[데일리 백준] 9086"
excerpt: "1 Bronze"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-25
last_modified_at: 2024-03-25
---
## Bronze
### [9086][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_9086 {

	public static void main(String[] args) throws IOException {

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));

		int testCase = Integer.parseInt(input.readLine());

		String line;
		for(int i = 0 ; i < testCase ; i++) {
			line = input.readLine();
			output.write(""+line.charAt(0)+line.charAt(line.length()-1)+"\n");
		}

		output.flush();
		output.close();

	}

}
```

- [22971][def2] 문제 풀이 실패로 인하여,  
수요일에 재시도 해보겠습니다.  
위 문제는 스트릭 유지를 위한 날먹

[def]: https://www.acmicpc.net/problem/9086
[def2]: https://www.acmicpc.net/problem/22971