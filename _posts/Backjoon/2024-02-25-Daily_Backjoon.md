---
layout: post
title: "[데일리 백준] 2475, 1152, 1157, 1920"
excerpt: "3 bronze, 1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-25
last_modified_at: 2024-02-26
---
## Bronze
### [2475][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_2475 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String line = input.readLine();
		StringTokenizer tokenizer = new StringTokenizer(line);
		
		int sum = 0;
		for(int i = 0 ; i < 5 ; i++)
			sum += Math.pow(Integer.parseInt(tokenizer.nextToken()), 2);
		
		output.write(String.valueOf(sum % 10));
		
		output.flush();
		output.close();

	}

}
```

<br>

### [1152][def2]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_1152 {

	public static void main(String[] args) throws IOException{

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));

		String line = input.readLine();
		String[] words = line.trim().split(" ");

		if(words[0] == "")
			output.write("0");
		else
			output.write(String.valueOf(words.length));

		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - input이 공백 하나(` `)일 때 `0`이 출력되어야 하나 `1`이 출력되므로  
  해당 경우를 따로 빼서 직접 예외처리했다.

</div>
</details>

### [1157][def3]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.OptionalInt;
import java.util.stream.Collectors;

public class P_1157 {

	public static void main(String[] args) throws IOException{

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));

		String word = input.readLine();
		
		Map<Character, Integer> freq = new HashMap<>();
		
		Character next;
		for(int i = 0 ; i < word.length() ; i++) {
			next = Character.toUpperCase(word.charAt(i));
			if(Objects.isNull(freq.get(next)))
				freq.put(next, 1);
			else
				freq.replace(next, freq.get(next) + 1);
		}

		OptionalInt maxFreq = freq.keySet().stream()
				.mapToInt(k -> freq.get(k))
				.max();
		
		List<Character> mostFreq = freq.keySet().stream()
				.filter(k -> freq.get(k) == maxFreq.orElse(0))
				.collect(Collectors.toList());
		
		if(mostFreq.size() >= 2)
			output.write("?");
		else
			output.write(mostFreq.get(0));

		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 두 번째 스트림에서 `collect(Collectors.toList())` 처럼 터미널 연산 하는게 정석이긴 한데,  
  IDE에서 코드를 작성할 때 곧바로 `toList()` 하는게 있어서 한번 써봤다.  
  잘 되길래 제출했더니 그런 메소드는 없다고 컴파일에러가 났다.  
  뭐지? 무서운이야기;;  

  - 암튼 `Map`과 `Stream`을 이용해서 코드를 짜봤는데 좀 신박하게 잘 짠거 같기도 하다.  
  다만 시간/공간적 효율성은 좀 떨어졌음.

</div>
</details>

## Silver
### [1920][def4]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P_1920 {

	public static void main(String[] args) throws IOException{

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer;

		int n = Integer.parseInt(input.readLine());
		int[] a = new int[n];

		String line = input.readLine();
		tokenizer = new StringTokenizer(line);
		for(int i = 0 ; i < n ; i++)
			a[i] = Integer.parseInt(tokenizer.nextToken());

		Arrays.sort(a);

		int m = Integer.parseInt(input.readLine());

		line = input.readLine();
		tokenizer = new StringTokenizer(line);
		for(int i = 0 ; i < m ; i++)
			if(Arrays.binarySearch(a, Integer.parseInt(tokenizer.nextToken())) >= 0)
				output.write("1\n");
			else
				output.write("0\n");

		output.flush();
		output.close();

	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - c++ 구현 코드

  	```c++
  	#include <iostream>
	#include <unordered_set>
	using namespace std;

	int main() {
		ios::sync_with_stdio(false);
		cin.tie(NULL);
		cout.tie(NULL);
		
		int n;
		cin >> n;
		unordered_set<int> s;
		int input;
		for(int i = 0 ; i < n ; i++) {
			cin >> input;
			s.insert(input);
		}
		int m;
		cin >> m;
		for(int i = 0 ; i < m ; i++) {
			cin >> input;
			if(s.find(input) != s.end()) {
				cout << "1\n";
				continue;
			}
			cout << "0\n";
		}
	}
  	```

</div>
</details>

[def]: https://www.acmicpc.net/problem/2475
[def2]: https://www.acmicpc.net/problem/1152
[def3]: https://www.acmicpc.net/problem/1157
[def4]: https://www.acmicpc.net/problem/1920