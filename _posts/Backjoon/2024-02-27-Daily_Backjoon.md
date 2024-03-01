---
layout: post
title: "[데일리 백준] 8958, 10250, 10809, 1436"
excerpt: "3 bronze, 1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-27
last_modified_at: 2024-02-28
---
## Bronze
### [8958][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_8958 {

	public static void main(String[] args) throws IOException{

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));

		int testCase = Integer.parseInt(input.readLine());

		String line;
		int currentScore;
		int sum;
		for(int i = 0 ; i < testCase ; i++) {
			currentScore = 1;
			sum = 0;
			line = input.readLine();

			for(int index = 0 ; index < line.length() ; index++)
				if(line.charAt(index) == 'O')
					sum += currentScore++;
				else 
					currentScore = 1;

			output.write(sum + "\n");
		}

		output.flush();
		output.close();

	}

}
```

<br>

### [10250][def2]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_10250 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer;
		
		int testCase = Integer.parseInt(input.readLine());
		
		int h;
		int n;
		String line;
		int floor;	// 층
		int num;	// 방 번호
		for(int i = 0 ; i < testCase ; i++) {
			line = input.readLine();
			tokenizer = new StringTokenizer(line);
			h = Integer.parseInt(tokenizer.nextToken());
			Integer.parseInt(tokenizer.nextToken());  // 너비는 필요없음. 따로 담아두지 않고 버린다
			n = Integer.parseInt(tokenizer.nextToken());
			
			floor = n;
			num = 1;
			while(floor - h > 0) {
				floor -= h;
				num++;
			}
			output.write(floor + ((num < 10) ? "0" + num : "" + num) + "\n");
			
		}
		
		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 반례가 다양하게 생길 수 있는 문제라서  
꼼꼼하게 케이스체크 해주어야 했다. 다소 어려웠다.  

</div>
</details>  

<br>

### [10809][def3]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_10809 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String s = input.readLine();
		
		for(char alphabet = 'a' ; alphabet <= 'z' ; alphabet++)
			output.write(s.indexOf(alphabet) + " ");
		
		output.flush();
		output.close();

	}

}
```

## Silver
### [1436][def4]

```java
// 풀지 못하여 내일로 토스하도록 하겠다.
```


[def]: https://www.acmicpc.net/problem/8958
[def2]: https://www.acmicpc.net/problem/10250
[def3]: https://www.acmicpc.net/problem/10809
[def4]: https://www.acmicpc.net/problem/1436