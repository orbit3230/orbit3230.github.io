---
layout: post
title: "[데일리 백준] 1436"
excerpt: "1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-28
last_modified_at: 2024-02-29
---
## Silver
### [1436]()

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_1436 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int n = Integer.parseInt(input.readLine());
		
		
		// 맨 처음에 "0666"이 아닌 "666"이 나오게 하기 위함
		if(n == 1)
			output.write("666");
		else
			output.write(getNth(n));
		
		output.flush();
		output.close();
	}
	
	public static String getNth(int n) {
		int count = 1;
		int next = 666;
		Found :
		while(count != n) {
			if((next+1000) % 1000000 / 1000 == 666) {
				next = next + 1000 - 666 - 1;
				while((next+1) % 1000000 / 1000 == 666) {
					count++;
					next += 1;
					if(count == n)
						break Found;
				}
				next -= 333;
			}
			else if((next+1000) % 100000 / 100 == 666) {
				next = next + 1000 - 66 - 1;
				while((next+1) % 100000 / 100 == 666) {
					count++;
					next += 1;
					if(count == n)
						break Found;
				}
				next -= 33;
			}
			else if((next+1000) % 10000 / 1000 == 6) {
				next = next + 1000 - 6 - 1;
				while((next+1) % 10000 / 10 == 666) {
					count++;
					next += 1;
					if(count == n)
						break Found;
				}
				next -= 3;
			}
			else {
				count++;
				next += 1000;
			}
		}
		return String.valueOf(next);
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 처음에 문제를 잘 못 읽어 조건을 다르게 읽어서  
잠시 헤매었다. 문제를 잘 읽자.  

- 규칙을 겨우겨우 찾아내어 풀었는데,  
규칙을 잘 구현했다고 생각했으나 자꾸 어긋나서 코드를 다시 짠 횟수가 많았다.  
규칙성을 잘 찾자.  

- 다음은 내가 규칙을 찾을 때 썼던 메모이다.  

![p1436][def]

- 마지막으로 내가 규칙을 세울 때 큰 도움이 되었던,  
몫과 나머지를 이용하여 특정 자리수를 추출하는 방법이다.  

![p1436_2][def2]  

- 응용하여 `234`를 추출하려면 `12345 % 10000 / 10`과 같이 해주면 된다.

</div>
</details>  

[def]: https://i.imgur.com/O29YIAm.png
[def2]: https://i.imgur.com/UxiRkwy.png