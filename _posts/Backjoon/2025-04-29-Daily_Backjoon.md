---
layout: post
title: "[데일리 백준] 11652"
excerpt: "1 Silver"

tags:
  - [데일리 백준, Backjoon]

toc: true

date: 2025-04-29
last_modified_at: 2025-04-29
---
## Silver
### [11652][def]

```c++
#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    cin >> n;
    int max = 0;
    long long max_index;
    long long input;
    unordered_map<long long, int> frequency;
    while(n--) {
        cin >> input;
        frequency[input]++;
        if(max < frequency[input]) {
            max = frequency[input];
            max_index = input;
            continue;
        }
        if(max == frequency[input] && max_index > input) max_index = input;
    }
    cout << max_index;
}
```

<details>
<summary>코멘트</summary>
<div markdown="1">

- 해시 맵 (날먹)

</div>
</details>

[def]: https://www.acmicpc.net/problem/11652