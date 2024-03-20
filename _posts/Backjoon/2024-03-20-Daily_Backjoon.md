---
layout: post
title: "[데일리 백준] 9012"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-03-20
last_modified_at: 2024-03-20
---
## Silver
### [9012][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_9012 {

	public static void main(String[] args) throws IOException{

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));

		int t = Integer.parseInt(input.readLine());
		
		String line;
		int set;
		for(int i = 0 ; i < t ; i++) {
			line = input.readLine();
			set = 0;
			for(int index = 0 ; index < line.length() ; index++) {
				if(line.charAt(index) == 40)
					set += 1;
				else {
					set -= 1;
					if(set < 0)
						break;
				}
			}
			if(set == 0)
				output.write("YES\n");
			else
				output.write("NO\n");
		}
		
		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- `char` 끼리의 비교연산과 ASCII 코드 값으로 직접 비교하는 방법의  
시간적/공간적 차이가 생각보다 별로 없었다.(거의 없음)

</div>
</details>

[def]: https://www.acmicpc.net/problem/9012