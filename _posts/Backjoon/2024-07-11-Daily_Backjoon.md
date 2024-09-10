---
layout: post
title: "[데일리 백준] 11660"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2024-07-11
last_modified_at: 2024-07-11
---
## Silver
### [11660][def]

- 첫 번째 방법 (가로 누적합만 계산 후 반복문) -> 250ms  

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;

    vector<vector<int>> table(n, vector<int>(n));
    int next;
    int sum;
    for(int i = 0 ; i < n ; i++) {
        sum = 0;    // 배열에 저장할 때, 가로 누적 합으로 저장한다.
        for(int j = 0 ; j < n ; j++) {
            cin >> next;
            sum += next;
            table[i][j] = sum;
        }
    }

    int x1, y1, x2, y2;
    for(int i = 0 ; i < m ; i++) {
        sum = 0;
        cin >> x1 >> y1 >> x2 >> y2;
        x1--; y1--; x2--; y2--;  // 0-based index
        for(int j = x1 ; j <= x2 ; j++) {
            sum += table[j][y2];
            if(y1 > 0) sum -= table[j][y1-1];  // 구간 합 technique
        }
        cout << sum << '\n';
    }
}
```

<br>

- ★ 두 번째 방법 (가로 누적합 + 세로 누적합) -> 120ms

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);

    int n, m;
    cin >> n >> m;

    vector<vector<int>> table(n, vector<int>(n));
    int next;
    int sum;
    for(int i = 0 ; i < n ; i++) {
        sum = 0;    // 배열에 저장할 때, 우선 가로 누적 합으로 저장한다.
        for(int j = 0 ; j < n ; j++) {
            cin >> next;
            sum += next;
            table[i][j] = sum;
        }
    }
    // 이후 세로 누적합으로 재누적시킨다.
    // 이렇게되면 각 인덱스는 table[1][1] ~ table[i][j] 까지의 직사각형의 구간 합이 된다.
    for(int i = 1 ; i < n ; i++) {
        for(int j = 0 ; j < n ; j++) {
            table[i][j] += table[i-1][j];
        }
    }

    int x1, y1, x2, y2;
    for(int i = 0 ; i < m ; i++) {
        cin >> x1 >> y1 >> x2 >> y2;
        x1--; y1--; x2--; y2--;  // 0-based index
        sum = 0;
        sum += table[x2][y2];
        if(y1 > 0) sum -= table[x2][y1-1];
        if(x1 > 0) sum -= table[x1-1][y2];
        if(x1 > 0 && y1 > 0) sum += table[x1-1][y1-1];
        cout << sum << '\n';
    }
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 가로 누적 후 세로 누적을 저장하면, 각 인덱스가 `(1,1)` ~ `(i, j)` 직사각형의 합과 같아진다.  
  - 따라서 큰 직사각형에서 필요없는 부분을 제거 후, 중복으로 제거된 부분을 더해주는 기법을 사용한다.  
  [이전에 소개했던][def2] 누적합 기법에서 차원이 하나 늘어난 것이라고 보면 된다.  

</div>
</details> 

[def]: https://www.acmicpc.net/problem/11660
[def2]: https://orbit3230.github.io/2024/05/24/Daily_Backjoon/