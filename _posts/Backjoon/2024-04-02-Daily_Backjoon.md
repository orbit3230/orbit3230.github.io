---
layout: post
title: "[데일리 백준] 2164"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-04-02
last_modified_at: 2024-04-02
---
## Silver
### [2164][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.LinkedList;
import java.util.List;

public class P_2164 {

public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int n = Integer.parseInt(input.readLine());
		
		List<Integer> cards = new LinkedList<>();
		for(Integer i = 1 ; i <= n ; i++) {
			cards.add(i);
		}
		
		Integer removed;
		while(true) {
			removed = cards.remove(0);
			if(cards.isEmpty())
				break;
			removed = cards.remove(0);
			cards.add(cards.size(), removed);
		}
		
		output.write(String.valueOf(removed));
		
		output.flush();
		output.close();
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- `ArrayList`는 즉시 시간초과 되었고,  
코드는 그대로 하여 `LinkedList`를 사용하였더니 훨씬 빠르게 수행되었다.  
이는 `LinkedList`의 node를 사용한 원소 컨트롤 방식 때문.

</div>
</details>

[def]: https://www.acmicpc.net/problem/2164