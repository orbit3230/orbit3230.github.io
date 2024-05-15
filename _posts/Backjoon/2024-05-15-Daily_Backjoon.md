---
layout: post
title: "[데일리 백준] 17626"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-05-15
last_modified_at: 2024-05-15
---
## Silver
### [17626][def]

```c++
#include <iostream>
#include <math.h>
using namespace std;

int calculate(int n, int count) {
    if(count >= 4)
        return 5;  // 의미가 없다는 뜻의 return
    if(n == 0)
        return count;
    int minCount = 4;
    for(int x = sqrt(n) ; x > sqrt(n/4) ; x--) {
        int temp = calculate(n - x*x, count+1);
        if(temp < minCount)
            minCount = temp;
    }
    return minCount;
}

int main() {
    int n;
    cin >> n;

    cout << calculate(n, 0);
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 재귀함수에 대해서는 더 많은 학습이 필요할 것 같다.  

</div>
</details>

[def]: https://www.acmicpc.net/problem/17626