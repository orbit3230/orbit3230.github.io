---
layout: post
title: "[데일리 백준] 1024"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-08
last_modified_at: 2024-03-08
---
## Silver
### [1024][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_1024 {
	
	static BufferedReader input;
	static BufferedWriter output;

	public static void main(String[] args) throws IOException{

		input = new BufferedReader(new InputStreamReader(System.in));
		output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		
		int n = Integer.parseInt(tokenizer.nextToken());
		int l = Integer.parseInt(tokenizer.nextToken());
		
		printList(n, l);

		output.flush();
		output.close();
		
	}
	static void printList(int n, int l) throws IOException {
		double divider;
		double median;
		while(true) {
			divider = l * 1.0;
			median = n / divider;  // 리스트의 중간값
			if((int)Math.ceil(median) - l/2 < 0 || l > 100) {
				break;
			}
			// 리스트를 만들 수 있는 경우
			if((median % 1 == 0 && l % 2 == 1) || ((median-0.5) % 1 == 0.0 && l % 2 == 0)) {
				int[] list = new int[l];
				int start = (int)Math.ceil(median) - l/2;
				StringBuilder sb = new StringBuilder();
				for(int i = 0 ; i < list.length ; i++)
					sb.append(start++).append(" ");
				output.write(sb.toString());
				return;
			}
			l++;
		}
		output.write(-1 + "");
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 리스트를 사용해서 자료를 담아 출력하는 방식보다 그렇지 않고 바로 출력하는 게 메모리&시간 측면에서 아주 조금은 더 효율적이었고,  
문자열을 다룰 때 조금이라도 연산이 수행되면 `StringBuilder`를 사용하는 편이 꽤나 더 효율적이었다.  

</div>
</details> 

[def]: https://www.acmicpc.net/problem/1024