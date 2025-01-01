---
layout: post
title: "[데일리 백준] 1449"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-01-01
last_modified_at: 2025-01-01
---
## Silver
### [1449][def]

```c++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, l;
    cin >> n >> l;
    vector<bool> pipe(1001, false);
    int point;
    for(int i = 0 ; i < n ; i++) {
        cin >> point;
        pipe[point] = true;
    }
    int count = 0;
    for(int i = 1 ; i <= 1000 ; i++) {
        if(!n) break;
        if(pipe[i]) {
            count++;
            n--;
            for(int j = 1 ; j < l ; j++) {
                if(i+j > 1000) break;
                if(pipe[i+j]) {
                    n--;
                    pipe[i+j] = false;
                }
            }
        }
    }
    cout << count;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 그리디 알고리즘 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/1449