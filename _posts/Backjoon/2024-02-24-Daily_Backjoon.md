---
layout: post
title: "[데일리 백준] 2675, 11654, 11720, 25083, 27866, 18111"
excerpt: "5 bronze, 1 silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-02-24
last_modified_at: 2024-02-25
---
## Bronze
### [2675][def]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class P_2675 {

public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer;
		String line;
		
		int testCase = Integer.parseInt(input.readLine());
		
		int repeat;
		String word;
		for(int i = 0 ; i < testCase ; i++) {
			line = input.readLine();
			tokenizer = new StringTokenizer(line);
			repeat = Integer.parseInt(tokenizer.nextToken());
			word = tokenizer.nextToken();
			
			for(int index = 0 ; index < word.length() ; index++)
				for(int r = 0 ; r < repeat ; r++)
					output.write(String.valueOf(word.charAt(index)));
			
			output.write("\n");
		}
		
		output.flush();
		output.close();

	}

}
```

<br>

### [11654][def2]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_11654 {

public static void main(String[] args) throws IOException {
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		int c = input.read();
		
		output.write(String.valueOf(c));
		
		output.flush();
		output.close();
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - `BufferedReader.read()` 메소드는 입력값을 받아 해당 문자의 아스키 코드 값을 리턴하므로 이를 이용했다.

</div>
</details>

<br>

### [11720][def3]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_11720 {

	public static void main(String[] args) throws IOException {

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));

		int n = Integer.parseInt(input.readLine());

		String line = input.readLine();
		int sum = 0;
		for(int i = 0 ; i < n ; i++)
			sum += Integer.parseInt(String.valueOf(line.charAt(i)));
		
		output.write(String.valueOf(sum));

		output.flush();
		output.close();
	}

}
```

<br>

### [25083][def4]

```java
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;

public class P_25083 {

	public static void main(String[] args) throws IOException {

		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		output.write("         ,r\'\"7\n");
		output.write("r`-_   ,\'  ,/\n");
		output.write(" \\. \". L_r\'\n");
		output.write("   `~\\/\n");
		output.write("      |\n");
		output.write("      |");
		
		output.flush();
		output.close();
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 🌱

</div>
</details>

<br>

### [27866][def5]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class P_27866 {

	public static void main(String[] args) throws IOException{
		
		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		
		String word = input.readLine();
		int index = Integer.parseInt(input.readLine());
		
		output.write(word.charAt(index-1));
		
		output.flush();
		output.close();
		
	}

}
```

<br>

## Silver
### [18111][def6]

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.StringTokenizer;

public class P_18111 {

	public static void main(String[] args) throws IOException {

		BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter output = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer tokenizer;
		String line;

		line = input.readLine();
		tokenizer = new StringTokenizer(line);
		int n = Integer.parseInt(tokenizer.nextToken());
		int m = Integer.parseInt(tokenizer.nextToken());
		int inven = Integer.parseInt(tokenizer.nextToken());

		int[] soils = new int[n*m];
		for(int i = 0 ; i < n ; i++) {
			line = input.readLine();
			tokenizer = new StringTokenizer(line);
			for(int j = 0 ; j < m ; j++)
				soils[i*m + j] = Integer.parseInt(tokenizer.nextToken());
		}
		Arrays.sort(soils);
		int standardIndex = (int)Math.ceil(soils.length * 2.0 / 3.0);  // 기준이 되는 높이 블럭의 인덱스
		// 특수케이스 처리
		if(soils.length % 3 == 0)
			standardIndex++;

		int standard = soils[standardIndex-1];	// 기준이 되는 블럭 높이
		int fill;	 	 						// 채워야 할, 필요한 블럭 수
		int farm;	 	 						// 캐야 할, 얻게 될 블럭 수
		int needBlocks;  						// 총 필요한 블럭 수
		int gap;		 						// 기준과 현재 땅의 높이 차
		while(true) {
			fill = 0;
			farm = 0;
			for(int soil : soils) {
				gap = soil - standard;
				if(gap < 0)
					fill -= gap;
				else
					farm += gap;
			}
			needBlocks = fill - farm;
			if(inven >= needBlocks)
				break;
			else
				standard--;
		}
		
		int workTime = fill * 1 + farm * 2;
		
		output.write(workTime + " " + standard);
		
		output.flush();
		output.close();
	}

}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

  - 이 문제를 풀기위해 구상한 알고리즘은 이렇다.

    - (1) 땅 높이의 기준을 구한다.  
      - 단 이때, 땅을 채우는 시간이 더 짧으므로 기준을 중간에서 잡으면 안 된다.  
      기준은 전체 개수의 2/3 지점에서 잡아야한다.  

      이를 구하기까지의 내가 구상한 과정의 메모이다.  

      ![p18111][def7]

    - (2) 그런데, 인벤토리에 있는 블록의 개수보다 필요한 블럭의 개수가 더 많으면 안 된다.  
    채워야할 블록 수 - 깎은 블록 수가 인벤토리보다 클 경우,  
    즉 `fill - farm > inven` 일 경우  
    기준을 하나 내린다. 이를 반복한다.  
    그렇게 적절한 기준을 결국 구해낸다.  

    - (2) 기준보다 높은 땅은 깎고, 깎은 시간을 더한다.
    - (3) 기준보다 낮은 땅은 채우고, 채운 시간을 더한다.

  - 첫 제출 결과는 틀렸으나, 틀린 이유는 쉽게 알 수 있었다.  
  출력 조건에 **답이 여러 개 있다면 그 중에서 땅의 높이가 가장 높은 것을 출력하시오** 가 있었는데,  
  이의 대표적인 예시를 메모 첫 줄에서 들었기 때문이다.  
  첫 실패 후 내 생각을 적은 메모이다.  

  ![p18111_2][def8]

  - 내가 틀린 이유 두 가지를 알아냈다.
    - (1) 위 메모에 있다시피, 특이 케이스(3의 배수)를 생각 안함  
    - (2) 배열 인덱스는 0부터 시작하기 때문에 1부터 시작하는 기준 인덱스에 -1을 하여 배열에서 꺼내야함.  

  - 두 번째 제출 결과가 틀린 이유도 금방 찾았다.  
    - (1) 우선 `Math.nextUp()`의 기능을 잘못 알고 있었다.  
    나는 이 라이브러리 함수가 "올림"의 기능을 갖는 줄 알았는데, 그냥 바로 다음 실수를 알려주는 함수였다. (2.3333 -> 2.3334)
    `Math.ceil`과 `Math.floor()`가 올림/반올림 함수이다. 기억하기  

    - (2) 보유 인벤개수보다 필요한 개수가 더 많을 때, 높이를 하나씩 줄여야 하는데 인덱스 자체를 하나씩 줄여버려서 의도치않게 작동했다. 이를 수정했고, 결국 문제를 맞추었다.

</div>
</details>

[def]: https://www.acmicpc.net/problem/2675
[def2]: https://www.acmicpc.net/problem/11654
[def3]: https://www.acmicpc.net/problem/11720
[def4]: https://www.acmicpc.net/problem/25083
[def5]: https://www.acmicpc.net/problem/27866
[def6]: https://www.acmicpc.net/problem/18111
[def7]: https://i.imgur.com/q9SlUpZ.png
[def8]: https://i.imgur.com/gNXz4dK.png