---
layout: post
title: "[데일리 백준] 2741, 2577, 2920, 1676"
excerpt: "3 bronze, 1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-26
last_modified_at: 2024-02-27
---
## Bronze
### [2741][def]

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.Stream;

public class P_2741 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		
		int n = Integer.parseInt(input.readLine());
		
		Stream.iterate(1, i -> i + 1).limit(n).forEach(System.out::println);

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 깔끔하게 `Stream`으로 풀어보았다.  
  `BufferedWriter`를 사용하면 런타임을 3/10 정도로 크게 줄일 수 있다.

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.stream.Stream;

public class P_2741 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int n = Integer.parseInt(input.readLine());
		
		Stream.iterate(1, i -> i + 1).limit(n).forEach(i -> {
			try {
				output.write(i + "\n");
			}
			catch (IOException e) {
				e.printStackTrace();
			}
		});
		
		output.flush();
		output.close();

	}

}
```

</div>
</details>  

<br>

### [2577][def2]  

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_2577 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int a = Integer.parseInt(input.readLine());
		int b = Integer.parseInt(input.readLine());
		int c = Integer.parseInt(input.readLine());
		
		int[] eachNum = new int[10];
		
		String abc = String.valueOf(a*b*c);
		
		for(int i = 0 ; i < abc.length() ; i++)
			eachNum[Integer.parseInt(abc.charAt(i) + "")]++;
		
		for(int each : eachNum)
			output.write(each + "\n");
		
		output.flush();
		output.close();

	}

}
```

<br>

### [2920][def3]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_2920 {

	public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		
		int[] pitches = new int[8];
		for(int i = 0 ; i < pitches.length ; i++)
			pitches[i] = Integer.parseInt(tokenizer.nextToken());
		
		boolean isAsc = (pitches[0] < pitches[1]) ? true : false;
		boolean isDesc = (pitches[0] > pitches[1]) ? true : false;
		for(int i = 1 ; i < pitches.length - 1 ; i++) {
			if(isAsc) {
				if(pitches[i] > pitches[i+1]) {
					output.write("mixed");
					isAsc = false;
					break;
				}
			}
			else {
				if(pitches[i] < pitches[i+1]) {
					output.write("mixed");
					isDesc = false;
					break;
				}
			}
		}
		if(isAsc)
			output.write("ascending");
		if(isDesc)
			output.write("descending");
		
		output.flush();
		output.close();

	}

}
```

<br>

## Silver
### [1676][def4]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_1676 {

	public static void main(String[] args) throws IOException{

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int n = Integer.parseInt(input.readLine());
		
		int zeros = (n / 5) + (n / 25) + (n / 125);
		
		output.write(String.valueOf(zeros));
		
		output.flush();
		output.close();
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- `N!` 에서 뒤에서부터 처음 0이 아닌 숫자가 나올 때 까지의 연속된 0의 개수는 어떻게 구할까.  

  - `N`의 최댓값이 500인데 `500!`은 너무 큰 수다.  
  팩토리얼 값을 직접 구해서 그걸 하나하나 세는 건 말이 안된다.  

  - 잘 생각해보자. 처음으로 끝자리가 0이 되는 `N` 값은 `5`이다.  
    - 왜냐? `5*4*3*2*1` 인데 이 속에서 `5*2` 는 `10`이기 때문에, `10`이 한 번 곱해졌으므로 끝자리 0이 한 개 생긴다.  

  - 그럼 0이 두 개 생기는 시점은 언제인가?  
  그렇다. `10`을 추가로 곱하게 되는 `10!` 이다.  
  `2`,`5`와 `10`이 소모되어 0이 두 개 생긴다.  

  - 이렇게 반복되면서, 5의 배수를 통과할 때마다 0이 추가로 하나씩 생긴다.  

  - 그런데, 5의 배수씩 더해지다가 100의 배수를 통과할 때는 0이 두 개씩 생길 것이다.  
  이 것만 추가로 잘 처리해주면 될 것이다.  
  한번 이렇게 코드를 짜서 제출해보겠다.  
  <br>

- 틀렸다. 흠..  
내 생각을 토대로 가설을 두 가지 세워봤다.
  - (1) 50의 배수에서 0이 두 개씩 생긴다.
  - (2) 아니면 소인수분해 했을 때 5의 개수(차수) 만큼 0을 추가해야 한다.  
  <br>

  - 개인적으로 두 번째 가설에 좀 더 확신이 가서  
  `5`의 배수는 한 개, `25`의 배수는 한 개 더(두 개),  
  `125`의 배수는 또 한 개 더(세 개) 추가하는 방식으로 가보겠다.  

- 정답이다. 깔끔했다.

</div>
</details>  


[def]: https://www.acmicpc.net/problem/2741
[def2]: https://www.acmicpc.net/problem/2577
[def3]: https://www.acmicpc.net/problem/2920
[def4]: https://www.acmicpc.net/problem/1676